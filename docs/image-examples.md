# Image Examples

Images enhance Live Activities with visual elements, supporting SF Symbols, custom images, and various styling options like sizing, colors, and corner radius.

## 🎯 What You'll Learn

- SF Symbols integration
- Image sizing and scaling
- Color customization for icons
- Corner radius for rounded images
- Different image sources (system, URL, assets)
- Image layout and alignment

## 💎 SF Symbols Example

Basic example showing how to use Apple's SF Symbols with custom colors and sizes.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "horizontal" },
      { spacing: 16 },
      { padding: 16 },
      { backgroundColor: "#ffffff" },
      { cornerRadius: 12 },
      { insideAlignment: "center" }
    ],
    children: [
      {
        type: "image",
        properties: [
          { systeName: "photo.circle.fill" },
          { color: "#34C759" },
          { width: 40 },
          { height: 40 }
        ]
      },
      {
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 4 }
        ],
        children: [
          {
            type: "text",
            properties: [
              { text: "{{title}}" },
              { fontSize: 16 },
              { fontWeight: "semibold" },
              { color: "#1a1a1a" }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{description}}" },
              { fontSize: 13 },
              { color: "#666666" },
              { lineLimit: 1 }
            ]
          }
        ]
      }
    ]
  },
  data: {
    title: "SF Symbols Example",
    description: "System icons with custom colors"
  },
  behavior: {
    systemActionForegroundColor: "#34C759",
    widgetUrl: "https://example.com",
    keyLineTint: "#34C759"
  }
});
```

### Key Features

- **SF Symbol**: Uses `photo.circle.fill` system icon
- **Custom Color**: Green color for the icon
- **Fixed Size**: 40x40 points for consistent sizing
- **Layout**: Horizontal layout with icon and text content

## 🎨 Multiple Icons Example

Showcase multiple SF Symbols with different colors and styles.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 16 },
      { padding: 20 },
      { backgroundColor: "#f8f9fa" },
      { cornerRadius: 16 }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "{{headerText}}" },
          { fontSize: 18 },
          { fontWeight: "bold" },
          { color: "#1a1a1a" },
          { alignment: "center" }
        ]
      },
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 20 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systeName: "heart.fill" },
              { color: "#FF3B30" },
              { width: 32 },
              { height: 32 }
            ]
          },
          {
            type: "image",
            properties: [
              { systeName: "star.fill" },
              { color: "#FF9500" },
              { width: 32 },
              { height: 32 }
            ]
          },
          {
            type: "image",
            properties: [
              { systeName: "checkmark.circle.fill" },
              { color: "#34C759" },
              { width: 32 },
              { height: 32 }
            ]
          }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{statusText}}" },
          { fontSize: 14 },
          { color: "#666666" },
          { alignment: "center" }
        ]
      }
    ]
  },
  data: {
    headerText: "Multiple Icons",
    statusText: "Icons with different colors and sizes"
  },
  behavior: {
    systemActionForegroundColor: "#FF9500",
    widgetUrl: "https://example.com",
    keyLineTint: "#FF9500"
  }
});
```

### Icon Collection Features

- **Heart Icon**: Red filled heart symbol
- **Star Icon**: Orange filled star symbol  
- **Checkmark Icon**: Green filled checkmark in circle
- **Consistent Sizing**: All icons use 32x32 points
- **Color Variety**: Different semantic colors for each icon

## 📏 Image Sizes Example

