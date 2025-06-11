# Football Scoreboard

A complete sports scoreboard implementation showcasing advanced Live Activities features including Dynamic Island integration, live indicators, and real-time score updates.

## 🎯 What You'll Learn

- Complete real-world Live Activity implementation
- Dynamic Island integration with all states
- Live status indicators
- Sports scoreboard layout patterns
- Real-time score and time updates
- Professional sports app styling

## ⚽ Complete Football Scoreboard

This example demonstrates a full-featured sports scoreboard with live game updates, team information, and Dynamic Island support.

### Main Layout Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 12 },
      { padding: 16 },
      { backgroundColor: "#1D1D1F" },
      { cornerRadius: 12 }
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
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 4 },
              { padding: 4 },
              { backgroundColor: "#FF3B30" },
              { cornerRadius: 4 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                type: "image",
                properties: [
                  { systeName: "circle.fill" },
                  { color: "#ffffff" },
                  { width: 6 },
                  { height: 6 }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "LIVE" },
                  { fontSize: 10 },
                  { fontWeight: "bold" },
                  { color: "#ffffff" }
                ]
              }
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{matchTime}}" },
              { fontSize: 12 },
              { fontWeight: "medium" },
              { color: "#ffffff" }
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
              { spacing: 8 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                type: "image",
                properties: [
                  { systeName: "sportscourt.fill" },
                  { color: "#007AFF" },
                  { width: 32 },
                  { height: 32 }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{homeTeam}}" },
                  { fontSize: 14 },
                  { fontWeight: "semibold" },
                  { color: "#ffffff" },
                  { alignment: "center" }
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
                type: "text",
                properties: [
                  { text: "{{homeScore}}" },
                  { fontSize: 32 },
                  { fontWeight: "bold" },
                  { color: "#ffffff" },
                  { alignment: "center" },
                  { monospacedDigit: true }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "-" },
                  { fontSize: 24 },
                  { fontWeight: "medium" },
                  { color: "#8E8E93" }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{awayScore}}" },
                  { fontSize: 32 },
                  { fontWeight: "bold" },
                  { color: "#ffffff" },
                  { alignment: "center" },
                  { monospacedDigit: true }
                ]
              }
            ]
          },
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
                  { systeName: "sportscourt.fill" },
                  { color: "#FF3B30" },
                  { width: 32 },
                  { height: 32 }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{awayTeam}}" },
                  { fontSize: 14 },
                  { fontWeight: "semibold" },
                  { color: "#ffffff" },
                  { alignment: "center" }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "text",
        properties: [
          { text: "{{matchStatus}}" },
          { fontSize: 12 },
          { color: "#8E8E93" },
          { alignment: "center" }
        ]
      }
    ]
  },
  // Data and behavior configuration...
});
```

### Dynamic Island Integration

The football scoreboard includes complete Dynamic Island support for all states:

#### Expanded State
```typescript
dynamicIslandLayout: {
  expanded: {
    leading: {
      type: "container",
      properties: [
        { direction: "vertical" },
        { spacing: 4 },
        { insideAlignment: "center" }
      ],
      children: [
        {
          type: "image",
          properties: [
            { systeName: "sportscourt.fill" },
            { color: "#007AFF" },
            { width: 24 },
            { height: 24 }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "{{homeTeam}}" },
            { fontSize: 12 },
            { color: "#ffffff" },
            { alignment: "center" }
          ]
        }
      ]
    },
    trailing: {
      type: "container",
      properties: [
        { direction: "vertical" },
        { spacing: 4 },
        { insideAlignment: "center" }
      ],
      children: [
        {
          type: "image",
          properties: [
            { systeName: "sportscourt.fill" },
            { color: "#FF3B30" },
            { width: 24 },
            { height: 24 }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "{{awayTeam}}" },
            { fontSize: 12 },
            { color: "#ffffff" },
            { alignment: "center" }
          ]
        }
      ]
    },
    center: {
      type: "container",
      properties: [
        { direction: "horizontal" },
        { spacing: 8 },
        { insideAlignment: "center" }
      ],
      children: [
        {
          type: "text",
          properties: [
            { text: "{{homeScore}}" },
            { fontSize: 18 },
            { fontWeight: "bold" },
            { color: "#ffffff" },
            { monospacedDigit: true }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "-" },
            { fontSize: 14 },
            { color: "#8E8E93" }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "{{awayScore}}" },
            { fontSize: 18 },
            { fontWeight: "bold" },
            { color: "#ffffff" },
            { monospacedDigit: true }
          ]
        }
      ]
    },
    bottom: {
      type: "container",
      properties: [
        { direction: "horizontal" },
        { spacing: 6 },
        { insideAlignment: "center" }
      ],
      children: [
        {
          type: "image",
          properties: [
            { systeName: "circle.fill" },
            { color: "#FF3B30" },
            { width: 6 },
            { height: 6 }
          ]
        },
        {
          type: "text",
          properties: [
            { text: "{{matchTime}}" },
            { fontSize: 10 },
            { color: "#ffffff" }
          ]
        }
      ]
    }
  },
  // Compact and minimal states...
}
```

#### Compact States
```typescript
compactLeading: {
  element: {
    type: "text",
    properties: [
      { text: "{{homeScore}}" },
      { fontSize: 14 },
      { fontWeight: "bold" },
      { color: "#ffffff" },
      { monospacedDigit: true }
    ]
  }
},
compactTrailing: {
  element: {
    type: "text",
    properties: [
      { text: "{{awayScore}}" },
      { fontSize: 14 },
      { fontWeight: "bold" },
      { color: "#ffffff" },
      { monospacedDigit: true }
    ]
  }
},
minimal: {
  element: {
    type: "image",
    properties: [
      { systeName: "sportscourt.fill" },
      { color: "#007AFF" },
      { width: 16 },
      { height: 16 }
    ]
  }
}
```

### Sample Data

```typescript
data: {
  homeTeam: "Barcelona",
  awayTeam: "Real Madrid",
  homeScore: "2",
  awayScore: "1",
  matchTime: "67' 2nd Half",
  matchStatus: "Camp Nou • La Liga"
}
```

## 🔄 Real-time Score Updates

Update scores and match information in real-time:

```typescript
// Goal scored - update to 3-1
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid", 
    homeScore: "3",
    awayScore: "1",
    matchTime: "72' 2nd Half",
    matchStatus: "Camp Nou • La Liga"
  },
  alertConfiguration: {
    title: "GOAL!",
    body: "Barcelona scores! 3-1"
  }
});

