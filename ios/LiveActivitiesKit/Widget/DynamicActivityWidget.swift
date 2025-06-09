import WidgetKit
import SwiftUI
import ActivityKit


@available(iOS 16.2, *)
public struct DynamicActivityWidget: Widget {
    public init() {}
        
    // DynamicIsland Behavior Modifier
    struct DynamicIslandBehaviorModifier {
        let context: ActivityViewContext<DynamicActivityAttributes>
        
        func apply(to content: DynamicIsland) -> DynamicIsland {
            guard let behavior = context.attributes.behavior else { return content }
            
            var modifiedContent = content
            
            if let keyLineTint = behavior["keyLineTint"]?.value as? String {
                modifiedContent = modifiedContent.keylineTint(Color(hex: keyLineTint))
            }
            
            if let widgetUrl = behavior["widgetUrl"]?.value as? String,
               let url = URL(string: widgetUrl) {
                modifiedContent = modifiedContent.widgetURL(url)
            }
            
            return modifiedContent
        }
    }
    
    public var body: some WidgetConfiguration {
        ActivityConfiguration(for: DynamicActivityAttributes.self) { context in
            // Recuperar layout do App Group se necessário
            let layout = context.attributes.layoutJSON.isEmpty
            ? SharedDataManager.shared.getLayoutData(for: context.attributes.activityId).layout ?? "{}"
            : context.attributes.layoutJSON
            
            let behavior = context.attributes.behavior
            let keyLineTint = behavior?["keyLineTint"]?.value as? String
            let systemActionForegroundColor = behavior?["systemActionForegroundColor"]?.value as? String
            let widgetUrl = behavior?["widgetUrl"]?.value as? String
            
            JSONLayoutParser.parseView(
                from: layout,
                with: context.state.data
            )
            .ifLet(keyLineTint) { view, color in
                view.activityBackgroundTint(Color(hex: color))
            }.ifLet(systemActionForegroundColor) { view, color in
                view.activitySystemActionForegroundColor(Color(hex: color))
            }.ifLet(widgetUrl) { view, url in
                view.widgetURL(URL(string: url))
            }
            
        } dynamicIsland: { context in
            
            DynamicIslandBehaviorModifier(context: context).apply(to: DynamicIsland {
                DynamicIslandExpandedRegion(.center) {
                    /* JSONLayoutParser.parseView(
                        from: context.attributes.layoutJSON,
                        with: context.state.data
                    ) */
                    Text("center")
                }
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    // Text("Leading")
                    Image(systemName: "circle.fill")
                        .resizable()
                        .foregroundColor(.cyan)
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
            })
        }
    }
}
