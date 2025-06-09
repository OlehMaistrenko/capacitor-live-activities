# Container Examples

Containers are the building blocks of Live Activities layouts, allowing you to organize and arrange other elements using vertical stacks (VStack), horizontal stacks (HStack), and overlapping stacks (ZStack).

## 🎯 What You'll Learn

- Container direction types (vertical, horizontal, stack/overlay)
- Nested container layouts
- Background gradients and styling
- Spacing and padding control
- Complex multi-section layouts
- Professional dashboard designs

## 📚 Container Types

### VStack (Vertical)
Elements arranged vertically, top to bottom
```typescript
{ direction: "vertical" }
```

### HStack (Horizontal)
Elements arranged horizontally, left to right
```typescript
{ direction: "horizontal" }
```

### ZStack (Overlay)
Elements layered on top of each other
```typescript
{ direction: "stack" }
```

## 🎨 ZStack with Gradient Background

Creates layered layouts with gradient backgrounds and overlaid content.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "stack-layout-example",
    type: "container",
    properties: [
      { direction: "stack" },
      { padding: 16 },
      { cornerRadius: 12 },
      { height: 80 }
    ],
    children: [
      {
        id: "background-gradient",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { 
            backgroundGradient: { 
              colors: ["#667eea", "#764ba2"], 
              startPoint: "topLeading", 
              endPoint: "bottomTrailing" 
            } 
          },
          { cornerRadius: 12 }
        ],
        children: []
      },
      {
        id: "content-overlay",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 12 },
          { padding: 16 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "overlay-icon",
            type: "image",
            properties: [
              { systeName: "layers.fill" },
              { color: "#ffffff" },
              { width: 32 },
              { height: 32 }
            ]
          },
          {
            id: "overlay-text",
            type: "text",
            properties: [
              { text: "{{title}}" },
              { fontSize: 18 },
              { fontWeight: "bold" },
              { color: "#ffffff" }
            ]
          }
        ]
      }
    ]
  },
  data: {
    title: "ZStack with Gradient"
  },
  behavior: {
    systemActionForegroundColor: "#667eea",
    widgetUrl: "https://example.com",
    keyLineTint: "#667eea"
  }
});
```

### ZStack Features

- **Gradient Background**: Blue-purple diagonal gradient
- **Content Overlay**: Icon and text layered on top
- **Fixed Height**: 80pt container height
- **Rounded Corners**: 12pt corner radius for modern look

## 🏗️ Complex Multi-Section Layout

Advanced layout combining multiple container types with gradient headers and metric sections.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "complex-layout-example",
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 16 },
      { backgroundColor: "#ffffff" },
      { cornerRadius: 16 },
      { borderWidth: 1 },
      { borderColor: "#E5E5EA" }
    ],
    children: [
      {
        id: "header-section",
        type: "container",
        properties: [
          { direction: "stack" },
          { height: 60 }
        ],
        children: [
          {
            id: "header-background",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { 
                backgroundGradient: { 
                  colors: ["#FF6B35", "#F7931E"], 
                  startPoint: "leading", 
                  endPoint: "trailing" 
                } 
              },
              { cornerRadius: 8 }
            ],
            children: []
          },
          {
            id: "header-content",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 12 },
              { padding: 12 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "app-icon",
                type: "image",
                properties: [
                  { systeName: "star.circle.fill" },
                  { color: "#ffffff" },
                  { width: 32 },
                  { height: 32 }
                ]
              },
              {
                id: "header-text",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 2 }
                ],
                children: [
                  {
                    id: "app-name",
                    type: "text",
                    properties: [
                      { text: "{{appName}}" },
                      { fontSize: 16 },
                      { fontWeight: "bold" },
                      { color: "#ffffff" }
                    ]
                  },
                  {
                    id: "status",
                    type: "text",
                    properties: [
                      { text: "{{status}}" },
                      { fontSize: 12 },
                      { color: "#ffffff" },
                      { opacity: 0.9 }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "main-content",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 16 },
          { insideAlignment: "top" }
        ],
        children: [
          {
            id: "left-column",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 8 }
            ],
            children: [
              {
                id: "metric-1",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 4 },
                  { padding: 8 },
                  { backgroundColor: "#F2F2F7" },
                  { cornerRadius: 6 }
                ],
                children: [
                  {
                    id: "metric-1-value",
                    type: "text",
                    properties: [
                      { text: "{{metric1Value}}" },
                      { fontSize: 18 },
                      { fontWeight: "bold" },
                      { color: "#007AFF" },
                      { alignment: "center" }
                    ]
                  },
                  {
                    id: "metric-1-label",
                    type: "text",
                    properties: [
                      { text: "{{metric1Label}}" },
                      { fontSize: 10 },
                      { color: "#666666" },
                      { alignment: "center" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "right-column",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 8 }
            ],
            children: [
              {
                id: "metric-2",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 4 },
                  { padding: 8 },
                  { backgroundColor: "#F2F2F7" },
                  { cornerRadius: 6 }
                ],
                children: [
                  {
                    id: "metric-2-value",
                    type: "text",
                    properties: [
                      { text: "{{metric2Value}}" },
                      { fontSize: 18 },
                      { fontWeight: "bold" },
                      { color: "#34C759" },
                      { alignment: "center" }
                    ]
                  },
                  {
                    id: "metric-2-label",
                    type: "text",
                    properties: [
                      { text: "{{metric2Label}}" },
                      { fontSize: 10 },
                      { color: "#666666" },
                      { alignment: "center" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  data: {
    appName: "Container Showcase",
    status: "Multi-layout demo",
    metric1Value: "42",
    metric1Label: "Score",
    metric2Value: "98%",
    metric2Label: "Accuracy"
  },
  behavior: {
    systemActionForegroundColor: "#FF6B35",
    widgetUrl: "https://example.com",
    keyLineTint: "#FF6B35"
  }
});
```

