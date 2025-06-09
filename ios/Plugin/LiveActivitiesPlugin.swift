import Foundation
import Capacitor
import Compression

#if canImport(ActivityKit)
import ActivityKit
#endif

@objc(LiveActivitiesPlugin)
public class LiveActivitiesPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "LiveActivitiesPlugin"
    public let jsName = "LiveActivities"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getAllActivities", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "updateActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "endActivity", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "areActivitiesEnabled", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "debugActivities", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "saveImage", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeImage", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "listImages", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "cleanupImages", returnType: CAPPluginReturnPromise)
    ]
    
    
    @objc func startActivity(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.reject("Live Activities require iOS 16.2+")
            return
        }
        
#if canImport(ActivityKit)
        guard ActivityAuthorizationInfo().areActivitiesEnabled else {
            call.reject("Live Activities are not enabled")
            return
        }
#else
        call.reject("ActivityKit not available")
        return
#endif
        
        guard let layoutDict = call.getObject("layout"),
              let layoutJSON = try? JSONSerialization.data(withJSONObject: layoutDict),
              let layoutString = String(data: layoutJSON, encoding: .utf8),
              let data = call.getObject("data") else {
            call.reject("Invalid parameters")
            return
        }
        
        // Calculate total payload size and determine if compression is needed
        let totalPayload: [String: Any] = [
            "layout": layoutDict,
            "data": data
        ]
        
        // Include optional parameters if present for accurate size calculation
        var fullPayload = totalPayload
        if let behavior = call.getObject("behavior") {
            fullPayload["behavior"] = behavior
        }
        if let staleTimestamp = call.getDouble("staleDate") {
            fullPayload["staleDate"] = staleTimestamp
        }
        if let relevanceScore = call.getDouble("relevanceScore") {
            fullPayload["relevanceScore"] = relevanceScore
        }
        
        guard let payloadJSON = try? JSONSerialization.data(withJSONObject: fullPayload),
              let payloadString = String(data: payloadJSON, encoding: .utf8) else {
            call.reject("Failed to serialize activity data")
            return
        }
        
        let payloadSize = payloadString.data(using: .utf8)?.count ?? 0
        
        print("📊 Activity payload size: \(payloadSize) bytes")
        
        // Use very conservative limit (3.5KB) due to ActivityKit overhead
        let useCompression = payloadSize > 3500 // ~3.5KB to account for ActivityKit overhead
        var finalLayoutString = layoutString
        
        if useCompression {
            print("🗜️ Auto-enabling compression (payload > 3.5KB safety limit)")
            if let compressedLayout = compressLayoutJSON(layoutString) {
                finalLayoutString = compressedLayout
                print("✅ Layout compressed successfully")
            } else {
                print("❌ Layout compression failed, using original")
                call.reject("Failed to compress large activity data")
                return
            }
        } else {
            print("✅ Payload within 4KB limit, no compression needed")
        }
        
        let staleTimestamp = call.getDouble("staleDate")
        let staleDate = staleTimestamp.map { Date(timeIntervalSince1970: $0 / 1000) } // JS timestamp em ms
        let relevanceScore = call.getDouble("relevanceScore") ?? 0
        let behavior = call.getObject("behavior")
        
        var activityId: String
        
        do {
            activityId = try LiveActivities.shared.startActivity(
                layout: finalLayoutString,
                data: data,
                staleDate: staleDate,
                relevanceScore: relevanceScore,
                behavior: behavior
            )
            
            call.resolve([
                "activityId": activityId
            ])
        } catch {
            call.reject("Failed to start activity: \(error.localizedDescription)")
        }
    }
    
    @objc func updateActivity(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            guard let activityId = call.getString("activityId"),
                  let data = call.getObject("data") else {
                call.reject("Invalid parameters")
                return
            }
            
            let alertConfig = call.getObject("alertConfiguration")
            let behavior = call.getObject("behavior")
            
            Task {
                do {
                    try await LiveActivities.shared.updateActivity(
                        activityId: activityId,
                        data: data,
                        alertConfig: alertConfig,
                        behavior: behavior
                    )
                    
                    await MainActor.run {
                        call.resolve()
                    }
                } catch {
                    await MainActor.run {
                        call.reject("Failed to update activity: \(error.localizedDescription)")
                    }
                }
            }
        }else{
            call.reject("Live Activities require iOS 16.2+")
        }
    }
    
    @objc func endActivity(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            guard let activityId = call.getString("activityId") else {
                call.reject("Invalid parameters")
                return
            }
            
            let finalData = call.getObject("data")
            let behavior = call.getObject("behavior")
            
            Task {
                do {
                    try await LiveActivities.shared.endActivity(
                        activityId: activityId,
                        finalData: finalData,
                        behavior: behavior
                    )
                    
                    await MainActor.run {
                        call.resolve()
                    }
                } catch {
                    await MainActor.run {
                        call.reject("Failed to end activity: \(error.localizedDescription)")
                    }
                }
            }
        }else{
            call.reject("Live Activities require iOS 16.2+")
        }
    }
    
    @objc func getAllActivities(_ call: CAPPluginCall)  {
        if #available(iOS 16.2, *) {
            Task{
                let activities = await LiveActivities.shared.getAllActivities()
                
                call.resolve([
                    "activities": activities
                ])
            }
        }else{
            call.reject("Live Activities require iOS 16.2+")
        }
    }
    
    @objc func areActivitiesEnabled(_ call: CAPPluginCall) {
        guard #available(iOS 16.2, *) else {
            call.resolve(["enabled": false])
            return
        }
        
