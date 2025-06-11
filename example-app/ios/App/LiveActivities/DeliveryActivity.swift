import ActivityKit
import WidgetKit
import SwiftUI

@available(iOS 16.2, *)
struct DeliveryActivityAttributes: ActivityAttributes {
    public typealias DeliveryStatus = ContentState
    
    public struct ContentState: Codable, Hashable {
        var driverName: String
        var estimatedDeliveryTime: Date
        var orderNumber: String
        var currentStatus: String
        var driverLocation: String
    }
    
    var restaurantName: String
    var orderTotal: String
    var customerAddress: String
}

@available(iOS 16.2, *)
struct DeliveryActivityWidget: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: DeliveryActivityAttributes.self) { context in
            // Lock screen/banner UI
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Image(systemName: "takeoutbag.and.cup.and.straw")
                        .foregroundColor(.orange)
                        .font(.title2)
                    
                    VStack(alignment: .leading) {
                        Text(context.attributes.restaurantName)
                            .font(.headline)
                            .fontWeight(.semibold)
                        Text("Order #\(context.state.orderNumber)")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    Text(context.attributes.orderTotal)
                        .font(.headline)
                        .fontWeight(.semibold)
                }
                
                Divider()
                
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text("Status")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        Text(context.state.currentStatus)
                            .font(.body)
                            .fontWeight(.medium)
                    }
                    
                    Spacer()
                    
                    VStack(alignment: .trailing, spacing: 4) {
                        Text("Delivery man")
                            .font(.caption)
                            .foregroundColor(.secondary)
                        Text(context.state.driverName)
                            .font(.body)
                            .fontWeight(.medium)
                    }
                }
                
                HStack {
                    Image(systemName: "clock")
                        .foregroundColor(.blue)
                    Text("Prevision: \(context.state.estimatedDeliveryTime, style: .time)")
                        .font(.body)
                        .fontWeight(.medium)
                }
                
                HStack {
                    Image(systemName: "location")
                        .foregroundColor(.green)
                    Text(context.state.driverLocation)
                        .font(.body)
                        .fontWeight(.medium)
                }
            }
            .padding()
            .background(Color.white)
            .cornerRadius(12)
            
        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI
                DynamicIslandExpandedRegion(.leading) {
                    HStack {
                        Image(systemName: "takeoutbag.and.cup.and.straw")
                            .foregroundColor(.orange)
                        VStack(alignment: .leading) {
                            Text(context.attributes.restaurantName)
                                .font(.caption)
                                .fontWeight(.semibold)
                            Text("#\(context.state.orderNumber)")
                                .font(.caption2)
                                .foregroundColor(.secondary)
                        }
                    }
                }
                
                DynamicIslandExpandedRegion(.trailing) {
                    VStack(alignment: .trailing) {
                        Text(context.state.currentStatus)
                            .font(.caption)
                            .fontWeight(.semibold)
                        Text(context.state.estimatedDeliveryTime, style: .timer)
                            .font(.caption2)
                            .foregroundColor(.blue)
                    }
                }
                
                DynamicIslandExpandedRegion(.center) {
                    HStack {
                        Image(systemName: "person.circle")
                            .foregroundColor(.blue)
                        Text(context.state.driverName)
                            .font(.caption)
                        Spacer()
                        Text(context.state.driverLocation)
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                
                DynamicIslandExpandedRegion(.bottom) {
                    HStack {
                        Image(systemName: "location")
                            .foregroundColor(.green)
                        Text(context.attributes.customerAddress)
                            .font(.caption2)
                            .foregroundColor(.secondary)
                            .lineLimit(1)
                        Spacer()
                        Text(context.attributes.orderTotal)
                            .font(.caption)
                            .fontWeight(.semibold)
                    }
                }
                
            } compactLeading: {
                Image(systemName: "takeoutbag.and.cup.and.straw")
                    .foregroundColor(.orange)
            } compactTrailing: {
                Text(context.state.estimatedDeliveryTime, style: .timer)
                    .font(.caption2)
                    .fontWeight(.semibold)
                    .foregroundColor(.blue)
            } minimal: {
                Image(systemName: "takeoutbag.and.cup.and.straw")
                    .foregroundColor(.orange)
            }
        }
    }
}

extension DeliveryActivityAttributes {
  fileprivate static var preview: DeliveryActivityAttributes {
    DeliveryActivityAttributes(restaurantName: "McDonald's", orderTotal: "U$ 29.90", customerAddress: "200 N Spring St, San Francisco, CA 94102")
  }
}

#Preview("Notification", as: .content, using: DeliveryActivityAttributes.preview){
  DeliveryActivityWidget()
} contentStates: {
  DeliveryActivityAttributes.ContentState.init(driverName: "Luan", estimatedDeliveryTime: Date.now + (600), orderNumber: "1231231", currentStatus: "On the way", driverLocation: "10 N Spring St, San Francisco, CA 94102")
}
