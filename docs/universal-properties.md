# Universal Properties - Complete Documentation

## Overview

All elements in the JSON layout system support universal properties applied through the **ViewModifierChain**. These properties allow fine control over appearance, positioning, and behavior of any element.

## 📐 Frame Properties - Dimensions and Alignment

### Size Properties

```json
{
  "properties": [
    { "width": 200 },           // Fixed width
    { "height": 60 },           // Fixed height
    { "minWidth": 100 },        // Minimum width
    { "maxWidth": 300 },        // Maximum width
    { "minHeight": 40 },        // Minimum height
    { "maxHeight": 100 },       // Maximum height
    { "idealWidth": 150 },      // Ideal (flexible) width
    { "idealHeight": 50 }       // Ideal (flexible) height
  ]
}
```

### Alignment Properties

```json
{
  "properties": [
    { "alignment": "center" }    // Alignment within the parent container
  ]
}
```

#### Supported Alignment Values

| Value | Description | SwiftUI Equivalent |
|-------|-------------|---------------------|
| `"center"` | Center | `.center` |
| `"top"` | Top | `.top` |
| `"bottom"` | Bottom | `.bottom` |
| `"leading"` or `"left"` | Left | `.leading` |
| `"trailing"` or `"right"` | Right | `.trailing` |
| `"top-leading"` or `"top-left"` | Top left | `.topLeading` |
| `"top-trailing"` or `"top-right"` | Top right | `.topTrailing` |
| `"bottom-leading"` or `"bottom-left"` | Bottom left | `.bottomLeading` |
| `"bottom-trailing"` or `"bottom-right"` | Bottom right | `.bottomTrailing` |

## 📦 Padding Properties - Internal Spacing

```json
{
  "properties": [
    { "padding": 16 },           // Padding on all sides
    { "paddingVertical": 12 },   // Vertical padding (top + bottom)
    { "paddingHorizontal": 20 }, // Horizontal padding (leading + trailing)
    { "paddingTop": 10 },        // Padding only at the top
    { "paddingBottom": 10 },     // Padding only at the bottom
    { "paddingLeading": 15 },    // Padding only on the left
    { "paddingTrailing": 15 }    // Padding only on the right
  ]
}
```

## 📍 Offset Properties - Positioning

```json
{
  "properties": [
    { "offsetX": 10 },          // Horizontal offset
    { "offsetY": -5 }           // Vertical offset
  ]
}
```

## 🎨 Appearance Properties - Visual Appearance

### Opacity and Z-Index

```json
{
  "properties": [
    { "opacity": 0.8 },         // Transparency (0.0 to 1.0)
    { "zIndex": 10 }            // Stacking order
  ]
}
```

### Rounded Corners

```json
{
  "properties": [
    { "cornerRadius": 12 }      // Corner radius
  ]
}
```

### Shadows

```json
{
  "properties": [
    { "shadowColor": "#000000" },    // Shadow color
    { "shadowRadius": 4 },           // Shadow blur
    { "shadowOffsetX": 2 },          // Shadow X offset
    { "shadowOffsetY": 2 }           // Shadow Y offset
  ]
}
```

## 🔄 Transform Properties - Transformations

### Rotation

```json
{
  "properties": [
    { "rotation": 45 }          // Rotation in degrees
  ]
}
```

### Scale

```json
{
  "properties": [
    { "scale": 1.2 },           // Uniform scale
    { "scaleX": 1.5 },          // Horizontal scale
    { "scaleY": 0.8 }           // Vertical scale
  ]
}
```

## 🎭 Style Properties - Styling

### Background Colors

```json
{
  "properties": [
    { "backgroundColor": "#1C1C1E" },        // Solid color
    { "backgroundGradient": "linear" },      // Linear gradient
    { "backgroundCapsule": true }            // Capsule-shaped background
  ]
}
```

### Text/Foreground Colors

```json
{
  "properties": [
    { "foregroundColor": "#FFFFFF" }         // Content color
  ]
}
```

## 🔧 Predefined System Colors

The system supports named colors in addition to hexadecimal values:

### iOS System Colors

```json
{
  "color": "systemBlue",        // #007AFF
  "color": "systemGreen",       // #34C759  
  "color": "systemRed",         // #FF3B30
  "color": "systemOrange",      // #FF9500
  "color": "systemYellow",      // #FFCC00
  "color": "systemPurple",      // #AF52DE
  "color": "systemPink",        // #FF2D92
  "color": "systemTeal"         // #5AC8FA
}
```

