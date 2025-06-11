# JSON Layout Guide for Live Activities

## Overview

The Capacitor Live Activities JSON layout system allows you to create complex and dynamic interfaces for Live Activities using a simple declarative syntax. This guide teaches you how to create layouts from basic elements to complete and functional layouts.

## Basic Structure

### Anatomy of a Layout

Each JSON layout has three main components:

```typescript
{
  layout: {
    // Definition of the visual structure
  },
  data: {
    // Dynamic data for substitution
  },
  behavior: {
    // Behaviors and actions of the Live Activity
  }
}
```

### Basic Element

Every element in the layout has:

```json
{
  "type": "text|image|container|timer|progress|chart",
  "properties": [
    { "propertyName": "value" }
  ],
  "children": [] // only for containers
}
```

## Element Types

### 1. Text - Text Elements

The `text` element allows you to display fully formatted text.

```json
{
  "type": "text",
  "properties": [
    { "text": "Hello, World!" },
    { "fontSize": 16 },
    { "fontWeight": "bold" },
    { "color": "#000000" }
  ]
}
```

#### Available Properties:

| Property | Type | Description | Example |
|-------------|------|-----------|---------|
| `text` | String | Text to be displayed | `"Hello World"` |
| `fontSize` | Number | Font size | `16` |
| `fontWeight` | String | Font weight | `"bold"`, `"medium"`, `"light"` |
| `color` | String | Text color (hex) | `"#FF0000"` |
| `textAlignment` | String | Alignment | `"leading"`, `"center"`, `"trailing"` |
| `lineLimit` | Number | Line limit | `2` |

### 2. Image - Image Elements

The `image` element supports SF Symbols, URLs, and assets.

```json
{
  "type": "image",
  "properties": [
    { "systemName": "star.fill" },
    { "color": "#FFD700" },
    { "width": 24 },
    { "height": 24 }
  ]
}
```

#### Available Properties:

| Property | Type | Description | Example |
|-------------|------|-----------|---------|
| `systemName` | String | SF Symbol name | `"heart.fill"` |
| `url` | String | Image URL | `"https://example.com/image.png"` |
| `base64` | String | Base64 image | `"data:image/png;base64,..."` |
| `bundlePath` | String | Path in bundle | `"icon.png"` |
| `width` | Number | Width | `24` |
| `height` | Number | Height | `24` |
| `color` | String | Color (SF Symbols) | `"#00FF00"` |

### 3. Container - Layout Containers

The `container` element groups other elements.

```json
{
  "type": "container",
  "properties": [
    { "direction": "vertical" },
    { "spacing": 8 },
    { "padding": 16 }
  ],
  "children": [
    { "type": "text", "properties": [ { "text": "Header" } ] },
    { "type": "text", "properties": [ { "text": "Body text here." } ] }
  ]
}
```

#### Available Properties:

| Property | Type | Description | Values |
|-------------|------|-----------|---------|
| `direction` | String | Layout direction | `"vertical"`, `"horizontal"`, `"stack"` |
| `spacing` | Number | Spacing between elements | `8`, `16`, `24` |
| `padding` | Number | Internal padding | `12`, `16`, `20` |
| `backgroundColor` | String | Background color | `"#FFFFFF"` |
| `cornerRadius` | Number | Corner radius | `8`, `12`, `16` |
| `insideAlignment` | String | Internal alignment | `"leading"`, `"center"`, `"trailing"` |

### 4. Timer - Time Elements

The `timer` element displays dynamic counters and times.

```json
{
  "type": "timer",
  "properties": [
    { "endDate": "{{endTime}}" },
    { "timerStyle": "timer" },
    { "fontSize": 16 },
    { "color": "#FFFFFF" }
  ]
}
```

#### Available Properties:

