import ActivityKit
import Foundation
import OSLog
import Compression

@available(iOS 16.2, *)
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
    public var behavior: [String: AnyCodable]?
    
    public init(layoutJSON: String, activityId: String, behavior: [String: AnyCodable]? = nil) {
        self.activityId = activityId
        // Keep layout as-is (compressed or uncompressed)
        // Decompression will happen in the widget parser
        self.layoutJSON = layoutJSON
        self.behavior = behavior
    }
}