### Basic Colors

```json
{
  "color": "red",
  "color": "blue", 
  "color": "green",
  "color": "yellow",
  "color": "orange",
  "color": "purple",
  "color": "pink",
  "color": "black",
  "color": "white",
  "color": "gray",
  "color": "clear"
}
```

### Semantic Colors

```json
{
  "color": "primary",           // Primary theme color
  "color": "secondary",         // Secondary color
  "color": "accent"            // Highlight color
}
```

## 📝 Naming Corrections

### ⚠️ Identified and Corrected Inconsistencies

#### Segmented Progress
**Previous Documentation vs Actual Implementation:**

```json
// ❌ Incorrect Documentation
{
  "type": "segmentedProgress",
  "properties": [
    { "currentSegment": 2 },
    { "completedColor": "#34C759" },
    { "pendingColor": "#3A3A3C" },
    { "segmentSpacing": 4 }
  ]
}

// ✅ Correct Implementation
{
  "type": "segmented-progress",
  "properties": [
    { "filled": 2 },             // Not currentSegment
    { "filledColor": "#007AFF" }, // Not completedColor
    { "unfilledColor": "#E5E5E7" }, // Not pendingColor
    { "spacing": 4 },            // Not segmentSpacing
    { "strokeColor": "#C7C7CC" },
    { "strokeDashed": false },
    { "strokeWidth": 1 }
  ]
}
```

#### Image Properties
**Correct Naming:**

```json
// ✅ Correct Properties
{
  "type": "image",
  "properties": [
    { "systemName": "heart.fill" },  // Not systeName
    { "asset": "icon.png" }          // Not bundlePath
  ]
}
```

## 💡 Practical Examples with Universal Properties

### Example 1: Card with Shadow and Transformation

```json
{
  "type": "container",
  "properties": [
    { "direction": "vertical" },
    { "spacing": 12 },
    { "padding": 20 },
    { "backgroundColor": "#1C1C1E" },
    { "cornerRadius": 16 },
    { "shadowColor": "#000000" },
    { "shadowRadius": 8 },
    { "shadowOffsetX": 0 },
    { "shadowOffsetY": 4 },
    { "opacity": 0.95 },
    { "scale": 1.02 }
  ],
  "children": [
    {
      "type": "text",
      "properties": [
        { "text": "{{title}}" },
        { "fontSize": 18 },
        { "fontWeight": "bold" },
        { "foregroundColor": "#FFFFFF" },
        { "paddingBottom": 8 }
      ]
    }
  ]
}
```

### Example 2: Element with Offset and Rotation

```json
{
  "type": "container",
  "properties": [
    { "direction": "horizontal" },
    { "padding": 8 },
    { "offsetX": 10 },
    { "offsetY": -5 },
    { "rotation": 15 }
  ]
}
```

### Example 3: Responsive Layout with Flexible Dimensions

```json
{
  "type": "container",
  "properties": [
    { "direction": "horizontal" },
    { "spacing": 12 },
    { "padding": 16 },
    { "minWidth": 200 },
    { "maxWidth": 400 },
    { "idealHeight": 80 },
    { "alignment": "center" }
  ],
  "children": [
    {
      "type": "image",
      "properties": [
        { "systemName": "star.fill" },
        { "foregroundColor": "systemYellow" },
        { "minWidth": 20 },
        { "maxWidth": 40 },
        { "idealWidth": 24 }
      ]
    },
    {
      "type": "text",
      "properties": [
        { "text": "{{dynamicText}}" },
        { "fontSize": 16 },
        { "paddingLeading": 8 },
        { "maxWidth": 300 }
      ]
    }
  ]
}
```

## ⚠️ Limitations and Considerations

### Performance

- ✅ **Simple transformations** (rotation, scale) are optimized
- ⚠️ **Complex shadows** may impact performance
- ❌ **Avoid very high z-index** (recommended maximum: 1000)

### Compatibility

- ✅ **iOS 16.2+** - All properties supported
- ⚠️ **Gradients** require iOS 17.0+
- ❌ **Some 3D transformations** not supported

### Best Practices

- ✅ Use **relative dimensions** when possible
- ✅ Prefer **named colors** for consistency
- ✅ **Test in different sizes** of Live Activity
- ❌ Avoid **excessive transformations** that confuse the user

---

For more information:

- [JSON Layout Guide](./json-layout-guide.md) - Main guide
- [Troubleshooting Guide](./troubleshooting.md) - Troubleshooting guide