| Property | Type | Description | Values |
|-------------|------|-----------|---------|
| `endDate` | String | End date/time | ISO 8601 or timestamp |
| `timerStyle` | String | Timer style | `"timer"`, `"relative"`, `"offset"` |
| `fontSize` | Number | Font size | `14`, `16`, `18` |
| `color` | String | Text color | `"#FFFFFF"` |

### 5. Progress - Progress Bars

The `progress` element displays linear progress bars.

```json
{
  "type": "progress",
  "properties": [
    { "value": "{{currentValue}}" },
    { "total": "{{maxValue}}" },
    { "progressTint": "#00FF00" },
    { "trackTint": "#333333" },
    { "height": 8 }
  ]
}
```

#### Available Properties:

| Property | Type | Description | Example |
|-------------|------|-----------|---------|
| `value` | Number | Current value | `0.7` or `70` |
| `total` | Number | Maximum value | `1.0` or `100` |
| `progressTint` | String | Bar color | `"#00FF00"` |
| `trackTint` | String | Background color | `"#333333"` |
| `height` | Number | Bar height | `4`, `8`, `12` |

### 6. Chart - Graphs and Visualizations

The `chart` element allows you to create line, area, and bar charts.

```json
{
  "type": "chart",
  "properties": [
    { "type": "area" },
    { "data": "{{chartData}}" },
    { "width": 300 },
    { "height": 60 },
    { "color": "#00FF00" },
    { "fillColor": "#00FF0030" },
    { "smooth": true }
  ]
}
```

#### Available Properties:

| Property | Type | Description | Values |
|-------------|------|-----------|---------|
| `type` | String | Chart type | `"line"`, `"area"`, `"bar"` |
| `data` | String/Array | Chart data | `[10,20,15,25]` or `"10,20,15,25"` |
| `width` | Number | Width | `200`, `300`, `400` |
| `height` | Number | Height | `40`, `60`, `80` |
| `color` | String | Main color | `"#007AFF"` |
| `fillColor` | String | Fill color | `"#007AFF30"` |
| `smooth` | Boolean | Smooth curves | `true`, `false` |

## Dynamic Data System

### Value Replacement

Use the `{{variableName}}` syntax to insert dynamic data:

```json
{
  "type": "text",
  "properties": [
    { "text": "Price: ${{currentPrice}}" },
    { "color": "{{priceColor}}" }
  ]
}
```

### Sample Data

```typescript
const data = {
  currentPrice: "1,250.00",
  priceColor: "#00FF00",
  chartData: [100, 120, 110, 130, 125],
  progress: 0.75,
  endTime: "2024-01-15T15:30:00Z"
};
```

## Practical Examples

### Example 1: Simple Information Card

```json
{
  "layout": {
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
          { "height": 24 },
          { "color": "#34C759" }
        ]
      },
      {
        "type": "container",
        "properties": [
          { "direction": "vertical" },
          { "spacing": 4 }
        ],
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
  },
  "data": {
    "title": "Order Confirmed",
    "subtitle": "Delivery in 25-30 min"
  }
}
```

### Example 2: Dashboard with Progress

```json
{
  "layout": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 16 },
      { "padding": 20 },
      { "backgroundColor": "#000000" },
      { "cornerRadius": 16 }
    ],
    "children": [
      {
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 12 }
        ],
        "children": [
          {
            "type": "image",
            "properties": [
              { "systemName": "app.fill" },
              { "width": 20 },
              { "height": 20 },
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
          }
        ]
      },
      {
        "type": "container",
        "properties": [
          { "direction": "vertical" },
          { "spacing": 8 }
        ],
        "children": [
          {
            "type": "text",
            "properties": [
              { "text": "{{progressLabel}}" },
              { "fontSize": 14 },
              { "color": "#8E8E93" }
            ]
          },
          {
            "type": "progress",
            "properties": [
              { "value": "{{progress}}" },
              { "total": 1.0 },
              { "progressTint": "#34C759" },
              { "trackTint": "#1C1C1E" },
              { "height": 6 }
            ]
          },
          {
            "type": "text",
            "properties": [
              { "text": "{{progressText}}" },
              { "fontSize": 12 },
              { "color": "#8E8E93" },
              { "textAlignment": "trailing" }
            ]
          }
        ]
      }
    ]
  },
  "data": {
    "appName": "Download Manager",
    "progressLabel": "Downloading file...",
    "progress": 0.65,
    "progressText": "65% complete"
  }
}
```

