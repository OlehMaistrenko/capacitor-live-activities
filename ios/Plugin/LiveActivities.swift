import Foundation

#if canImport(ActivityKit)
import ActivityKit
#endif

@available(iOS 16.2, *)
@objc public class LiveActivities: NSObject {
    @objc public static let shared = LiveActivities()
    
    #if canImport(ActivityKit)
    private var activities: [String: Activity<DynamicActivityAttributes>] = [:]
    #endif
    
    private override init() {
        super.init()
        // Configurar App Group automaticamente
        let bundleId = Bundle.main.bundleIdentifier ?? "com.app"
        LiveActivitiesKitManager.configure(withAppGroup: "group.\(bundleId).LiveActivities")
    }
    
    private func syncExistingActivities() async {
        #if canImport(ActivityKit)
        // Recuperar todas as activities ativas do sistema
        for activity in Activity<DynamicActivityAttributes>.activities {
            // O activityId está armazenado nos attributes
            let activityId = activity.attributes.activityId
            activities[activityId] = activity
            
            print("🔄 Recovered existing activity: \(activityId)")
        }
        #endif
    }
    
    @objc public func startActivity(
        layout: String,
        data: [String: Any],
        staleDate: Date?,
        relevanceScore: Double
    ) throws -> String {
        let activityId = UUID().uuidString
        
        // Criar atributos usando tipos do framework
        let attributes = DynamicActivityAttributes(
            layoutJSON: layout,
            activityId: activityId
        )
        
        // Converter dados para AnyCodable do framework
        let contentState = DynamicActivityAttributes.ContentState(
            data: data.mapValues { AnyCodable($0) },
            activityId: activityId
        )
        
        let activityContent = ActivityContent(
            state: contentState,
            staleDate: staleDate,
            relevanceScore: relevanceScore > 0 ? relevanceScore : 0
        )
        
        do {
            let activity = try Activity.request(
                attributes: attributes,
                content: activityContent,
                pushType: nil
            )
            
            activities[activityId] = activity
            
            print("✅ Started activity with custom ID: \(activityId)")
            print("🔍 System ID: \(activity.id)")
            print("📊 Total activities tracked: \(activities.count)")
            
            return activityId
        } catch {
            print("❌ Failed to start activity: \(error)")
            throw error
        }
    }
    
    @objc public func updateActivity(
        activityId: String,
        data: [String: Any],
        alertConfig: [String: Any]?
    ) async throws {
        guard let activity = activities[activityId] else {
            // Se não encontrar, tentar recuperar do sistema
            await syncExistingActivities()
            
            // Tentar novamente
            guard activities[activityId] != nil else {
                print("❌ Activity not found: \(activityId)")
                print("📊 Available activities: \(activities.keys)")
                throw LiveActivitiesError.activityNotFound
            }
            
            return
        }
        
        if let sharedDefaults = UserDefaults(suiteName: "group.\(Bundle.main.bundleIdentifier ?? "").LiveActivities") {
            sharedDefaults.set(data, forKey: "\(activityId)_data")
        }
        
        let contentState = DynamicActivityAttributes.ContentState(
            data: data.mapValues { AnyCodable($0) },
            activityId: activityId
        )
        
        var alertConfiguration: AlertConfiguration? = nil
        if let config = alertConfig {
            let title = config["title"] as? String ?? ""
            let body = config["body"] as? String ?? ""
            
            alertConfiguration = AlertConfiguration(
                title: LocalizedStringResource(stringLiteral: title),
                body: LocalizedStringResource(stringLiteral: body),
                sound: .default
            )
        }
        
        await activity.update(
            ActivityContent(state: contentState, staleDate: nil),
            alertConfiguration: alertConfiguration
        )
        
        print("✅ Updated activity: \(activityId)")
    }
    
    @objc public func endActivity(
        activityId: String,
        finalData: [String: Any]?
    ) async throws {
        guard let activity = activities[activityId] else {
            // Tentar recuperar
            await syncExistingActivities()
            guard let activity = activities[activityId] else {
                throw LiveActivitiesError.activityNotFound
            }
            
            return
        }
        
        // Limpar dados do App Group
        if let sharedDefaults = UserDefaults(suiteName: "group.\(Bundle.main.bundleIdentifier ?? "").LiveActivities") {
            sharedDefaults.removeObject(forKey: "\(activityId)_layout")
            sharedDefaults.removeObject(forKey: "\(activityId)_data")
        }
        
        let finalContentState = finalData.map {
            DynamicActivityAttributes.ContentState(
                data: $0.mapValues { AnyCodable($0) },
                activityId: activityId
            )
        }
        
        await activity.end(
            finalContentState.map { ActivityContent(state: $0, staleDate: nil) },
            dismissalPolicy: .default
        )
        
        activities.removeValue(forKey: activityId)
        print("✅ Ended activity: \(activityId)")
    }
    
    @objc public func getAllActivities() async -> [[String: Any]] {
        // Sincronizar com activities do sistema
        await syncExistingActivities()
        
        return activities.compactMap { (id, activity) in
            // Converter ActivityState para String
            let stateString: String
            switch activity.activityState {
            case .active:
                stateString = "active"
            case .ended:
                stateString = "ended"
            case .dismissed:
                stateString = "dismissed"
            case .stale:
                stateString = "stale"
            @unknown default:
                stateString = "unknown"
            }
            
            return [
                "id": id,
                "state": stateString,
                "systemId": activity.id
            ]
        }
    }
    
