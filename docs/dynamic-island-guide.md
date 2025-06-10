# Dynamic Island Guide

Complete guide for implementing Dynamic Island layouts in Live Activities with all presentation states and validation requirements.

## 🎯 What You'll Learn

- Dynamic Island layout structure and regions
- Presentation states (expanded, compact, minimal)
- Size guidelines and best practices
- Validation requirements
- Advanced layout techniques
- Real-world examples

## 🏝️ Dynamic Island Structure

Dynamic Island has four main presentation states:

### 1. Expanded State
The full Dynamic Island experience with four distinct regions:

```typescript
expanded: {
  leading: LayoutElement,   // Left side icon/content
  trailing: LayoutElement,  // Right side icon/content  
  center: LayoutElement,    // Main content area
  bottom: LayoutElement     // Progress bars, additional info
}
```

### 2. Compact States
Two smaller presentations when multiple activities are active:

```typescript
compactLeading: LayoutElement,   // Left side when leading
compactTrailing: LayoutElement   // Right side when trailing
```

### 3. Minimal State
Smallest presentation when many activities are running:

```typescript
minimal: LayoutElement  // Single small icon/indicator
```

## 📐 Size Guidelines

### Expanded State
| Region | Recommended Icon Size | Text Size | Use Case |
|--------|---------------------|-----------|----------|
| Leading | 18-20pt | 9pt labels | Primary action/status icon |
| Trailing | 18-20pt | 9pt labels | Secondary action/value |
| Center | - | 11-12pt | Main content/title |
| Bottom | - | 10pt | Progress bars, time remaining |

### Compact States
| State | Icon Size | Text Size | Use Case |
|-------|-----------|-----------|----------|
| Compact Leading | 16pt | 11-12pt | Primary indicator |
| Compact Trailing | 16pt | 11-12pt | Value/percentage |

### Minimal State
| Element | Size | Use Case |
|---------|------|----------|
| Icon | 12pt | Smallest status indicator |

## 🎨 Layout Examples

### Basic Progress Dynamic Island

```typescript
dynamicIslandLayout: {
  expanded: {
    leading: {
      type: "container",
      properties: [{ direction: "vertical" }, { spacing: 2 }],
      children: [
        {
          type: "image",
          properties: [
            { systemName: "arrow.down.circle.fill" },
            { color: "#007AFF" },
            { width: 20 },
            { height: 20 }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "Download" },
            { fontSize: 9 },
            { color: "#8E8E93" }
          ]
        }
      ]
    },
    trailing: {
      type: "text",
      properties: [
        { text: "{{progressText}}" },
        { fontSize: 12 },
        { fontWeight: "semibold" },
        { color: "#FFFFFF" }
      ]
    },
    center: {
      type: "text",
      properties: [
        { text: "{{title}}" },
        { fontSize: 11 },
        { fontWeight: "medium" },
        { color: "#FFFFFF" }
      ]
    },
    bottom: {
      type: "progress",
      properties: [
        { value: 0.65 },
        { total: 1.0 },
        { color: "#007AFF" },
        { height: 4 }
      ]
    }
  },
  compactLeading: {
    type: "image",
    properties: [
      { systemName: "arrow.down.circle.fill" },
      { color: "#007AFF" },
      { width: 16 },
      { height: 16 }
    ]
  },
  compactTrailing: {
    type: "text",
    properties: [
      { text: "65%" },
      { fontSize: 12 },
      { fontWeight: "semibold" },
      { color: "#FFFFFF" }
    ]
  },
  minimal: {
    type: "image",
    properties: [
      { systemName: "arrow.down.circle.fill" },
      { color: "#007AFF" },
      { width: 12 },
      { height: 12 }
    ]
  }
}
```

### Multi-Value Dynamic Island

