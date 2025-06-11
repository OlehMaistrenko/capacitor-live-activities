# Quick Reference

## 🚀 Basic Structure

```typescript
{
  layout: {
    type: "container|text|image|timer|progress|chart|segmentedProgress",
    properties: [
      { propertyName: "value" }
    ],
    children: [] // only for containers
  },
  data: {
    variableName: "value"
  },
  behavior: {
    systemActionForegroundColor: "#007AFF",
    widgetUrl: "myapp://action",
    keyLineTint: "#007AFF"
  }
}
```

## 📱 Element Types

### Container

```json
{
  "type": "container",
  "properties": [
    { "direction": "vertical|horizontal|stack" },
    { "spacing": 16 },
    { "padding": 20 },
    { "backgroundColor": "#000000" },
    { "cornerRadius": 12 },
    { "insideAlignment": "leading|center|trailing" }
  ]
}
```

### Text

```json
{
  "type": "text",
  "properties": [
    { "text": "{{dynamicText}}" },
    { "fontSize": 16 },
    { "fontWeight": "bold|medium|light" },
    { "color": "#FFFFFF" },
    { "textAlignment": "leading|center|trailing" },
    { "lineLimit": 2 }
  ]
}
```

### Image

```json
{
  "type": "image",
  "properties": [
    { "systemName": "heart.fill" },
    { "url": "https://example.com/image.png" },
    { "base64": "data:image/png;base64,..." },
    { "asset": "icon.png" },
    { "width": 24 },
    { "height": 24 },
    { "color": "#00FF00" },
    { "cornerRadius": 12 }
  ]
}
```

### Timer

```json
{
  "type": "timer",
  "properties": [
    { "endDate": "{{endTime}}" },
    { "timerStyle": "timer|relative|offset" },
    { "fontSize": 16 },
    { "color": "#FFFFFF" }
  ]
}
```

### Progress

```json
{
  "type": "progress",
  "properties": [
    { "value": "{{current}}" },
    { "total": "{{max}}" },
    { "progressTint": "#00FF00" },
    { "trackTint": "#333333" },
    { "height": 8 }
  ]
}
```

### Chart

```json
{
  "type": "chart",
  "properties": [
    { "type": "line|area|bar" },
    { "data": "{{chartData}}" },
    { "width": 300 },
    { "height": 60 },
    { "color": "#007AFF" },
    { "fillColor": "#007AFF30" },
    { "strokeWidth": 2 },
    { "smooth": true },
    { "showPoints": false },
    { "barSpacing": 2 }
  ]
}
```

### Segmented Progress

```json
{
  "type": "segmented-progress",
  "properties": [
    { "segments": 4 },
    { "filled": 2 },
    { "width": 280 },
    { "height": 8 },
    { "filledColor": "#34C759" },
    { "unfilledColor": "#3A3A3C" },
    { "spacing": 4 },
    { "cornerRadius": 4 },
    { "strokeColor": "#C7C7CC" },
    { "strokeWidth": 1 },
    { "strokeDashed": false }
  ]
}
```

## 🎨 Common iOS Colors

```typescript
const iOSColors = {
  // System Colors
  systemBlue: "#007AFF",
  systemGreen: "#34C759",
  systemRed: "#FF3B30",
  systemOrange: "#FF9500",
  systemYellow: "#FFCC00",
  systemPurple: "#AF52DE",
  systemPink: "#FF2D92",
  systemTeal: "#5AC8FA",
  
  // Backgrounds
  systemBackground: "#000000",
  secondarySystemBackground: "#1C1C1E",
  tertiarySystemBackground: "#2C2C2E",
  
  // Labels
  label: "#FFFFFF",
  secondaryLabel: "#8E8E93",
  tertiaryLabel: "#48484A",
  
  // Fills
  systemFill: "#787880",
  secondarySystemFill: "#787880",
  tertiarySystemFill: "#767680",
  quaternarySystemFill: "#767680"
};
```

