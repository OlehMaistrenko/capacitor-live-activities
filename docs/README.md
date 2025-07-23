# Live Activities Examples Documentation

This documentation provides comprehensive examples and code snippets for the Capacitor Live Activities plugin. Each example includes detailed explanations, complete code implementations, and visual demonstrations.

## 📚 Table of Contents

### 🎗️ Core Documentation

- [**🧭 Navigation Guide**](./navigation.md) - **Complete navigation of the documentation**

- [**📋 JSON Layout Guide**](./json-layout-guide.md) - **Complete guide for creating layouts**

- [**🏝️ Dynamic Island Guide**](./dynamic-island-guide.md) - **NEW! Complete Dynamic Island guide with examples**

- [**🏝️ Dynamic Island Layouts**](./json-layout-guide.md#dynamic-island-layouts) - **Basic Dynamic Island concepts**

- [**⚡ Quick Reference**](./quick-reference.md) - **Quick reference and cheat sheet**

- [**🔧 Universal Properties**](./universal-properties.md) - **Properties applicable to all elements**

- [**🚨 Troubleshooting Guide**](./troubleshooting.md) - **Solutions for common problems**

- [**📊 Chart Examples**](./chart-examples.md) - **Charts: line, area, and bar charts**

- [**📈 Segmented Progress Examples**](./segmented-progress-examples.md) - **Segmented progress bars**

### Layout Components

- [Text Examples](./text-examples.md) - Typography, formatting, and styling

- [Image Examples](./image-examples.md) - SF Symbols, sizing, and layouts

- [Timer Examples](./timer-examples.md) - Countdown timers and time formatting

- [Progress Examples](./progress-examples.md) - Progress bars and completion tracking

- [Container Examples](./container-examples.md) - Complex layouts with nested elements

### Real-World Examples

- [Football Scoreboard](./football-scoreboard.md) - Complete sports scoreboard with Dynamic Island

- [Food Order Tracking](./food-order-tracking.md) - Real-world delivery tracking example

- [Flight Tracker](./flight-tracker.md) - Real-world flight tracker example

## 🚀 Getting Started

All examples in this documentation are based on the working example app located in the `example-app/` directory. Each example demonstrates:

1. **Layout Configuration** - Complete JSON layout structure

2. **Data Binding** - How to use template variables like `{{variable}}`

3. **Dynamic Island Integration** - All Dynamic Island states when applicable

4. **Real-time Updates** - How to update activities with new data

5. **Best Practices** - Code organization and error handling

## 🧩 Layout System Overview

The Live Activities plugin uses a declarative JSON-to-SwiftUI layout system with these core elements:

### Element Types

- **Container**: Groups other elements (VStack, HStack, ZStack)

- **Text**: Displays styled text content

- **Image**: Shows SF Symbols, URLs, or assets

- **Progress**: Visual progress bars and indicators

- **Timer**: Countdown and relative time displays

- **Chart**: Data visualizations (line, area, bar charts) 📊

- **Segmented Progress**: Multi-stage progress bars 📈

### Property System

All elements use property objects for configuration:

```typescript
properties: [
  { fontSize: 16 },           // Individual property
  { fontWeight: "bold" },     // Another property
  { color: "#FF0000" }        // Color property
]
```

### Data Binding
Use template strings to bind dynamic data:

```typescript
// Layout definition
{ text: "{{userName}}" }

// Data object
data: { userName: "John Doe" }
```

## 🎯 Dynamic Island States

The plugin supports all Dynamic Island presentation states:

- **Expanded**: Full layout with leading, trailing, center, and bottom areas
- **Compact Leading**: Small icon on the left side
- **Compact Trailing**: Small icon on the right side  
- **Minimal**: Tiny circular indicator

## 📱 Running the Examples

To see these examples in action:

```bash
cd example-app
npm install # or pnpm install
npx cap run ios
ionic cap run ios
```

Make sure you have:
- iOS 16.2+ device or simulator

## 🔗 Navigation

- [← Back to Main README](../README.md)
- [Text Examples →](./text-examples.md)

---

💡 **Tip**: Each example page includes complete, copy-paste ready code that you can use in your own projects.
