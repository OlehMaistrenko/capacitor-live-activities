# Progress Examples

Progress elements provide visual feedback for ongoing operations, file transfers, system metrics, and completion status with customizable styling and colors.

## 🎯 What You'll Learn

- Progress bar configuration
- Value and total properties
- Custom colors and backgrounds
- Progress bar heights and styling
- Real-time progress updates
- Multiple progress indicators

## 📊 Basic Progress Example

Simple download progress with icon, progress bar, and percentage text.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "basic-progress-example",
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 16 },
      { backgroundColor: "#f0f0f0" },
      { cornerRadius: 12 }
    ],
    children: [
      {
        id: "header",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 8 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "icon",
            type: "image",
            properties: [
              { systeName: "arrow.down.circle.fill" },
              { color: "#007AFF" },
              { width: 24 },
              { height: 24 }
            ]
          },
          {
            id: "title",
            type: "text",
            properties: [
              { text: "{{title}}" },
              { fontSize: 16 },
              { fontWeight: "medium" },
              { color: "#1a1a1a" }
            ]
          }
        ]
      },
      {
        id: "progress-bar",
        type: "progress",
        properties: [
          { value: 0.65 },
          { total: 1.0 },
          { color: "#007AFF" },
          { backgroundColor: "#E5E5EA" },
          { height: 8 }
        ]
      },
      {
        id: "progress-text",
        type: "text",
        properties: [
          { text: "{{progressText}}" },
          { fontSize: 12 },
          { color: "#666666" },
          { alignment: "center" },
          { monospacedDigit: true }
        ]
      }
    ]
  },
  data: {
    title: "Download Progress",
    progressText: "65% Complete"
  },
  behavior: {
    systemActionForegroundColor: "#007AFF",
    widgetUrl: "https://example.com",
    keyLineTint: "#007AFF"
  }
});
```

### Key Features

- **Download Icon**: Clear visual indicator of operation type
- **Blue Progress Bar**: Standard iOS blue color
- **Percentage Display**: Centered text with monospaced digits
- **Light Background**: Clean, professional appearance

## 🖥️ Multiple Progress Bars

System monitor showing CPU and memory usage with different colors.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "multiple-progress-example",
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 16 },
      { padding: 20 },
      { backgroundColor: "#ffffff" },
      { cornerRadius: 16 },
      { borderWidth: 1 },
      { borderColor: "#e5e5e5" }
    ],
    children: [
      {
        id: "title",
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
        id: "cpu-progress",
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 6 }
        ],
        children: [
          {
            id: "cpu-label",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 8 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "cpu-icon",
                type: "image",
                properties: [
                  { systeName: "cpu" },
                  { color: "#FF6B35" },
                  { width: 16 },
                  { height: 16 }
                ]
              },
              {
                id: "cpu-text",
                type: "text",
                properties: [
                  { text: "CPU Usage" },
                  { fontSize: 14 },
                  { fontWeight: "medium" },
                  { color: "#1a1a1a" }
                ]
              },
              {
                id: "cpu-value",
                type: "text",
                properties: [
                  { text: "{{cpuUsage}}" },
                  { fontSize: 14 },
                  { fontWeight: "bold" },
                  { color: "#FF6B35" },
                  { alignment: "trailing" }
                ]
              }
            ]
          },
          {
            id: "cpu-bar",
            type: "progress",
            properties: [
              { value: 0.42 },
              { total: 1.0 },
              { color: "#FF6B35" },
              { backgroundColor: "#F0F0F0" },
              { height: 6 }
            ]
          }
        ]
      },
      {
        id: "memory-progress",
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 6 }
        ],
        children: [
          {
            id: "memory-label",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 8 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "memory-icon",
                type: "image",
                properties: [
                  { systeName: "memorychip" },
                  { color: "#34C759" },
                  { width: 16 },
                  { height: 16 }
                ]
              },
              {
                id: "memory-text",
                type: "text",
                properties: [
                  { text: "Memory" },
                  { fontSize: 14 },
                  { fontWeight: "medium" },
                  { color: "#1a1a1a" }
                ]
              },
              {
                id: "memory-value",
                type: "text",
                properties: [
                  { text: "{{memoryUsage}}" },
                  { fontSize: 14 },
                  { fontWeight: "bold" },
                  { color: "#34C759" },
                  { alignment: "trailing" }
                ]
              }
            ]
          },
          {
            id: "memory-bar",
            type: "progress",
            properties: [
              { value: 0.78 },
              { total: 1.0 },
              { color: "#34C759" },
              { backgroundColor: "#F0F0F0" },
              { height: 6 }
            ]
          }
        ]
      }
    ]
  },
  data: {
    title: "System Monitor",
    cpuUsage: "42%",
    memoryUsage: "78%"
  },
  behavior: {
    systemActionForegroundColor: "#FF6B35",
    widgetUrl: "https://example.com",
    keyLineTint: "#FF6B35"
  }
});
```