## 🔧 Popular SF Symbols

```typescript
const commonSymbols = [
  // Status
  "checkmark.circle.fill",
  "xmark.circle.fill",
  "exclamationmark.triangle.fill",
  "info.circle.fill",
  
  // Navigation
  "chevron.left",
  "chevron.right",
  "chevron.up",
  "chevron.down",
  
  // Actions
  "play.fill",
  "pause.fill",
  "stop.fill",
  "forward.fill",
  "backward.fill",
  
  // Communication
  "message.fill",
  "phone.fill",
  "envelope.fill",
  "bell.fill",
  
  // Time
  "clock.fill",
  "timer",
  "stopwatch.fill",
  "calendar",
  
  // Media
  "heart.fill",
  "star.fill",
  "bookmark.fill",
  "camera.fill",
  
  // System
  "gear",
  "house.fill",
  "person.fill",
  "location.fill",
  
  // Weather
  "sun.max.fill",
  "cloud.fill",
  "cloud.rain.fill",
  "snow",
  
  // Finance
  "creditcard.fill",
  "dollarsign.circle.fill",
  "chart.line.uptrend.xyaxis",
  "bitcoinsign.circle.fill"
];
```

## 📏 Recommended Dimensions

```typescript
const dimensions = {
  // Icons
  smallIcon: { width: 16, height: 16 },
  standardIcon: { width: 24, height: 24 },
  largeIcon: { width: 32, height: 32 },
  
  // Charts
  compactChart: { width: 150, height: 30 },
  standardChart: { width: 280, height: 60 },
  largeChart: { width: 350, height: 80 },
  
  // Progress Bars
  thinProgress: { height: 4 },
  standardProgress: { height: 8 },
  thickProgress: { height: 12 },
  
  // Containers
  smallPadding: 8,
  standardPadding: 16,
  largePadding: 24,
  
  // Spacing
  tightSpacing: 4,
  standardSpacing: 12,
  looseSpacing: 20,
  
  // Corner Radius
  smallRadius: 6,
  standardRadius: 12,
  largeRadius: 16
};
```

## 🎯 Layout Patterns

### Simple Card

```json
{
  "type": "container",
  "properties": [
    { "direction": "horizontal" },
    { "spacing": 12 },
    { "padding": 16 },
    { "backgroundColor": "#1C1C1E" },
    { "cornerRadius": 12 }
  ],
  "children": [
    {
      "type": "image",
      "properties": [
        { "systemName": "checkmark.circle.fill" },
        { "width": 24 },
        { "color": "#34C759" }
      ]
    },
    {
      "type": "container",
      "properties": [{ "direction": "vertical" }, { "spacing": 4 }],
      "children": [
        {
          "type": "text",
          "properties": [
            { "text": "{{title}}" },
            { "fontSize": 16 },
            { "fontWeight": "semibold" },
            { "color": "#FFFFFF" }
          ]
        },
        {
          "type": "text",
          "properties": [
            { "text": "{{subtitle}}" },
            { "fontSize": 14 },
            { "color": "#8E8E93" }
          ]
        }
      ]
    }
  ]
}
```

### Header with Action

```json
{
  "type": "container",
  "properties": [
    { "direction": "horizontal" },
    { "spacing": 12 },
    { "insideAlignment": "center" }
  ],
  "children": [
    {
      "type": "image",
      "properties": [
        { "systemName": "{{appIcon}}" },
        { "width": 20 },
        { "color": "#007AFF" }
      ]
    },
    {
      "type": "text",
      "properties": [
        { "text": "{{appName}}" },
        { "fontSize": 16 },
        { "fontWeight": "medium" },
        { "color": "#FFFFFF" }
      ]
    },
    {
      "type": "text",
      "properties": [
        { "text": "{{status}}" },
        { "fontSize": 14 },
        { "color": "{{statusColor}}" },
        { "textAlignment": "trailing" }
      ]
    }
  ]
}
```

