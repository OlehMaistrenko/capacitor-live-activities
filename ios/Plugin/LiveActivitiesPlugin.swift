import Foundation
import Capacitor

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
        
        let staleTimestamp = call.getDouble("staleDate")
        let staleDate = staleTimestamp.map { Date(timeIntervalSince1970: $0 / 1000) } // JS timestamp em ms
        let relevanceScore = call.getDouble("relevanceScore") ?? 0
        
        var activityId: String
        
        do {
            if #available(iOS 16.2, *) {
                activityId = try LiveActivities.shared.startActivity(
                    layout: layoutString,
                    data: data,
                    staleDate: staleDate,
                    relevanceScore: relevanceScore
                )
            } else {
                call.reject("Not supported on iOS versions below 16.2")
                return
            }
            
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
            
            Task {
                do {
                    try await LiveActivities.shared.updateActivity(
                        activityId: activityId,
                        data: data,
                        alertConfig: alertConfig
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
            
            Task {
                do {
                    try await LiveActivities.shared.endActivity(
                        activityId: activityId,
                        finalData: finalData
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
    
}