### Example 3: Financial Chart

```json
{
  "layout": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 12 },
      { "padding": 16 },
      { "backgroundColor": "#1C1C1E" },
      { "cornerRadius": 14 }
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
              { "text": "{{symbol}}" },
              { "fontSize": 16 },
              { "fontWeight": "bold" },
              { "color": "#FFFFFF" }
            ]
          },
          {
            "type": "text",
            "properties": [
              { "text": "${{price}}" },
              { "fontSize": 18 },
              { "fontWeight": "semibold" },
              { "color": "#FFFFFF" }
            ]
          },
          {
            "type": "text",
            "properties": [
              { "text": "{{change}}" },
              { "fontSize": 14 },
              { "color": "{{changeColor}}" }
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
          { "height": 50 },
          { "color": "{{chartColor}}" },
          { "fillColor": "{{chartFillColor}}" },
          { "smooth": true },
          { "strokeWidth": 2 }
        ]
      }
    ]
  },
  "data": {
    "symbol": "AAPL",
    "price": "175.43",
    "change": "+2.15 (+1.24%)",
    "changeColor": "#34C759",
    "chartData": [170, 172, 169, 174, 175, 173, 175],
    "chartColor": "#34C759",
    "chartFillColor": "#34C75930"
  }
}
```

## Behaviors and Actions

### Behavior Configuration

```typescript
const behavior = {
  systemActionForegroundColor: "#007AFF",
  widgetUrl: "myapp://open?section=details",
  keyLineTint: "#007AFF"
};
```

### Behavior Properties:

| Property | Description | Example |
|-------------|-----------|---------|
| `systemActionForegroundColor` | Color of system elements | `"#007AFF"` |
| `widgetUrl` | URL to open the app | `"myapp://details"` |
| `keyLineTint` | Highlight line color | `"#FF0000"` |

## Dynamic Island Layouts

### Overview

Dynamic Island layouts provide additional presentation states for Live Activities on iPhone 14 Pro and later models. You can define custom layouts for all Dynamic Island states:

