import Foundation
import WidgetKit
import SwiftUI

@available(iOS 16.2, *)
public struct LiveActivitiesKitManager {  // Mudou de enum para struct
    
    private init() {} // Previne instanciação
    
    public static func createWidget() -> some Widget {
        return DynamicActivityWidget()
    }
    
    public static func configure(withAppGroup appGroup: String) {
        SharedDataManager.shared.appGroupIdentifier = appGroup
    }
}

// SharedDataManager permanece internal
@available(iOS 16.2, *)
internal class SharedDataManager {
    static let shared = SharedDataManager()
    var appGroupIdentifier: String = ""
    
    private init() {}
    
    var sharedDefaults: UserDefaults? {
        return UserDefaults(suiteName: appGroupIdentifier)
    }
    
    func saveLayoutData(_ layout: String, data: [String: Any], for activityId: String) {
        sharedDefaults?.set(layout, forKey: "\(activityId)_layout")
        sharedDefaults?.set(data, forKey: "\(activityId)_data")
    }
    
    func getLayoutData(for activityId: String) -> (layout: String?, data: [String: Any]?) {
        let layout = sharedDefaults?.string(forKey: "\(activityId)_layout")
        let data = sharedDefaults?.dictionary(forKey: "\(activityId)_data")
        return (layout, data)
    }
}