#if canImport(ActivityKit)
        call.resolve([
            "enabled": ActivityAuthorizationInfo().areActivitiesEnabled
        ])
#else
        call.resolve(["enabled": false])
#endif
    }
    
    @objc func debugActivities(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            LiveActivities.shared.debugPrintActivities()
        }
        call.resolve()
    }
    
    @objc func saveImage(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            guard let base64String = call.getString("imageData"),
                  let imageName = call.getString("name") else {
                call.reject("Missing required parameters")
                return
            }
            
            // Remover prefixo data:image se existir
            let base64 = base64String.replacingOccurrences(of: "data:image/[^;]+;base64,", with: "", options: .regularExpression)
            
            guard let imageData = Data(base64Encoded: base64),
                  let image = UIImage(data: imageData) else {
                call.reject("Invalid image data")
                return
            }
            
            let compressionQuality = CGFloat(call.getFloat("compressionQuality") ?? 0.8)
            
            let success = LiveActivities.shared.saveImageForLiveActivities(
                image: image,
                withName: imageName,
                compressionQuality: compressionQuality
            )
            
            call.resolve([
                "success": success,
                "imageName": imageName
            ])
        }else{
            call.reject("Live Activities require iOS 16.2+")
        }
    }
    
    @objc func removeImage(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            guard let imageName = call.getString("name") else {
                call.reject("Missing image name")
                return
            }
            
            let success = LiveActivities.shared.removeImageFromLiveActivities(withName: imageName)
            
            call.resolve([
                "success": success
            ])
        }else{
            call.reject("Unsupported")
        }
    }
    
    @objc func listImages(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            let images = LiveActivities.shared.listSavedImages()
            
            call.resolve([
                "images": images
            ])
        }else{
            call.reject("Unsupported")
        }
    }
    
    @objc func cleanupImages(_ call: CAPPluginCall) {
        if #available(iOS 16.2, *) {
            LiveActivities.shared.cleanupOldImages()
        }
        call.resolve()
    }
    
    // MARK: - Compression
    
    private func compressLayoutJSON(_ jsonString: String) -> String? {
        guard let inputData = jsonString.data(using: .utf8) else { return nil }
        
        let bufferSize = inputData.count + 1024 // Extra space for compression overhead
        let destinationBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: bufferSize)
        defer { destinationBuffer.deallocate() }
        
        let compressedSize = compression_encode_buffer(
            destinationBuffer, bufferSize,
            inputData.withUnsafeBytes { $0.bindMemory(to: UInt8.self).baseAddress! }, inputData.count,
            nil, COMPRESSION_ZLIB
        )
        
        guard compressedSize > 0 else { return nil }
        
        let compressedData = Data(bytes: destinationBuffer, count: compressedSize)
        let base64String = compressedData.base64EncodedString()
        
        print("📊 Compression: \(inputData.count) bytes -> \(compressedSize) bytes -> \(base64String.count) base64 chars")
        
        // Return with compression marker
        return "__COMPRESSED__:\(base64String)"
    }
    
}
