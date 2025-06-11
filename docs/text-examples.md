# Text Examples

Text elements are the foundation of Live Activities, allowing you to display styled content with various typography options, colors, and formatting.

## 🎯 What You'll Learn

- Text property configuration
- Font sizing and weights
- Color customization
- Text alignment options
- Text formatting (italic, underline, strikethrough)
- Line limits and overflow handling
- Monospaced digits for numbers

## 📝 Basic Text Example

A simple layout demonstrating different text sizes, weights, and alignments.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 16 },
      { backgroundColor: "#f8f9fa" },
      { cornerRadius: 12 }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "{{title}}" },
          { fontSize: 18 },
          { fontWeight: "bold" },
          { color: "#1a1a1a" },
          { alignment: "center" }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{subtitle}}" },
          { fontSize: 14 },
          { color: "#666666" },
          { alignment: "center" },
          { lineLimit: 2 }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{status}}" },
          { fontSize: 12 },
          { fontWeight: "medium" },
          { color: "#007AFF" },
          { alignment: "center" },
          { italic: true }
        ]
      }
    ]
  },
  data: {
    title: "Basic Text Layout",
    subtitle: "Demonstrating different font sizes, weights, and colors",
    status: "Active"
  },
  behavior: {
    systemActionForegroundColor: "#007AFF",
    widgetUrl: "https://example.com",
    keyLineTint: "#007AFF"
  }
});
```

### Key Features

- **Title**: Large, bold text for main headings
- **Subtitle**: Medium text with line limit for descriptions
- **Status**: Small, italic text for status indicators

## 📚 Typography Showcase

Advanced typography example showing different font weights and text alignments.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 8 },
      { padding: 20 },
      { backgroundColor: "#ffffff" },
      { cornerRadius: 16 },
      { borderWidth: 1 },
      { borderColor: "#e5e5e5" }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "{{heading}}" },
          { fontSize: 24 },
          { fontWeight: "heavy" },
          { color: "#2c3e50" },
          { alignment: "leading" }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{body}}" },
          { fontSize: 16 },
          { fontWeight: "regular" },
          { color: "#34495e" },
          { alignment: "leading" },
          { lineLimit: 3 }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{caption}}" },
          { fontSize: 12 },
          { fontWeight: "light" },
          { color: "#7f8c8d" },
          { alignment: "trailing" },
          { italic: true }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{monospace}}" },
          { fontSize: 14 },
          { fontWeight: "medium" },
          { color: "#e74c3c" },
          { alignment: "center" },
          { monospacedDigit: true }
        ]
      }
    ]
  },
  data: {
    heading: "Typography Showcase",
    body: "This example demonstrates different font weights, sizes, and text alignments. Text can be leading, center, or trailing aligned.",
    caption: "Caption with italic styling",
    monospace: "123.456.789"
  },
  behavior: {
    systemActionForegroundColor: "#2c3e50",
    widgetUrl: "https://example.com",
    keyLineTint: "#2c3e50"
  }
});
```

### Typography Features

- **Heavy Font Weight**: For prominent headings
- **Multiple Line Limits**: Control text overflow
- **Text Alignments**: leading, center, trailing
- **Monospaced Digits**: Perfect for numbers and codes

## ✨ Text Formatting Options

Comprehensive example showing all text formatting capabilities.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 10 },
      { padding: 16 },
      { backgroundColor: "#f1f3f4" },
      { cornerRadius: 12 }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "{{normalText}}" },
          { fontSize: 16 },
          { fontWeight: "regular" },
          { color: "#1a1a1a" },
          { alignment: "center" }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{boldText}}" },
          { fontSize: 16 },
          { fontWeight: "bold" },
          { color: "#1a1a1a" },
          { alignment: "center" }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{italicText}}" },
          { fontSize: 16 },
          { fontWeight: "regular" },
          { color: "#1a1a1a" },
          { alignment: "center" },
          { italic: true }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{underlineText}}" },
          { fontSize: 16 },
          { fontWeight: "regular" },
          { color: "#007AFF" },
          { alignment: "center" },
          { underline: true }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{strikethroughText}}" },
          { fontSize: 16 },
          { fontWeight: "regular" },
          { color: "#8e8e93" },
          { alignment: "center" },
          { strikethrough: true }
        ]
      }
    ]
  },
  data: {
    normalText: "Normal Text",
    boldText: "Bold Text",
    italicText: "Italic Text", 
    underlineText: "Underlined Text",
    strikethroughText: "Strikethrough Text"
  },
  behavior: {
    systemActionForegroundColor: "#007AFF",
    widgetUrl: "https://example.com",
    keyLineTint: "#007AFF"
  }
});
```

## 🔄 Updating Text Content

Update any text element dynamically:

```typescript
await LiveActivities.updateActivity({
  activityId: "your-activity-id",
  data: {
    title: "Updated Text Example",
    subtitle: "This text has been updated with new content",
    status: "Updated",
    heading: "Updated Typography",
    body: "The text content has been dynamically updated to show new information.",
    caption: "Updated caption",
    normalText: "Updated Normal Text",
    boldText: "Updated Bold Text"
  },
  alertConfiguration: {
    title: "Text Updated",
    body: "Live Activity text content has been updated"
  }
});
```

## 📋 Text Properties Reference

### Font Properties
| Property | Type | Options | Description |
|----------|------|---------|-------------|
| `fontSize` | number | Any positive number | Text size in points |
| `fontWeight` | string | `"light"`, `"regular"`, `"medium"`, `"semibold"`, `"bold"`, `"heavy"`, `"black"` | Font weight |
| `fontFamily` | string | Any font name | Custom font family |

### Styling Properties
| Property | Type | Options | Description |
|----------|------|---------|-------------|
| `color` | ColorString | Color names or hex codes | Text color |
| `italic` | boolean | `true`, `false` | Italic text style |
| `underline` | boolean | `true`, `false` | Underlined text |
| `strikethrough` | boolean | `true`, `false` | Strikethrough text |
| `monospacedDigit` | boolean | `true`, `false` | Monospaced digits |

### Layout Properties
| Property | Type | Options | Description |
|----------|------|---------|-------------|
| `alignment` | string | `"leading"`, `"center"`, `"trailing"`, `"left"`, `"right"` | Text alignment |
| `lineLimit` | number | Any positive number | Maximum number of lines |

### Content Property
| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Text content (supports template variables like `{{variable}}`) |

## 💡 Best Practices

1. **Hierarchy**: Use different font sizes and weights to create clear visual hierarchy
2. **Contrast**: Ensure sufficient color contrast for readability
3. **Line Limits**: Set appropriate line limits to prevent text overflow
4. **Template Variables**: Use descriptive variable names like `{{userName}}` instead of `{{data1}}`
5. **Color Consistency**: Use consistent colors that match your app's design system

## 🔗 Navigation

- [← Back to Documentation Index](./README.md)
- [Image Examples →](./image-examples.md)

---

💡 **Next**: Learn how to add images and SF Symbols to your Live Activities in the [Image Examples](./image-examples.md) section.