Demonstrate different image sizes with the same icon.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 16 },
      { backgroundColor: "#ffffff" },
      { cornerRadius: 12 },
      { borderWidth: 1 },
      { borderColor: "#e5e5e5" }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "{{title}}" },
          { fontSize: 16 },
          { fontWeight: "semibold" },
          { color: "#1a1a1a" },
          { alignment: "center" }
        ]
      },
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 16 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systeName: "circle.fill" },
              { color: "#007AFF" },
              { width: 16 },
              { height: 16 }
            ]
          },
          {
            type: "image",
            properties: [
              { systeName: "circle.fill" },
              { color: "#007AFF" },
              { width: 24 },
              { height: 24 }
            ]
          },
          {
            type: "image",
            properties: [
              { systeName: "circle.fill" },
              { color: "#007AFF" },
              { width: 32 },
              { height: 32 }
            ]
          },
          {
            type: "image",
            properties: [
              { systeName: "circle.fill" },
              { color: "#007AFF" },
              { width: 48 },
              { height: 48 }
            ]
          }
        ]
      },
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 16 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "text",
            properties: [
              { text: "16pt" },
              { fontSize: 10 },
              { color: "#666666" },
              { alignment: "center" },
              { width: 16 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "24pt" },
              { fontSize: 10 },
              { color: "#666666" },
              { alignment: "center" },
              { width: 24 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "32pt" },
              { fontSize: 10 },
              { color: "#666666" },
              { alignment: "center" },
              { width: 32 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "48pt" },
              { fontSize: 10 },
              { color: "#666666" },
              { alignment: "center" },
              { width: 48 }
            ]
          }
        ]
      }
    ]
  },
  data: {
    title: "Different Image Sizes"
  },
  behavior: {
    systemActionForegroundColor: "#007AFF",
    widgetUrl: "https://example.com",
    keyLineTint: "#007AFF"
  }
});
```

### Size Options

- **Small (16pt)**: Perfect for inline icons
- **Medium (24pt)**: Good for secondary actions
- **Large (32pt)**: Standard for primary icons
- **Extra Large (48pt)**: Prominent feature icons

## 🔘 Rounded Images Example

User profile layout with rounded avatar and status indicators.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "horizontal" },
      { spacing: 20 },
      { padding: 20 },
      { backgroundColor: "#2c3e50" },
      { cornerRadius: 16 }
    ],
    children: [
      {
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 8 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systeName: "person.crop.circle.fill" },
              { color: "#3498db" },
              { width: 50 },
              { height: 50 },
              { cornerRadius: 25 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{userName}}" },
              { fontSize: 12 },
              { color: "#ffffff" },
              { alignment: "center" }
            ]
          }
        ]
      },
      {
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 4 }
        ],
        children: [
          {
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 8 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                type: "image",
                properties: [
                  { systeName: "circle.fill" },
                  { color: "#2ecc71" },
                  { width: 8 },
                  { height: 8 }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{status}}" },
                  { fontSize: 14 },
                  { color: "#2ecc71" },
                  { fontWeight: "medium" }
                ]
              }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{description}}" },
              { fontSize: 12 },
              { color: "#ecf0f1" },
              { lineLimit: 2 }
            ]
          }
        ]
      }
    ]
  },
  data: {
    userName: "John Doe",
    status: "Online",
    description: "User profile with rounded avatar and status indicator"
  },
  behavior: {
    systemActionForegroundColor: "#3498db",
    widgetUrl: "https://example.com",
    keyLineTint: "#3498db"
  }
});
```

### Rounded Image Features

- **Circular Avatar**: 50pt diameter with 25pt corner radius
- **Status Indicator**: Small colored dot showing online status
- **Dark Theme**: Dark background with light text
- **Profile Layout**: Avatar with user information

## 🔄 Updating Images

Update image properties and colors dynamically:

```typescript
await LiveActivities.updateActivity({
  activityId: "your-activity-id",
  data: {
    title: "Updated Image Example",
    description: "Images have been updated with new content",
    headerText: "Updated Multiple Icons",
    statusText: "Icons updated with new styling",
    userName: "Jane Smith",
    status: "Busy"
  },
  alertConfiguration: {
    title: "Images Updated",
    body: "Live Activity images have been updated"
  }
});
```

## 📋 Image Properties Reference

### SF Symbols Properties
| Property | Type | Description |
|----------|------|-------------|
| `systeName` | string | SF Symbol name (e.g., "heart.fill", "star", "person.circle") |
| `color` | ColorString | Icon color (hex, color names, or system colors) |
| `width` | number | Image width in points |
| `height` | number | Image height in points |

### Styling Properties
| Property | Type | Description |
|----------|------|-------------|
| `cornerRadius` | number | Rounded corners radius in points |
| `contentMode` | string | `"fit"` or `"fill"` - how image scales |
| `resizable` | boolean | Whether image can be resized |

### Alternative Image Sources
| Property | Type | Description |
|----------|------|-------------|
| `url` | string | HTTP/HTTPS URL for remote images |
| `asset` | string | Bundle asset name |
| `appGroup` | string | App Group shared image name |
| `base64` | string | Base64 encoded image data |

## 🎨 Popular SF Symbols

### Common Icons
- `heart.fill` - Filled heart
- `star.fill` - Filled star  
- `checkmark.circle.fill` - Checkmark in circle
- `person.crop.circle.fill` - Person avatar
- `photo.circle.fill` - Photo icon
- `bell.fill` - Notification bell
- `gear` - Settings gear
- `house.fill` - Home icon

### Status Icons
- `circle.fill` - Solid dot
- `checkmark` - Simple checkmark
- `xmark` - X mark
- `exclamationmark.triangle.fill` - Warning
- `info.circle.fill` - Information

### Activity Icons
- `play.fill` - Play button
- `pause.fill` - Pause button
- `stop.fill` - Stop button
- `forward.fill` - Forward
- `backward.fill` - Backward

## 💡 Best Practices

1. **Consistent Sizing**: Use consistent icon sizes within the same layout section
2. **Color Meaning**: Use colors that convey meaning (red for error, green for success)
3. **Corner Radius**: For avatars, use cornerRadius = width/2 for perfect circles
4. **SF Symbols**: Prefer SF Symbols over custom images for better system integration
5. **Accessibility**: Choose icons that are recognizable and meaningful
6. **Performance**: SF Symbols are optimized and render faster than custom images

## 🔗 Navigation

- [← Text Examples](./text-examples.md)
- [Timer Examples →](./timer-examples.md)

---

💡 **Next**: Learn how to add countdown timers and time displays in the [Timer Examples](./timer-examples.md) section.