### Multiple Progress Features

- **Color Coding**: Orange for CPU, green for memory
- **Icon Labels**: CPU and memory chip icons
- **Thin Bars**: 6pt height for compact display
- **Value Display**: Percentage values aligned to trailing edge

## 📤 Upload Progress Example

File upload progress with dark theme and detailed information.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "upload-progress-example",
    type: "container",
    properties: [
      { direction: "horizontal" },
      { spacing: 16 },
      { padding: 16 },
      { backgroundColor: "#2C3E50" },
      { cornerRadius: 12 },
      { insideAlignment: "center" }
    ],
    children: [
      {
        id: "upload-icon",
        type: "image",
        properties: [
          { systeName: "arrow.up.circle.fill" },
          { color: "#3498DB" },
          { width: 40 },
          { height: 40 }
        ]
      },
      {
        id: "upload-content",
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 8 }
        ],
        children: [
          {
            id: "upload-info",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 8 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "file-name",
                type: "text",
                properties: [
                  { text: "{{fileName}}" },
                  { fontSize: 14 },
                  { fontWeight: "semibold" },
                  { color: "#FFFFFF" }
                ]
              },
              {
                id: "upload-percentage",
                type: "text",
                properties: [
                  { text: "{{uploadPercentage}}" },
                  { fontSize: 12 },
                  { fontWeight: "medium" },
                  { color: "#3498DB" },
                  { alignment: "trailing" }
                ]
              }
            ]
          },
          {
            id: "upload-bar",
            type: "progress",
            properties: [
              { value: 0.85 },
              { total: 1.0 },
              { color: "#3498DB" },
              { backgroundColor: "#34495E" },
              { height: 4 }
            ]
          },
          {
            id: "upload-speed",
            type: "text",
            properties: [
              { text: "{{uploadSpeed}}" },
              { fontSize: 11 },
              { color: "#BDC3C7" },
              { alignment: "leading" }
            ]
          }
        ]
      }
    ]
  },
  data: {
    fileName: "project_files.zip",
    uploadPercentage: "85%",
    uploadSpeed: "2.1 MB/s • 30s remaining"
  },
  behavior: {
    systemActionForegroundColor: "#3498DB",
    widgetUrl: "https://example.com",
    keyLineTint: "#3498DB"
  }
});
```

### Upload Progress Features

- **Dark Theme**: Professional dark background colors
- **File Information**: Filename and upload percentage
- **Speed Display**: Transfer rate and time remaining
- **Thin Progress Bar**: 4pt height for detailed layouts
- **Large Upload Icon**: 40pt icon for prominence

## 🔋 Battery Progress Example

Battery level indicator with charging status and dark theme.

### Code Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    id: "battery-progress-example",
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 18 },
      { backgroundColor: "#1C1C1E" },
      { cornerRadius: 14 }
    ],
    children: [
      {
        id: "battery-header",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 10 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "battery-icon",
            type: "image",
            properties: [
              { systeName: "battery.75" },
              { color: "#30D158" },
              { width: 28 },
              { height: 28 }
            ]
          },
          {
            id: "battery-title",
            type: "text",
            properties: [
              { text: "{{batteryTitle}}" },
              { fontSize: 16 },
              { fontWeight: "semibold" },
              { color: "#FFFFFF" }
            ]
          }
        ]
      },
      {
        id: "battery-level",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 12 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "battery-bar",
            type: "progress",
            properties: [
              { value: 0.75 },
              { total: 1.0 },
              { color: "#30D158" },
              { backgroundColor: "#2C2C2E" },
              { height: 12 }
            ]
          },
          {
            id: "battery-percent",
            type: "text",
            properties: [
              { text: "{{batteryPercent}}" },
              { fontSize: 16 },
              { fontWeight: "bold" },
              { color: "#30D158" },
              { monospacedDigit: true }
            ]
          }
        ]
      },
      {
        id: "charging-info",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 6 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "charging-icon",
            type: "image",
            properties: [
              { systeName: "bolt.fill" },
              { color: "#FFCC02" },
              { width: 12 },
              { height: 12 }
            ]
          },
          {
            id: "charging-text",
            type: "text",
            properties: [
              { text: "{{chargingStatus}}" },
              { fontSize: 12 },
              { color: "#8E8E93" }
            ]
          }
        ]
      }
    ]
  },
  data: {
    batteryTitle: "Battery Status",
    batteryPercent: "75%",
    chargingStatus: "Charging • 1h 20m until full"
  },
  behavior: {
    systemActionForegroundColor: "#30D158",
    widgetUrl: "https://example.com",
    keyLineTint: "#30D158"
  }
});
```