    @objc public func getActivity(byId activityId: String) -> [String: Any] {
        let activity = activities[activityId]
        
        let stateString: String
        switch activity?.activityState {
        case .active:
            stateString = "active"
        case .ended:
            stateString = "ended"
        case .dismissed:
            stateString = "dismissed"
        case .stale:
            stateString = "stale"
        @unknown default:
            stateString = "unknown"
        }
        
        return [
            "id": activityId,
            "state": stateString,
            "systemId": activity?.id ?? ""
        ]
    }
    
    @objc public func debugPrintActivities() {
        print("🔍 === DEBUG ACTIVITIES ===")
           
        print("📊 Tracked activities count: \(activities.count)")
        
        for (customId, activity) in activities {
            print("Activity:")
            print("  - Custom ID: \(customId)")
            print("  - System ID: \(activity.id)")
            print("  - State: \(activity.activityState)")
        }
        
        print("\n📱 System activities:")
        for activity in Activity<DynamicActivityAttributes>.activities {
            print("  - System ID: \(activity.id)")
            print("  - Our ID: \(activity.attributes.activityId)")
        }
        
        
        print("========================")
    }
    
    @objc func saveImageForLiveActivities(
        image: UIImage,
        withName name: String,
        compressionQuality: CGFloat = 0.8
    ) -> Bool {
        guard let containerURL = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.\(Bundle.main.bundleIdentifier ?? "").LiveActivities"
        ) else {
            print("❌ Failed to get App Group container")
            return false
        }
        
        // Criar diretório se não existir
        let imagesDirectory = containerURL.appendingPathComponent("LiveActivitiesImages")
        try? FileManager.default.createDirectory(at: imagesDirectory, withIntermediateDirectories: true)
        
        // Comprimir e salvar imagem
        let imageURL = imagesDirectory.appendingPathComponent(name)
        
        // Tentar JPEG primeiro, depois PNG
        if let jpegData = image.jpegData(compressionQuality: compressionQuality) {
            do {
                try jpegData.write(to: imageURL)
                print("✅ Saved image: \(name) (\(jpegData.count) bytes)")
                return true
            } catch {
                print("❌ Failed to save JPEG: \(error)")
            }
        }
        
        if let pngData = image.pngData() {
            do {
                try pngData.write(to: imageURL)
                print("✅ Saved PNG image: \(name) (\(pngData.count) bytes)")
                return true
            } catch {
                print("❌ Failed to save PNG: \(error)")
            }
        }
        
        return false
    }
    
    /// Remove uma imagem do App Group
    @objc public func removeImageFromLiveActivities(withName name: String) -> Bool {
        guard let containerURL = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.\(Bundle.main.bundleIdentifier ?? "").LiveActivities"
        ) else {
            return false
        }
        
        let imageURL = containerURL
            .appendingPathComponent("LiveActivitiesImages")
            .appendingPathComponent(name)
        
        do {
            try FileManager.default.removeItem(at: imageURL)
            print("✅ Removed image: \(name)")
            return true
        } catch {
            print("❌ Failed to remove image: \(error)")
            return false
        }
    }
    
    /// Lista todas as imagens salvas no App Group
    @objc public func listSavedImages() -> [String] {
        guard let containerURL = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.\(Bundle.main.bundleIdentifier ?? "").LiveActivities"
        ) else {
            return []
        }
        
        let imagesDirectory = containerURL.appendingPathComponent("LiveActivitiesImages")
        
        do {
            let files = try FileManager.default.contentsOfDirectory(atPath: imagesDirectory.path)
            return files.filter { $0.hasSuffix(".jpg") || $0.hasSuffix(".jpeg") || $0.hasSuffix(".png") }
        } catch {
            return []
        }
    }
    
    /// Limpa imagens antigas (mais de 7 dias)
    @objc public func cleanupOldImages() {
        guard let containerURL = FileManager.default.containerURL(
            forSecurityApplicationGroupIdentifier: "group.\(Bundle.main.bundleIdentifier ?? "").LiveActivities"
        ) else {
            return
        }
        
        let imagesDirectory = containerURL.appendingPathComponent("LiveActivitiesImages")
        let fileManager = FileManager.default
        
        do {
            let files = try fileManager.contentsOfDirectory(at: imagesDirectory, includingPropertiesForKeys: [.creationDateKey])
            let sevenDaysAgo = Date().addingTimeInterval(-7 * 24 * 60 * 60)
            
            for file in files {
                if let attributes = try? fileManager.attributesOfItem(atPath: file.path),
                   let creationDate = attributes[.creationDate] as? Date,
                   creationDate < sevenDaysAgo {
                    try? fileManager.removeItem(at: file)
                    print("🧹 Cleaned up old image: \(file.lastPathComponent)")
                }
            }
        } catch {
            print("❌ Failed to cleanup images: \(error)")
        }
    }
    
}

enum LiveActivitiesError: LocalizedError {
    case activityNotFound
    case invalidLayout
    case notSupported
    
    var errorDescription: String? {
        switch self {
        case .activityNotFound:
            return "Activity not found"
        case .invalidLayout:
            return "Invalid layout JSON"
        case .notSupported:
            return "Live Activities not supported"
        }
    }
}
