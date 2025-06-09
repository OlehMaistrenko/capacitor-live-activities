import SwiftUI
import WidgetKit
import OSLog
import Compression

class JSONLayoutParser { }

@available(iOS 16.2, *)
extension JSONLayoutParser {    
    static func parseView(from json: String, with data: [String: AnyCodable]) -> AnyView {
        var actualJson = json
        
        // Check if layout is compressed and decompress it
        if json.hasPrefix("__COMPRESSED__:") {
            let compressedBase64 = String(json.dropFirst("__COMPRESSED__:".count))
            if let decompressedLayout = decompressLayoutJSON(compressedBase64) {
                actualJson = decompressedLayout
                print("✅ Widget: Layout decompressed successfully")
            } else {
                print("❌ Widget: Layout decompression failed")
                return AnyView(Text("Decompression failed"))
            }
        }
        
        // Usar uma abordagem customizada para preservar a ordem
        guard let jsonData = actualJson.data(using: .utf8) else {
            return AnyView(Text("Invalid JSON"))
        }
        
        do {
            // Parse manual para preservar ordem
            let jsonObject = try JSONSerialization.jsonObject(with: jsonData, options: [])
            guard let layoutDict = jsonObject as? [String: Any] else {
                return AnyView(Text("Invalid Layout"))
            }
            
            let layout = try parseLayoutElement(from: layoutDict)
            
            let view = buildView(from: layout, with: data)
            
            // let activityBackgroundTint = behaviorDict["backgroundTint"] as? String ?? "#000000"
            // let activitySystemActionForegroundColor = behaviorDict["systemActionForegroundColor"] as? String ?? "#FFFFFF"
            
            return view
            
            // return AnyView(view
            //     .activityBackgroundTint(Color(hex: activityBackgroundTint))
            //     .activitySystemActionForegroundColor(Color(hex: activitySystemActionForegroundColor)))
        } catch {
            return AnyView(Text("Parse Error: \(error.localizedDescription)"))
        }
    }
    
    static func parseLayoutElement(from dict: [String: Any]) throws -> LayoutElement {
        guard let id = dict["id"] as? String,
              let type = dict["type"] as? String else {
            throw ParserError.invalidJson
        }
        
        var propertiesKeysInOrder: [String] = []
        var properties: [String: AnyCodable] = [:]
        
        if let propsArray = dict["properties"] as? [[String: Any]] {
            // Usando forEach para manter a ordem
            propsArray.forEach { item in
                // Cada item tem apenas uma chave-valor, então pegamos o primeiro
                if let firstPair = item.first {
                    propertiesKeysInOrder.append(firstPair.key)
                    properties[firstPair.key] = AnyCodable(firstPair.value)
                    
                    // Logger.viewCycle.error("\(id) -> \(firstPair.key)")
                }
            }
        }
        
        // Logger.viewCycle.error("Propriedades do elemento \(id): \(propertiesKeysInOrder)")
        
        // Parse children
        var children: [LayoutElement]? = nil
        if let childrenArray = dict["children"] as? [[String: Any]] {
            children = try childrenArray.map { try parseLayoutElement(from: $0) }
        }
        
        return LayoutElement(
            id: id,
            type: type,
            properties: properties,
            propertiesKeysInOrder: propertiesKeysInOrder,
            children: children
        )
    }
    
    enum ParserError: Error {
        case invalidJson
    }
    
    private static func decompressLayoutJSON(_ base64String: String) -> String? {
        guard let compressedData = Data(base64Encoded: base64String) else { return nil }
        
        let maxDecompressedSize = compressedData.count * 10 // Estimate 10x expansion
        let destinationBuffer = UnsafeMutablePointer<UInt8>.allocate(capacity: maxDecompressedSize)
        defer { destinationBuffer.deallocate() }
        
        let decompressedSize = compression_decode_buffer(
            destinationBuffer, maxDecompressedSize,
            compressedData.withUnsafeBytes { $0.bindMemory(to: UInt8.self).baseAddress! }, compressedData.count,
            nil, COMPRESSION_ZLIB
        )
        
        guard decompressedSize > 0 else { return nil }
        
        let decompressedData = Data(bytes: destinationBuffer, count: decompressedSize)
        return String(data: decompressedData, encoding: .utf8)
    }
}
