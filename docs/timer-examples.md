# Timer Examples

Timer elements display time-based information with automatic updates, supporting countdown timers, relative time displays, and various formatting styles.

## 🎯 What You'll Learn

- Timer element configuration
- Different timer styles (timer, relative, date, time)
- Countdown functionality
- Time formatting options
- Monospaced digits for consistent display
- Real-time automatic updates

## ⏰ Countdown Timer Example

Basic countdown timer with bold styling and red background.

### Code Implementation

```typescript
const endTime = Date.now() + (15 * 60 * 1000); // 15 minutes from now

const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 8 },
      { padding: 16 },
      { backgroundColor: "#FF3B30" },
      { cornerRadius: 12 }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "{{title}}" },
          { fontSize: 14 },
          { fontWeight: "medium" },
          { color: "#ffffff" },
          { alignment: "center" }
        ]
      },
      {
        type: "timer",
        properties: [
          { endTime: endTime },
          { style: "timer" },
          { fontSize: 24 },
          { fontWeight: "bold" },
          { color: "#ffffff" },
          { alignment: "center" },
          { monospacedDigit: true }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{description}}" },
          { fontSize: 12 },
          { color: "#ffffff" },
          { alignment: "center" },
          { opacity: 0.8 }
        ]
      }
    ]
  },
  data: {
    title: "Countdown Timer",
    description: "15 minutes remaining"
  },
  behavior: {
    systemActionForegroundColor: "#FF3B30",
    widgetUrl: "https://example.com",
    keyLineTint: "#FF3B30"
  }
});
```

### Key Features

- **Bold Timer Display**: Large, bold timer with monospaced digits
- **Red Theme**: Urgent countdown styling with red background
- **Clear Layout**: Title, timer, and description in vertical stack
- **Auto Updates**: Timer automatically counts down in real-time

## 🕐 Relative Time Example

Shows time remaining in relative format (e.g., "2 hours", "30 minutes").

### Code Implementation

```typescript
const endTime = Date.now() + (2 * 60 * 60 * 1000); // 2 hours from now

const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "horizontal" },
      { spacing: 16 },
      { padding: 16 },
      { backgroundColor: "#34C759" },
      { cornerRadius: 12 },
      { insideAlignment: "center" }
    ],
    children: [
      {
        type: "image",
        properties: [
          { systemName: "clock.fill" },
          { color: "#ffffff" },
          { width: 32 },
          { height: 32 }
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
            type: "timer",
            properties: [
              { endTime: endTime },
              { style: "relative" },
              { fontSize: 18 },
              { fontWeight: "semibold" },
              { color: "#ffffff" },
              { alignment: "leading" }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{label}}" },
              { fontSize: 12 },
              { color: "#ffffff" },
              { alignment: "leading" },
              { opacity: 0.9 }
            ]
          }
        ]
      }
    ]
  },
  data: {
    label: "Time until completion"
  },
  behavior: {
    systemActionForegroundColor: "#34C759",
    widgetUrl: "https://example.com",
    keyLineTint: "#34C759"
  }
});
```

### Relative Time Features

- **Human-Readable**: Shows "2 hours" instead of "02:00:00"
- **Icon Integration**: Clock icon for visual context
- **Green Theme**: Positive, completion-focused styling
- **Flexible Layout**: Icon and text content side by side

## 🏃‍♂️ Workout Timer Example

Complex workout timer with multiple metrics and dark theme.

### Code Implementation