### Metric with Chart

```json
{
  "type": "container",
  "properties": [
    { "direction": "vertical" },
    { "spacing": 8 }
  ],
  "children": [
    {
      "type": "container",
      "properties": [
        { "direction": "horizontal" },
        { "spacing": 8 },
        { "insideAlignment": "center" }
      ],
      "children": [
        {
          "type": "text",
          "properties": [
            { "text": "{{metricName}}" },
            { "fontSize": 14 },
            { "color": "#8E8E93" }
          ]
        },
        {
          "type": "text",
          "properties": [
            { "text": "{{metricValue}}" },
            { "fontSize": 18 },
            { "fontWeight": "bold" },
            { "color": "#FFFFFF" }
          ]
        }
      ]
    },
    {
      "type": "chart",
      "properties": [
        { "type": "area" },
        { "data": "{{chartData}}" },
        { "width": 280 },
        { "height": 40 },
        { "color": "{{chartColor}}" },
        { "smooth": true }
      ]
    }
  ]
}
```

## 🏝️ Dynamic Island Quick Reference

### Basic Structure

```typescript
{
  layout: {
    // Main Live Activity layout
  },
  dynamicIslandLayout: {
    expanded: {
      leading: { /* Left content */ },
      trailing: { /* Right content */ },
      center: { /* Center content */ },
      bottom: { /* Main content area */ }
    },
    compactLeading: {
      element: { /* Small leading icon */ }
    },
    compactTrailing: {
      element: { /* Small trailing icon */ }
    },
    minimal: {
      element: { /* Minimal state icon */ }
    }
  }
}
```

### Dynamic Island Regions

| Region | Description | Best For | Max Size |
|--------|-------------|----------|----------|
| `leading` | Top-left area | App icons, status | 44x44px |
| `trailing` | Top-right area | Values, timers | 44x44px |
| `center` | Middle area | Titles, names | Variable |
| `bottom` | Main content | Progress, charts | ~160px height |

### State Examples

```typescript
// Expanded
expanded: {
  leading: {
    type: "image",
    properties: [
      { systeName: "heart.fill" },
      { color: "#FF3B30" },
      { width: 20 },
      { height: 20 }
    ]
  },
  trailing: {
    type: "text",
    properties: [
      { text: "{{value}}" },
      { fontSize: 14 },
      { fontWeight: "bold" },
      { color: "#FFFFFF" }
    ]
  }
}

// Compact States
compactLeading: {
  element: {
    type: "image",
    properties: [
      { systeName: "heart.fill" },
      { color: "#FF3B30" },
      { width: 16 },
      { height: 16 }
    ]
  }
}

// Minimal State
minimal: {
  element: {
    type: "image",
    properties: [
      { systeName: "circle.fill" },
      { color: "#FF3B30" },
      { width: 12 },
      { height: 12 }
    ]
  }
}
```

### Design Guidelines

- ✅ Use 16-20px icons for expanded regions
- ✅ Use 16px icons for compact states  
- ✅ Use 12px icons for minimal state
- ✅ Keep text concise (max 2-3 words)
- ✅ Test all states during development
- ❌ Don't overcrowd compact layouts
- ❌ Avoid complex nested containers

## ⚡ Development Commands

```bash
# Build the project
npm run build

# Platform verification
npm run verify:ios
npm run verify:android

# Linting
npm run lint
npm run fmt

# Example app
cd example-app
npm install
npm run build
npx cap run ios
```

## 🔗 Useful Links

- [📋 JSON Layout Guide](./json-layout-guide.md) - Complete guide
- [📊 Chart Examples](./chart-examples.md) - Charts
- [📈 Segmented Progress](./segmented-progress-examples.md) - Segmented progress
- [🏠 Main Documentation](./README.md) - General index
- [🔙 Main README](../README.md) - Main project

---

💡 **Tip**: Use this reference as a quick consultation during development. For complete examples, see the specific documentation for each element.