### Complex Layout Features

- **Header Section**: ZStack with gradient background and overlaid content
- **Two-Column Layout**: Horizontal container with left and right columns
- **Metric Cards**: Individual containers with padding and background colors
- **Nested Structure**: Multiple levels of container nesting
- **Orange Gradient**: Horizontal gradient from orange to yellow

## 📊 Analytics Dashboard

Professional dashboard layout with dark theme and statistics grid.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "dashboard-example",
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 14 },
      { padding: 18 },
      { backgroundColor: "#1a1a1a" },
      { cornerRadius: 14 }
    ],
    children: [
      {
        id: "dashboard-header",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 10 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "dashboard-icon",
            type: "image",
            properties: [
              { systeName: "chart.line.uptrend.xyaxis" },
              { color: "#007AFF" },
              { width: 24 },
              { height: 24 }
            ]
          },
          {
            id: "dashboard-title",
            type: "text",
            properties: [
              { text: "{{dashboardTitle}}" },
              { fontSize: 16 },
              { fontWeight: "semibold" },
              { color: "#ffffff" }
            ]
          }
        ]
      },
      {
        id: "stats-grid",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 12 }
        ],
        children: [
          {
            id: "stat-1",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 6 },
              { padding: 12 },
              { backgroundColor: "#2c2c2e" },
              { cornerRadius: 8 }
            ],
            children: [
              {
                id: "stat-1-icon",
                type: "image",
                properties: [
                  { systeName: "person.3.fill" },
                  { color: "#30D158" },
                  { width: 16 },
                  { height: 16 }
                ]
              },
              {
                id: "stat-1-value",
                type: "text",
                properties: [
                  { text: "{{users}}" },
                  { fontSize: 16 },
                  { fontWeight: "bold" },
                  { color: "#ffffff" },
                  { alignment: "center" }
                ]
              },
              {
                id: "stat-1-label",
                type: "text",
                properties: [
                  { text: "Users" },
                  { fontSize: 10 },
                  { color: "#8e8e93" },
                  { alignment: "center" }
                ]
              }
            ]
          },
          {
            id: "stat-2",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 6 },
              { padding: 12 },
              { backgroundColor: "#2c2c2e" },
              { cornerRadius: 8 }
            ],
            children: [
              {
                id: "stat-2-icon",
                type: "image",
                properties: [
                  { systeName: "dollarsign.circle.fill" },
                  { color: "#FFD60A" },
                  { width: 16 },
                  { height: 16 }
                ]
              },
              {
                id: "stat-2-value",
                type: "text",
                properties: [
                  { text: "{{revenue}}" },
                  { fontSize: 16 },
                  { fontWeight: "bold" },
                  { color: "#ffffff" },
                  { alignment: "center" }
                ]
              },
              {
                id: "stat-2-label",
                type: "text",
                properties: [
                  { text: "Revenue" },
                  { fontSize: 10 },
                  { color: "#8e8e93" },
                  { alignment: "center" }
                ]
              }
            ]
          },
          {
            id: "stat-3",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 6 },
              { padding: 12 },
              { backgroundColor: "#2c2c2e" },
              { cornerRadius: 8 }
            ],
            children: [
              {
                id: "stat-3-icon",
                type: "image",
                properties: [
                  { systeName: "arrow.up.right.circle.fill" },
                  { color: "#FF453A" },
                  { width: 16 },
                  { height: 16 }
                ]
              },
              {
                id: "stat-3-value",
                type: "text",
                properties: [
                  { text: "{{growth}}" },
                  { fontSize: 16 },
                  { fontWeight: "bold" },
                  { color: "#ffffff" },
                  { alignment: "center" }
                ]
              },
              {
                id: "stat-3-label",
                type: "text",
                properties: [
                  { text: "Growth" },
                  { fontSize: 10 },
                  { color: "#8e8e93" },
                  { alignment: "center" }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  data: {
    dashboardTitle: "Analytics Dashboard",
    users: "1.2K",
    revenue: "$5.4K",
    growth: "+12%"
  },
  behavior: {
    systemActionForegroundColor: "#007AFF",
    widgetUrl: "https://example.com",
    keyLineTint: "#007AFF"
  }
});
```

### Dashboard Features

- **Dark Theme**: Professional dark background with light text
- **Three-Column Stats**: Equal-width statistic cards
- **Color-Coded Icons**: Different colors for different metrics
- **Compact Design**: Efficient use of space with proper spacing

## 🔄 Updating Container Layouts

Update data within complex container structures:

```typescript
await LiveActivities.updateActivity({
  activityId: "your-activity-id",
  data: {
    title: "Updated Container Layout",
    appName: "Updated App",
    status: "Updated layout demo",
    metric1Value: "58",
    metric1Label: "Updated Score",
    metric2Value: "95%",
    metric2Label: "Updated Accuracy",
    dashboardTitle: "Updated Analytics",
    users: "1.5K",
    revenue: "$6.2K",
    growth: "+18%"
  },
  alertConfiguration: {
    title: "Layout Updated",
    body: "Container layout has been updated"
  }
});
```

## 📋 Container Properties Reference

### Direction Properties
| Property | Type | Description |
|----------|------|-------------|
| `direction` | string | `"vertical"`, `"horizontal"`, or `"stack"` |

### Layout Properties
| Property | Type | Description |
|----------|------|-------------|
| `spacing` | number | Space between child elements in points |
| `padding` | number or boolean | Internal padding (uniform or true for default) |
| `insideAlignment` | string | Alignment of children within the container |

### Styling Properties
| Property | Type | Description |
|----------|------|-------------|
| `backgroundColor` | ColorString | Container background color |
| `cornerRadius` | number | Rounded corner radius in points |
| `borderWidth` | number | Border thickness in points |
| `borderColor` | ColorString | Border color |

### Advanced Properties
| Property | Type | Description |
|----------|------|-------------|
| `backgroundGradient` | object | Gradient background configuration |
| `width` | number | Fixed container width |
| `height` | number | Fixed container height |

## 🎨 Background Gradients

### Gradient Configuration
```typescript
{
  backgroundGradient: {
    colors: ["#FF6B35", "#F7931E"],  // Array of colors
    startPoint: "leading",            // Start position
    endPoint: "trailing"              // End position
  }
}
```

### Gradient Points
| Point | Description |
|-------|-------------|
| `"top"` | Top edge |
| `"bottom"` | Bottom edge |
| `"leading"` | Left edge (leading in LTR) |
| `"trailing"` | Right edge (trailing in LTR) |
| `"topLeading"` | Top-left corner |
| `"topTrailing"` | Top-right corner |
| `"bottomLeading"` | Bottom-left corner |
| `"bottomTrailing"` | Bottom-right corner |
| `"center"` | Center point |

### Popular Gradient Combinations
```typescript
// Blue to Purple
colors: ["#667eea", "#764ba2"]

// Orange to Yellow
colors: ["#FF6B35", "#F7931E"]

// Green to Blue
colors: ["#11998e", "#38ef7d"]

// Purple to Pink
colors: ["#667eea", "#f093fb"]

// Red to Orange
colors: ["#ff416c", "#ff4b2b"]
```

## 📏 Alignment Options

### Vertical Container Alignment (VStack)
| Alignment | Description |
|-----------|-------------|
| `"leading"` | Left-aligned |
| `"center"` | Center-aligned |
| `"trailing"` | Right-aligned |

### Horizontal Container Alignment (HStack)
| Alignment | Description |
|-----------|-------------|
| `"top"` | Top-aligned |
| `"center"` | Center-aligned |
| `"bottom"` | Bottom-aligned |

### Stack Container Alignment (ZStack)
| Alignment | Description |
|-----------|-------------|
| `"top"` | Top edge |
| `"bottom"` | Bottom edge |
| `"leading"` | Left edge |
| `"trailing"` | Right edge |
| `"center"` | Center |
| `"top-leading"` | Top-left |
| `"top-trailing"` | Top-right |
| `"bottom-leading"` | Bottom-left |
| `"bottom-trailing"` | Bottom-right |

## 💡 Best Practices

1. **Hierarchy**: Use consistent spacing values (8, 12, 16, 20) for visual hierarchy
2. **Nesting**: Limit container nesting depth to 4-5 levels for performance
3. **Fixed Heights**: Use fixed heights sparingly, prefer flexible layouts
4. **Color Consistency**: Use consistent background colors throughout your design
5. **Spacing**: Maintain consistent spacing between related elements
6. **Accessibility**: Ensure sufficient contrast for text on gradient backgrounds
7. **Performance**: Minimize complex gradients and deeply nested structures

## 🔗 Navigation

- [← Progress Examples](./progress-examples.md)
- [Football Scoreboard →](./football-scoreboard.md)

---

💡 **Next**: See a complete real-world example with the [Football Scoreboard](./football-scoreboard.md) implementation.