### Battery Progress Features

- **Battery Icon**: SF Symbol matching current level
- **Green Theme**: System green for healthy battery level
- **Thick Progress Bar**: 12pt height for prominence
- **Charging Indicator**: Yellow bolt icon with status text
- **Dark Theme**: iOS-style dark background

## 🔄 Updating Progress Values

Update progress values and related data in real-time:

```typescript
await LiveActivities.updateActivity({
  activityId: "your-activity-id",
  data: {
    title: "Updated Progress",
    progressText: "85% Complete",
    cpuUsage: "38%",
    memoryUsage: "82%",
    fileName: "updated_file.zip",
    uploadPercentage: "95%",
    uploadSpeed: "3.2 MB/s • 15s remaining",
    batteryPercent: "85%",
    chargingStatus: "Charging • 45m until full"
  },
  alertConfiguration: {
    title: "Progress Updated",
    body: "Live Activity progress has been updated"
  }
});
```

## 📋 Progress Properties Reference

### Required Properties
| Property | Type | Description |
|----------|------|-------------|
| `value` | number | Current progress value (0.0 to total) |
| `total` | number | Maximum value (typically 1.0 for percentages) |

### Styling Properties
| Property | Type | Description |
|----------|------|-------------|
| `color` | ColorString | Progress bar fill color |
| `backgroundColor` | ColorString | Progress bar track color |
| `height` | number | Progress bar height in points |

### Value Examples
| Progress | Value | Total | Description |
|----------|-------|-------|-------------|
| 50% | 0.5 | 1.0 | Half complete |
| 75% | 0.75 | 1.0 | Three quarters complete |
| 42 of 100 | 42 | 100 | 42 out of 100 items |
| 3.2 GB of 8 GB | 3.2 | 8.0 | 3.2 GB out of 8 GB |

## 🎨 Progress Bar Heights

### Recommended Heights
| Height (pt) | Use Case | Example |
|-------------|----------|---------|
| 2-4 | Thin progress indicators | File transfers |
| 6-8 | Standard progress bars | Downloads |
| 10-12 | Prominent progress displays | Battery levels |
| 14-16 | Hero progress elements | Main task progress |

## 🌈 Color Schemes

### System Colors
```typescript
// iOS System Colors
{ color: "#007AFF" }  // System Blue
{ color: "#34C759" }  // System Green  
{ color: "#FF3B30" }  // System Red
{ color: "#FF9500" }  // System Orange
{ color: "#5856D6" }  // System Purple
{ color: "#FF2D92" }  // System Pink
{ color: "#64D2FF" }  // System Cyan
```

### Semantic Colors
```typescript
// Progress States
{ color: "#34C759" }  // Success/Complete
{ color: "#FF9500" }  // Warning/In Progress  
{ color: "#FF3B30" }  // Error/Critical
{ color: "#007AFF" }  // Info/Default
{ color: "#8E8E93" }  // Inactive/Disabled
```

## 💡 Best Practices

1. **Value Range**: Keep values between 0 and total for proper display
2. **Color Meaning**: Use consistent colors (green = good, red = warning, blue = info)
3. **Height Selection**: Choose appropriate height for context and importance
4. **Background Contrast**: Ensure sufficient contrast between progress and background colors
5. **Monospaced Text**: Use monospaced digits for percentage displays to prevent layout shifts
6. **Real-time Updates**: Update progress frequently for smooth user experience
7. **Accessibility**: Choose colors that work for color-blind users

## 🔗 Navigation

- [← Timer Examples](./timer-examples.md)
- [Container Examples →](./container-examples.md)

---

💡 **Next**: Learn how to create complex layouts with nested containers in the [Container Examples](./container-examples.md) section.