```typescript
const endTime = Date.now() + (45 * 60 * 1000); // 45 minutes from now

const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 20 },
      { backgroundColor: "#1D1D1F" },
      { cornerRadius: 16 }
    ],
    children: [
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 12 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systemName: "figure.run.circle.fill" },
              { color: "#FF6B35" },
              { width: 40 },
              { height: 40 }
            ]
          },
          {
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 2 }
            ],
            children: [
              {
                type: "text",
                properties: [
                  { text: "{{workoutName}}" },
                  { fontSize: 16 },
                  { fontWeight: "semibold" },
                  { color: "#ffffff" },
                  { alignment: "leading" }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{workoutType}}" },
                  { fontSize: 12 },
                  { color: "#8E8E93" },
                  { alignment: "leading" }
                ]
              }
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
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 4 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                type: "timer",
                properties: [
                  { endTime: endTime },
                  { style: "timer" },
                  { fontSize: 28 },
                  { fontWeight: "bold" },
                  { color: "#FF6B35" },
                  { alignment: "center" },
                  { monospacedDigit: true }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "TIME LEFT" },
                  { fontSize: 10 },
                  { fontWeight: "medium" },
                  { color: "#8E8E93" },
                  { alignment: "center" }
                ]
              }
            ]
          },
          {
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 8 }
            ],
            children: [
              {
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 2 },
                  { insideAlignment: "center" }
                ],
                children: [
                  {
                    type: "text",
                    properties: [
                      { text: "{{calories}}" },
                      { fontSize: 16 },
                      { fontWeight: "bold" },
                      { color: "#ffffff" },
                      { alignment: "center" }
                    ]
                  },
                  {
                    type: "text",
                    properties: [
                      { text: "CAL" },
                      { fontSize: 9 },
                      { color: "#8E8E93" },
                      { alignment: "center" }
                    ]
                  }
                ]
              },
              {
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 2 },
                  { insideAlignment: "center" }
                ],
                children: [
                  {
                    type: "text",
                    properties: [
                      { text: "{{heartRate}}" },
                      { fontSize: 16 },
                      { fontWeight: "bold" },
                      { color: "#ffffff" },
                      { alignment: "center" }
                    ]
                  },
                  {
                    type: "text",
                    properties: [
                      { text: "BPM" },
                      { fontSize: 9 },
                      { color: "#8E8E93" },
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
    workoutName: "Morning Run",
    workoutType: "Outdoor Running",
    calories: "245",
    heartRate: "142"
  },
  behavior: {
    systemActionForegroundColor: "#FF6B35",
    widgetUrl: "https://example.com",
    keyLineTint: "#FF6B35"
  }
});
```

### Workout Timer Features

- **Large Timer Display**: Prominent 28pt countdown timer
- **Workout Metrics**: Calories and heart rate display
- **Dark Theme**: Professional fitness app styling
- **Multiple Sections**: Header, timer, and stats organization
- **Orange Accent**: Energetic orange color for timer and icon

## 📹 Meeting Timer Example

Meeting timer with live indicator and participant count.

### Code Implementation

```typescript
const endTime = Date.now() + (30 * 60 * 1000); // 30 minutes from now

const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 10 },
      { padding: 16 },
      { backgroundColor: "#5856D6" },
      { cornerRadius: 12 }
    ],
    children: [
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 10 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systemName: "video.fill" },
              { color: "#ffffff" },
              { width: 20 },
              { height: 20 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{meetingTitle}}" },
              { fontSize: 16 },
              { fontWeight: "semibold" },
              { color: "#ffffff" },
              { alignment: "leading" }
            ]
          }
        ]
      },
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 12 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "image",
            properties: [
              { systemName: "clock" },
              { color: "#ffffff" },
              { width: 16 },
              { height: 16 }
            ]
          },
          {
            type: "timer",
            properties: [
              { endTime: endTime },
              { style: "timer" },
              { fontSize: 18 },
              { fontWeight: "medium" },
              { color: "#ffffff" },
              { alignment: "leading" },
              { monospacedDigit: true }
            ]
          },
          {
            type: "image",
            properties: [
              { systemName: "circle.fill" },
              { color: "#30D158" },
              { width: 8 },
              { height: 8 }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "LIVE" },
              { fontSize: 10 },
              { fontWeight: "bold" },
              { color: "#30D158" }
            ]
          }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{participants}}" },
          { fontSize: 12 },
          { color: "#ffffff" },
          { alignment: "center" },
          { opacity: 0.9 }
        ]
      }
    ]
  },
  data: {
    meetingTitle: "Team Standup",
    participants: "5 participants"
  },
  behavior: {
    systemActionForegroundColor: "#5856D6",
    widgetUrl: "https://example.com",
    keyLineTint: "#5856D6"
  }
});
```

