import SwiftUI
import OSLog

@available(iOS 16.2, *)
extension JSONLayoutParser {
    static func buildProgressView(_ element: LayoutElement, _ data: [String: AnyCodable]) -> AnyView {
        let value = getDouble(from: resolveValue(element.properties["value"], with: data)) ?? 0
        let total = getDouble(from: resolveValue(element.properties["total"], with: data)) ?? 1
        let color = getString(from: resolveValue(element.properties["color"], with: data)) ?? "#007AFF"
        let height = getDouble(from: resolveValue(element.properties["height"], with: data)) ?? 4
        
        Logger.viewCycle.error("📀 buildProgressView -> \(value)/\(total), \(color), \(height)")
        
        return AnyView(
            ProgressView(value: value, total: total)
                .progressViewStyle(LinearProgressViewStyle(tint: Color(hex: color)))
                .frame(height: CGFloat(height))
        )
    }
    
    static func buildTimerView(_ element: LayoutElement, _ data: [String: AnyCodable]) -> AnyView {
        let endTime = getDouble(from: resolveValue(element.properties["endTime"], with: data))
        let style = getString(from: resolveValue(element.properties["style"], with: data))
             
        // Logger.viewCycle.error("DEBUG_TIMER \(style ?? "-") / \(endTime ?? 0) / \(element.properties["endTime"].value)")
        
        if(endTime == nil || style == nil){
            return AnyView(Text("Invalid Timer").foregroundColor(Color.red))
        }
        
        let endDate = Date(timeIntervalSince1970: endTime! / 1000) // Converter de JS timestamp (ms) para segundos
        
        
        
        let selectedStyle: Text.DateStyle = {
            switch style {
            case "timer": return .timer
            case "offset": return .offset
            case "relative": return .relative
            case "date": return .date
            case "time": return .time
            default: return .date
            }
        }()
        
        Logger.viewCycle.error("📀 buildTimerView -> endDate: \(endDate) / style: \(style ?? "-")")
        
        if(style == "countdown"){
            return AnyView(Text(
                timerInterval: Date.now...endDate,
                pauseTime: nil,
                countsDown: true,
                showsHours: false
            ).modifier(ViewModifierText(element: element, data: data)))
            
        }
        
        return AnyView(Text(endDate, style: selectedStyle).modifier(ViewModifierText(element: element, data: data)))
    }
}