- **Expanded**: Full Dynamic Island view with multiple regions
- **Compact Leading/Trailing**: Small icons on the sides 
- **Minimal**: Single small element when multiple activities are active

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
  },
  data: {
    // Your data
  }
}
```

### Expanded Layout Regions

The expanded Dynamic Island has four regions:

#### 1. Leading Region
Top-left area, ideal for branding or status icons:

```json
{
  "leading": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 2 }
    ],
    "children": [
      {
        "type": "image",
        "properties": [
          { "systemName": "heart.fill" },
          { "color": "#FF3B30" },
          { "width": 20 },
          { "height": 20 }
        ]
      },
      {
        "type": "text",
        "properties": [
          { "text": "Health" },
          { "fontSize": 9 },
          { "color": "#8E8E93" }
        ]
      }
    ]
  }
}
```

#### 2. Trailing Region
Top-right area, perfect for status updates or values:

```json
{
  "trailing": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 2 },
      { "insideAlignment": "trailing" }
    ],
    "children": [
      {
        "type": "text",
        "properties": [
          { "text": "{{currentValue}}" },
          { "fontSize": 14 },
          { "fontWeight": "bold" },
          { "color": "#FFFFFF" }
        ]
      },
      {
        "type": "text",
        "properties": [
          { "text": "{{status}}" },
          { "fontSize": 9 },
          { "color": "#34C759" }
        ]
      }
    ]
  }
}
```

#### 3. Center Region
Middle area for titles or primary information:

```json
{
  "center": {
    "type": "text",
    "properties": [
      { "text": "{{title}}" },
      { "fontSize": 11 },
      { "fontWeight": "medium" },
      { "color": "#FFFFFF" }
    ]
  }
}
```

#### 4. Bottom Region
Main content area - largest space available:

```json
{
  "bottom": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 4 }
    ],
    "children": [
      {
        "type": "progress",
        "properties": [
          { "value": "{{progressValue}}" },
          { "total": 1.0 },
          { "color": "#007AFF" },
          { "height": 4 }
        ]
      },
      {
        "type": "text",
        "properties": [
          { "text": "{{description}}" },
          { "fontSize": 10 },
          { "color": "#8E8E93" }
        ]
      }
    ]
  }
}
```

### Compact States

#### Compact Leading
Small icon on the left side when Dynamic Island is compact:

```json
{
  "compactLeading": {
    "element": {
      "type": "image",
      "properties": [
        { "systemName": "heart.fill" },
        { "color": "#FF3B30" },
        { "width": 16 },
        { "height": 16 }
      ]
    }
  }
}
```

#### Compact Trailing
Small content on the right side:

```json
{
  "compactTrailing": {
    "element": {
      "type": "container",
      "properties": [
        { "direction": "horizontal" },
        { "spacing": 3 }
      ],
      "children": [
        {
          "type": "text",
          "properties": [
            { "text": "{{shortValue}}" },
            { "fontSize": 12 },
            { "fontWeight": "semibold" },
            { "color": "#FFFFFF" }
          ]
        },
        {
          "type": "image",
          "properties": [
            { "systemName": "arrow.up" },
            { "color": "#34C759" },
            { "width": 10 },
            { "height": 10 }
          ]
        }
      ]
    }
  }
}
```

### Minimal State

When multiple Live Activities are active, only the minimal state is shown:

```json
{
  "minimal": {
    "element": {
      "type": "image",
      "properties": [
        { "systemName": "heart.fill" },
        { "color": "#FF3B30" },
        { "width": 12 },
        { "height": 12 }
      ]
    }
  }
}
```

### Complete Example

Here's a complete example showing a workout tracker with all Dynamic Island states:

```typescript
{
  layout: {
    // Main layout (regular Live Activity)
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 16 },
      { backgroundColor: "#1C1C1E" },
      { cornerRadius: 16 }
    ],
    children: [
      // Main layout elements...
    ]
  },
  dynamicIslandLayout: {
    expanded: {
      leading: {
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 2 }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systemName: "figure.strengthtraining.traditional" },
              { color: "#FF6B35" },
              { width: 20 },
              { height: 20 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "Workout" },
              { fontSize: 9 },
              { color: "#8E8E93" }
            ]
          }
        ]
      },
      trailing: {
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 2 },
          { insideAlignment: "trailing" }
        ],
        children: [
          {
            type: "text",
            properties: [
              { text: "{{workoutTime}}" },
              { fontSize: 14 },
              { fontWeight: "bold" },
              { color: "#FFFFFF" }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{exerciseCount}}" },
              { fontSize: 9 },
              { color: "#FF9500" }
            ]
          }
        ]
      },
      center: {
        type: "text",
        properties: [
          { text: "{{currentExercise}}" },
          { fontSize: 11 },
          { fontWeight: "medium" },
          { color: "#FFFFFF" }
        ]
      },
      bottom: {
        type: "progress",
        properties: [
          { value: "{{progressValue}}" },
          { total: 1.0 },
          { color: "#FF9500" },
          { height: 4 }
        ]
      }
    },
    compactLeading: {
      element: {
        type: "image",
        properties: [
          { systemName: "figure.strengthtraining.traditional" },
          { color: "#FF6B35" },
          { width: 16 },
          { height: 16 }
        ]
      }
    },
    compactTrailing: {
      element: {
        type: "text",
        properties: [
          { text: "{{workoutTime}}" },
          { fontSize: 12 },
          { fontWeight: "semibold" },
          { color: "#FFFFFF" }
        ]
      }
    },
    minimal: {
      element: {
        type: "image",
        properties: [
          { systemName: "flame.fill" },
          { color: "#FF9500" },
          { width: 12 },
          { height: 12 }
        ]
      }
    }
  },
  data: {
    workoutTime: "25min",
    currentExercise: "Push-ups",
    exerciseCount: "3/6",
    progressValue: 0.5
  }
}
```

### Dynamic Island Design Guidelines

#### Size Constraints
- **Expanded**: Maximum height ~160px
- **Compact Leading/Trailing**: 44x44px area
- **Minimal**: 24x24px area

#### Content Recommendations
- **Leading**: App branding, category icons
- **Trailing**: Status indicators, values, timers
- **Center**: Short titles, names
- **Bottom**: Progress bars, charts, detailed info

#### Best Practices
- ✅ Use clear, high-contrast icons
- ✅ Keep text concise and readable
- ✅ Maintain consistent branding across states
- ✅ Test all states during development
- ❌ Don't overcrowd compact states
- ❌ Avoid complex layouts in minimal state
- ❌ Don't rely on tiny text in compact modes

### Testing Dynamic Island

1. **Device Requirements**: iPhone 14 Pro, iPhone 14 Pro Max, or later
2. **Simulator**: Use Xcode simulator with Dynamic Island models
3. **States**: Test expanded, compact, and minimal states
4. **Interactions**: Verify tap actions work in all states

## Best Practices

### 1. Structure and Organization

- ✅ Use unique and descriptive IDs
- ✅ Maintain clear container hierarchy
- ✅ Group related elements
- ❌ Avoid excessive nesting (max 3 levels)

### 2. Performance

- ✅ Limit chart data to 10-15 points
- ✅ Use optimized images (SF Symbols when possible)
- ✅ Keep layouts simple for Dynamic Island
- ❌ Avoid too many elements in small layouts

### 3. Accessibility

- ✅ Use colors with adequate contrast
- ✅ Keep text readable (minimum 12px)
- ✅ Provide clear information in timers
- ❌ Don't rely on colors alone for information

### 4. Responsiveness

- ✅ Test on different Live Activity sizes
- ✅ Use flexible spacings
- ✅ Consider line breaks in long texts
- ❌ Don't use unnecessary fixed dimensions

## Quick Reference

### Common iOS Colors

```json
{
  "systemBlue": "#007AFF",
  "systemGreen": "#34C759",
  "systemRed": "#FF3B30",
  "systemOrange": "#FF9500",
  "systemYellow": "#FFCC00",
  "systemPurple": "#AF52DE",
  "systemBackground": "#000000",
  "systemSecondary": "#1C1C1E",
  "label": "#FFFFFF",
  "secondaryLabel": "#8E8E93"
}
```

### Popular SF Symbols

```json
[
  "checkmark.circle.fill",
  "xmark.circle.fill",
  "clock.fill",
  "heart.fill",
  "star.fill",
  "bell.fill",
  "location.fill",
  "phone.fill",
  "message.fill",
  "camera.fill"
]
```

### Recommended Dimensions

```json
{
  "icons": { "width": 16, "height": 16 },
  "largeIcons": { "width": 24, "height": 24 },
  "smallChart": { "width": 200, "height": 40 },
  "mediumChart": { "width": 300, "height": 60 },
  "progressBar": { "height": 4 },
  "thickProgressBar": { "height": 8 }
}
```

---

For more practical examples, see the specific documentation files for each element:

- [Text Examples](./text-examples.md)
- [Image Examples](./image-examples.md)
- [Container Examples](./container-examples.md)
- [Timer Examples](./timer-examples.md)
- [Progress Examples](./progress-examples.md)
- [Chart Examples](./chart-examples.md)