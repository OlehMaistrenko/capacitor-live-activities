import WidgetKit
import SwiftUI
import ActivityKit

@available(iOS 16.2, *)
public struct DynamicActivityWidget: Widget {
    public init() {}
    
    public var body: some WidgetConfiguration {
        ActivityConfiguration(for: DynamicActivityAttributes.self) { context in
            // Recuperar layout do App Group se necessário
            let layout = context.attributes.layoutJSON.isEmpty
            ? SharedDataManager.shared.getLayoutData(for: context.attributes.activityId).layout ?? "{}"
            : context.attributes.layoutJSON
            
            JSONLayoutParser.parseView(
                from: layout,
                with: context.state.data
            )
            
            
        } dynamicIsland: { context in
            
            DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    JSONLayoutParser.parseView(
                        from: context.attributes.layoutJSON,
                        with: context.state.data
                    )
                }
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.data.count)")
                    // more content
                }
            } compactLeading: {
                Image(systemName: "app.fill")
            } compactTrailing: {
                Text("Live")
            } minimal: {
                Image(systemName: "circle.fill")
                    .foregroundColor(.cyan)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}
