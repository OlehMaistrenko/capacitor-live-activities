import SwiftUI
import OSLog

@available(iOS 16.2, *)
extension JSONLayoutParser {
    static func getDouble(from value: Any?) -> Double? {
        switch value {
        case let double as Double:
            return double
        case let int as Int:
            return Double(int)
        case let float as Float:
            return Double(float)
        case let string as String:
            return Double(string)
        case let anyCodable as AnyCodable:
            return getDouble(from: anyCodable.value)
        default:
            return nil
        }
    }
    
    static func getInt(from value: Any?) -> Int? {
        switch value {
        case let int as Int:
            return int
        case let double as Double:
            return Int(double)
        case let float as Float:
            return Int(float)
        case let string as String:
            return Int(string)
        case let anyCodable as AnyCodable:
            return getInt(from: anyCodable.value)
        default:
            return nil
        }
    }
    
    static func getString(from value: Any?) -> String? {
        switch value {
        case let string as String:
            return string
        case let anyCodable as AnyCodable:
            return getString(from: anyCodable.value)
        case let number as NSNumber:
            return number.stringValue
        case let int as Int:
            return String(int)
        case let double as Double:
            return String(double)
        case let bool as Bool:
            return String(bool)
        default:
            return nil
        }
    }
    
    static func getGradientPoint(from value: String?) -> UnitPoint? {
        guard let value = value else { return nil }
        switch value {
        case "topLeading":
            return .topLeading
        case "topTrailing":
            return .topTrailing
        case "bottomLeading":
            return .bottomLeading
        case "bottomTrailing":
            return .bottomTrailing
        default:
            return .topLeading
        }
    }
    
    static func resolveValue(_ value: AnyCodable?, with data: [String: AnyCodable]) -> Any? {
        guard let value = value else { return nil }
        
        if let stringValue = value.value as? String,
           stringValue.starts(with: "{{") && stringValue.hasSuffix("}}") {
            let key = String(stringValue.dropFirst(2).dropLast(2)).trimmingCharacters(in: .whitespaces)
            return data[key]?.value
        }
        
        return value.value
    }
}

extension Logger {
    /// Using your bundle identifier is a great way to ensure a unique identifier.
    private static var subsystem = Bundle.main.bundleIdentifier!
    
    /// Logs the view cycles like a view that appeared.
    static let viewCycle = Logger(subsystem: subsystem, category: "viewcycle")
    
    /// All logs related to tracking and analytics.
    static let statistics = Logger(subsystem: subsystem, category: "statistics")
}

extension View {
    
    
    @ViewBuilder
    func `if`<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        }else{
            self
        }
    }
    
    @ViewBuilder
    func ifLet<T, Content: View>(_ value: T?, transform: (Self, T) -> Content) -> some View {
        if let value = value {
            transform(self, value)
        } else {
            self
        }
    }
    
    @ViewBuilder
    func ifLetWhen<T, Content: View>(
        _ value: T?,
        when predicate: (T) -> Bool = { _ in true },
        transform: (Self, T) -> Content
    ) -> some View {
        if let v = value, predicate(v) {
            transform(self, v)
        } else {
            self
        }
    }
}


enum FontStyle: String, Codable {
    case largeTitle, title, title2, title3
    case headline, subheadline, body, callout
    case footnote, caption, caption2
    
    var defaultSize: CGFloat {
        switch self {
        case .largeTitle: return 34
        case .title: return 28
        case .title2: return 22
        case .title3: return 20
        case .headline: return 17
        case .subheadline: return 15
        case .body: return 17
        case .callout: return 16
        case .footnote: return 13
        case .caption: return 12
        case .caption2: return 11
        }
    }
    
    var defaultWeight: Font.Weight {
        switch self {
        case .headline: return .semibold
        default: return .regular
        }
    }
    
    var defaultDesign: Font.Design {
        return .default
    }
}