// Half time
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    matchTime: "45' Half Time",
    matchStatus: "Camp Nou • La Liga • Half Time"
  },
  alertConfiguration: {
    title: "Half Time",
    body: "Barcelona 2-1 Real Madrid"
  }
});

// Full time
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    matchTime: "FT",
    matchStatus: "Camp Nou • La Liga • Full Time"
  },
  alertConfiguration: {
    title: "Full Time",
    body: "Barcelona 3-1 Real Madrid"
  }
});
```

## 🏟️ Key Features

### Live Indicator
- **Red Badge**: Prominent live indicator with white dot
- **Dynamic Status**: Updates with match events
- **Real-time Updates**: Reflects current match state

### Team Information
- **Team Logos**: SF Symbols representing team crests
- **Color Coding**: Blue for home, red for away team
- **Team Names**: Clear, readable team identification

### Score Display
- **Large Numbers**: 32pt font for prominent score display
- **Monospaced Digits**: Consistent width for score updates
- **Center Alignment**: Balanced score presentation

### Match Details
- **Time Display**: Current match time and period
- **Venue Information**: Stadium and competition details
- **Status Updates**: Match events and states

### Dynamic Island States
- **Expanded**: Full team info, scores, and live indicator
- **Compact**: Score-only display on both sides
- **Minimal**: Simple sports icon indicator

## 🎨 Design Choices

### Color Scheme
- **Background**: Dark theme (`#1D1D1F`) for professional sports appearance
- **Text**: White text for high contrast and readability
- **Accents**: Blue and red for team differentiation
- **Live Indicator**: Red for urgent/live status

### Typography
- **Scores**: Large, bold, monospaced for prominence
- **Team Names**: Medium weight for clear identification
- **Status Text**: Smaller, lighter for secondary information

### Layout
- **Vertical Structure**: Clear information hierarchy
- **Horizontal Teams**: Side-by-side team comparison
- **Center Score**: Prominent score positioning
- **Balanced Spacing**: Consistent 8-16pt spacing

## 📱 Dynamic Island Behavior

### iPhone 14 Pro+ Users
- **Always-On Display**: Minimal scoreboard when screen is locked
- **Tap to Expand**: Full scoreboard with team details
- **Live Updates**: Real-time score changes in Dynamic Island

### Standard iPhones
- **Lock Screen**: Full Live Activity on lock screen
- **Notification**: Standard Live Activity presentation

## 💡 Best Practices for Sports Apps

1. **Monospaced Scores**: Always use monospaced digits for scores to prevent layout shifts
2. **Live Indicators**: Use red badges with white dots for live events
3. **Team Colors**: Use consistent colors for team identification
4. **Clear Hierarchy**: Score should be most prominent element
5. **Real-time Updates**: Update frequently during live events
6. **Status Information**: Include venue, competition, and time details
7. **Dynamic Island**: Optimize for all Dynamic Island states

## 🏆 Use Cases

This scoreboard pattern works for:
- **Football/Soccer** matches
- **Basketball** games
- **Tennis** matches
- **Baseball** games
- **Hockey** games
- **Any sport** with scores and time

## 🔗 Navigation

- [← Container Examples](./container-examples.md)
- [Food Order Tracking →](./food-order-tracking.md)

---

💡 **Next**: See another complete real-world example with [Food Order Tracking](./food-order-tracking.md) implementation.