### Meeting Timer Features

- **Video Call Theme**: Purple background with video icon
- **Live Indicator**: Green dot and "LIVE" text
- **Meeting Info**: Title and participant count
- **Compact Layout**: Efficient use of space for essential info

## 🔄 Updating Timer Data

Update timer-related data while keeping the countdown active:

```typescript
await LiveActivities.updateActivity({
  activityId: "your-activity-id",
  data: {
    title: "Updated Timer",
    description: "Timer has been updated",
    label: "Updated time remaining",
    workoutName: "Updated Workout",
    workoutType: "Updated Activity",
    calories: "365",
    heartRate: "158",
    meetingTitle: "Updated Meeting",
    participants: "8 participants"
  },
  alertConfiguration: {
    title: "Timer Updated",
    body: "Live Activity timer has been updated"
  }
});
```

## 📋 Timer Properties Reference

### Required Properties
| Property | Type | Description |
|----------|------|-------------|
| `endTime` | number | Timestamp in milliseconds for countdown end |
| `style` | string | Timer display style |

### Timer Styles
| Style | Description | Example Output |
|-------|-------------|----------------|
| `"timer"` | MM:SS or HH:MM:SS format | `15:30` or `1:15:30` |
| `"relative"` | Human-readable relative time | `"15 minutes"`, `"2 hours"` |
| `"date"` | Date format | `"Dec 25, 2023"` |
| `"time"` | Time format | `"2:30 PM"` |
| `"offset"` | Time offset from now | `"+15 min"` |
| `"countdown"` | Countdown format | `"15m 30s"` |

### Styling Properties
| Property | Type | Description |
|----------|------|-------------|
| `fontSize` | number | Timer text size in points |
| `fontWeight` | string | Font weight (bold, medium, regular, etc.) |
| `color` | ColorString | Timer text color |
| `alignment` | string | Text alignment (center, leading, trailing) |
| `monospacedDigit` | boolean | Use monospaced digits for consistent width |

### Inherited Text Properties
Timer elements inherit all text properties:
- `italic`, `underline`, `strikethrough`
- `lineLimit` for multi-line timers
- `opacity` for transparency effects

## ⏰ Common Timer Durations

### Quick Setup Examples

```typescript
// 5 minutes
const fiveMinutes = Date.now() + (5 * 60 * 1000);

// 30 minutes
const thirtyMinutes = Date.now() + (30 * 60 * 1000);

// 1 hour
const oneHour = Date.now() + (60 * 60 * 1000);

// 2 hours
const twoHours = Date.now() + (2 * 60 * 60 * 1000);

// End of day (11:59 PM)
const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);
const endOfDayTimestamp = endOfDay.getTime();

// Specific time tomorrow
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(9, 0, 0, 0); // 9:00 AM tomorrow
const tomorrowTimestamp = tomorrow.getTime();
```

## 💡 Best Practices

1. **Monospaced Digits**: Always use `monospacedDigit: true` for countdown timers to prevent layout shifts
2. **Clear Contrast**: Ensure timer text has sufficient contrast against background
3. **Appropriate Styles**: Use "timer" for countdowns, "relative" for time remaining
4. **Context Icons**: Add clock or timer icons for visual context
5. **Font Size**: Use larger fonts (18pt+) for prominent timers
6. **Theme Consistency**: Match timer colors with overall Live Activity theme
7. **Realistic Durations**: Don't set extremely long countdowns for Live Activities

## 🔗 Navigation

- [← Image Examples](./image-examples.md)
- [Progress Examples →](./progress-examples.md)

---

💡 **Next**: Learn how to add progress bars and completion tracking in the [Progress Examples](./progress-examples.md) section.