import ActivityKit
import Foundation

public struct DynamicActivityAttributes: ActivityAttributes {
    @available(iOS 16.2, *)
    public struct ContentState: Codable, Hashable {
        public var data: [String: AnyCodable]
        public var activityId: String // Para recuperar layout do App Group
        
        public init(data: [String: AnyCodable], activityId: String) {
            self.data = data
            self.activityId = activityId
        }
    }
    
    public var layoutJSON: String
    public var activityId: String
    
    public init(layoutJSON: String, activityId: String) {
        self.layoutJSON = layoutJSON
        self.activityId = activityId
    }
}