```typescript
dynamicIslandLayout: {
  expanded: {
    leading: {
      type: "container",
      properties: [{ direction: "vertical" }, { spacing: 2 }],
      children: [
        {
          type: "image",
          properties: [
            { systemName: "cpu" },
            { color: "#FF6B35" },
            { width: 18 },
            { height: 18 }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "CPU" },
            { fontSize: 9 },
            { color: "#8E8E93" }
          ]
        }
      ]
    },
    trailing: {
      type: "container",
      properties: [{ direction: "vertical" }, { spacing: 2 }],
      children: [
        {
          type: "image",
          properties: [
            { systemName: "memorychip" },
            { color: "#34C759" },
            { width: 18 },
            { height: 18 }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "RAM" },
            { fontSize: 9 },
            { color: "#8E8E93" }
          ]
        }
      ]
    },
    center: {
      type: "container",
      properties: [{ direction: "horizontal" }, { spacing: 8 }],
      children: [
        {
          type: "text",
          properties: [
            { text: "{{cpuUsage}}" },
            { fontSize: 12 },
            { fontWeight: "semibold" },
            { color: "#FF6B35" }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "|" },
            { fontSize: 12 },
            { color: "#8E8E93" }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "{{memoryUsage}}" },
            { fontSize: 12 },
            { fontWeight: "semibold" },
            { color: "#34C759" }
          ]
        }
      ]
    },
    bottom: {
      type: "container",
      properties: [{ direction: "vertical" }, { spacing: 3 }],
      children: [
        {
          type: "progress",
          properties: [
            { value: 0.42 },
            { total: 1.0 },
            { color: "#FF6B35" },
            { height: 3 }
          ]
        },
        {
          type: "progress",
          properties: [
            { value: 0.78 },
            { total: 1.0 },
            { color: "#34C759" },
            { height: 3 }
          ]
        }
      ]
    }
  },
  compactLeading: {
    type: "image",
    properties: [
      { systemName: "cpu" },
      { color: "#FF6B35" },
      { width: 16 },
      { height: 16 }
    ]
  },
  compactTrailing: {
    type: "container",
    properties: [{ direction: "horizontal" }, { spacing: 3 }],
    children: [
      {
        type: "text",
        properties: [
          { text: "42%" },
          { fontSize: 11 },
          { fontWeight: "semibold" },
          { color: "#FF6B35" }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "78%" },
          { fontSize: 11 },
          { fontWeight: "semibold" },
          { color: "#34C759" }
        ]
      }
    ]
  },
  minimal: {
    type: "image",
    properties: [
      { systemName: "cpu" },
      { color: "#FF6B35" },
      { width: 12 },
      { height: 12 }
    ]
  }
}
```

## ⚠️ Validation Requirements

### Required Elements
All Dynamic Island layouts must include:

1. **Expanded object** with at least one region
2. **compactLeading** element
3. **compactTrailing** element  
4. **minimal** element

### Expanded Regions
At least one of these must be provided in the expanded object:

- `leading` - Left side content
- `trailing` - Right side content
- `center` - Main content area
- `bottom` - Bottom content area

### Example Validation Errors

```typescript
// ❌ Missing expanded object
dynamicIslandLayout: {
  compactLeading: { /* ... */ },
  compactTrailing: { /* ... */ },
  minimal: { /* ... */ }
  // Missing: expanded
}

// ❌ Empty expanded object
dynamicIslandLayout: {
  expanded: {
    // No regions defined
  },
  compactLeading: { /* ... */ },
  compactTrailing: { /* ... */ },
  minimal: { /* ... */ }
}

// ✅ Valid - has center region
dynamicIslandLayout: {
  expanded: {
    center: {
      type: "text",
      properties: [{ text: "Valid!" }]
    }
  },
  compactLeading: { /* ... */ },
  compactTrailing: { /* ... */ },
  minimal: { /* ... */ }
}
```

## 🎨 Color Guidelines

### Standard Colors
Use consistent colors across main layout and Dynamic Island:

```typescript
// Primary brand colors
{ color: "#007AFF" }  // iOS Blue
{ color: "#34C759" }  // iOS Green
{ color: "#FF3B30" }  // iOS Red
{ color: "#FF9500" }  // iOS Orange

// Dynamic Island specific
{ color: "#FFFFFF" }  // White text for center/trailing
{ color: "#8E8E93" }  // Muted gray for labels
```

### Dark Mode Considerations
Dynamic Island has a dark background, so ensure:

- Use white (#FFFFFF) for primary text
- Use light colors for icons and progress bars
- Avoid dark colors that won't show up
- Test visibility in both light and dark modes

## 🔧 Advanced Techniques

### 1. Stacked Progress Bars

```typescript
bottom: {
  type: "container",
  properties: [{ direction: "vertical" }, { spacing: 2 }],
  children: [
    {
      type: "progress",
      properties: [
        { value: 0.7 },
        { total: 1.0 },
        { color: "#007AFF" },
        { height: 3 }
      ]
    },
    {
      type: "progress",
      properties: [
        { value: 0.4 },
        { total: 1.0 },
        { color: "#34C759" },
        { height: 3 }
      ]
    }
  ]
}
```

### 2. Multi-Line Text in Compact States

```typescript
compactTrailing: {
  type: "container",
  properties: [{ direction: "vertical" }, { spacing: 1 }],
  children: [
    {
      type: "text",
      properties: [
        { text: "85%" },
        { fontSize: 12 },
        { fontWeight: "bold" },
        { color: "#FFFFFF" }
      ]
    },
    {
      type: "text",
      properties: [
        { text: "2.1MB/s" },
        { fontSize: 9 },
        { color: "#8E8E93" }
      ]
    }
  ]
}
```

### 3. Icon + Text Combinations

```typescript
compactLeading: {
  type: "container",
  properties: [{ direction: "horizontal" }, { spacing: 4 }],
  children: [
    {
      type: "image",
      properties: [
        { systemName: "wifi" },
        { color: "#34C759" },
        { width: 14 },
        { height: 14 }
      ]
    },
    {
      type: "text",
      properties: [
        { text: "4G" },
        { fontSize: 11 },
        { fontWeight: "medium" },
        { color: "#FFFFFF" }
      ]
    }
  ]
}
```

## 📱 Device Compatibility

### Dynamic Island Availability
- **iPhone 14 Pro and Pro Max**: Full Dynamic Island support
- **iPhone 15 series**: Full Dynamic Island support  
- **iPhone 16 series**: Full Dynamic Island support
- **Other iPhones**: Live Activities appear in Lock Screen only

### Fallback Behavior
On devices without Dynamic Island, only the main layout is displayed in:
- Lock Screen notifications
- Notification banners
- iOS Control Center (if supported)

## 🔄 Real-Time Updates

Update Dynamic Island content with the same data structure:

```typescript
await LiveActivities.updateActivity({
  activityId: "your-activity-id",
  data: {
    title: "Updated Title",
    progressText: "75% Complete",
    cpuUsage: "38%",
    memoryUsage: "82%"
  }
});
```

The Dynamic Island will automatically reflect the updated values in all presentation states.

## 💡 Best Practices

1. **Consistency**: Keep visual style consistent between main layout and Dynamic Island
2. **Hierarchy**: Use appropriate sizes to create visual hierarchy
3. **Simplicity**: Don't overcrowd compact states - prioritize key information
4. **Testing**: Test on devices with Dynamic Island for real behavior
5. **Accessibility**: Use sufficient color contrast and clear iconography
6. **Performance**: Avoid complex nested layouts in minimal state
7. **Branding**: Maintain brand colors while ensuring visibility

## 🔗 Related Documentation

- [Progress Examples](./progress-examples.md) - Real progress implementations
- [Timer Examples](./timer-examples.md) - Timer-based Dynamic Islands
- [Container Examples](./container-examples.md) - Complex layout structures
- [JSON Layout Guide](./json-layout-guide.md) - Core layout concepts

---

💡 **Next**: See Dynamic Island in action with [Progress Examples](./progress-examples.md) or explore [Timer Examples](./timer-examples.md).