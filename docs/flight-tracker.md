# Flight Tracker

A comprehensive flight tracker implementation that showcases how to manage multi-stage journeys, display real-time status updates, and provide critical travel information at a glance.

## 🎯 What You'll Learn

- Building a multi-stage Live Activity for travel
- Combining text, progress, and icons for clear communication
- Designing for all Dynamic Island states in a travel context
- Updating the activity based on flight status (e.g., boarding, in-air, landed)
- Best practices for creating informative and reliable travel activities

## ✈️ Complete Flight Tracker

This example provides a complete layout for tracking a flight, from gate information to in-flight progress and arrival.

### Main Layout Implementation

```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" },
      { spacing: 16 },
      { padding: 16 },
      { backgroundColor: "#0A2C4F" },
      { cornerRadius: 16 }
    ],
    children: [
      // Header: Flight Route & Number
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { insideAlignment: "center" }
        ],
        children: [
          {
            type: "text",
            properties: [
              { text: "{{fromCode}}" },
              { fontSize: 18 },
              { fontWeight: "bold" },
              { color: "#FFFFFF" }
            ]
          },
          {
            type: "image",
            properties: [
              { systemName: "airplane" },
              { color: "#FFFFFF" },
              { width: 24 },
              { height: 24 },
            ]
          },
          {
            type: "text",
            properties: [
              { text: "{{toCode}}" },
              { fontSize: 18 },
              { fontWeight: "bold" },
              { color: "#FFFFFF" }
            ]
          },
          {
            type: "spacer",
            properties: []
          },
          {
            type: "text",
            properties: [
              { text: "{{flightNumber}}" },
              { fontSize: 14 },
              { fontWeight: "medium" },
              { color: "#A9B9CC" }
            ]
          }
        ]
      },
      // Middle: Status & Gate/Seat Info
      {
        type: "container",
        properties: [
          { direction: "horizontal" },
          { insideAlignment: "bottom" }
        ],
        children: [
          {
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 4 },
              { insideAlignment: "leading" }
            ],
            children: [
              {
                type: "text",
                properties: [
                  { text: "STATUS" },
                  { fontSize: 10 },
                  { fontWeight: "bold" },
                  { color: "#A9B9CC" }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{status}}" },
                  { fontSize: 16 },
                  { fontWeight: "semibold" },
                  { color: "#FFFFFF" }
                ]
              }
            ]
          },
          {
            type: "spacer",
            properties: []
          },
          {
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 4 },
              { insideAlignment: "trailing" }
            ],
            children: [
              {
                type: "text",
                properties: [
                  { text: "GATE" },
                  { fontSize: 10 },
                  { fontWeight: "bold" },
                  { color: "#A9B9CC" }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{gate}}" },
                  { fontSize: 16 },
                  { fontWeight: "semibold" },
                  { color: "#FFFFFF" }
                ]
              }
            ]
          },
          {
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 4 },
              { insideAlignment: "trailing" },
            ],
            children: [
              {
                type: "text",
                properties: [
                  { text: "SEAT" },
                  { fontSize: 10 },
                  { fontWeight: "bold" },
                  { color: "#A9B9CC" }
                ]
              },
              {
                type: "text",
                properties: [
                  { text: "{{seat}}" },
                  { fontSize: 16 },
                  { fontWeight: "semibold" },
                  { color: "#FFFFFF" }
                ]
              }
            ]
          }
        ]
      },
      // Footer: Progress Bar
      {
        type: "progress",
        properties: [
          { value: "{{progress}}" },
          { total: 1.0 },
          { color: "#34C759" },
          { backgroundColor: "#FFFFFF30" },
          { height: 6 }
        ]
      }
    ]
  },
  // Data and behavior configuration...
});
```

### Dynamic Island Integration

The flight tracker provides a rich Dynamic Island experience, prioritizing the most critical information for each state.

#### Expanded State
```typescript
dynamicIslandLayout: {
  expanded: {
    leading: {
      type: "text",
      properties: [
        { text: "{{fromCode}}" },
        { fontSize: 14 },
        { fontWeight: "bold" },
        { color: "#FFFFFF" }
      ]
    },
    trailing: {
      type: "text",
      properties: [
        { text: "{{toCode}}" },
        { fontSize: 14 },
        { fontWeight: "bold" },
        { color: "#FFFFFF" }
      ]
    },
    center: {
      type: "container",
      properties: [{ direction: "vertical" }, { spacing: 2 }, { insideAlignment: "center" }],
      children: [
        {
          type: "text",
          properties: [
            { text: "{{status}}" },
            { fontSize: 11 },
            { fontWeight: "medium" },
            { color: "#A9B9CC" }
          ]
        },
        {
          type: "image",
          properties: [
            { systemName: "airplane" },
            { color: "#FFFFFF" },
            { width: 16 },
            { height: 16 }
          ]
        }
      ]
    },
    bottom: {
      type: "progress",
      properties: [
        { value: "{{progress}}" },
        { total: 1.0 },
        { color: "#34C759" },
        { backgroundColor: "#FFFFFF30" },
        { height: 4 }
      ]
    }
  },
  // Compact and minimal states...
}
```

#### Compact States
```typescript
compactLeading: {
    type: "image",
    properties: [
      { systemName: "airplane" },
      { color: "#FFFFFF" },
      { width: 16 },
      { height: 16 }
    ]
},
compactTrailing: {
    type: "text",
    properties: [
      { text: "Gate {{gate}}" },
      { fontSize: 12 },
      { fontWeight: "semibold" },
      { color: "#FFFFFF" }
    ]
},
minimal: {
    type: "image",
    properties: [
      { systemName: "airplane" },
      { color: "#FFFFFF" },
      { width: 16 },
      { height: 16 }
    ]
}
```

### Sample Data

```typescript
data: {
  fromCode: "SFO",
  toCode: "JFK",
  flightNumber: "UA456",
  status: "Boarding",
  gate: "A12",
  seat: "18C",
  progress: "0.1"
}
```

## 🔄 Real-time Flight Updates

Update the activity as the flight progresses through its journey.

```typescript
// Flight is now in the air
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    status: "In-Air",
    progress: 0.5, // Update progress to 50%
    // other data remains the same
  },
  alertConfiguration: {
    title: "Flight Update",
    body: "Your flight to JFK is now in the air."
  }
});

// Approaching destination
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    status: "Landing Soon",
    progress: 0.9
  }
});

// Flight has landed
await LiveActivities.endActivity({
  activityId: result.activityId,
  data: {
    status: "Landed",
    progress: 1.0
  },
  alertConfiguration: {
    title: "Welcome to New York!",
    body: "Your flight has landed at JFK."
  }
});
```

## 🔑 Key Features

### Flight Path Visual
- **Airport Codes**: Clear, bold codes for departure and arrival.
- **Airplane Icon**: A universally understood symbol for flight.
- **Progress Bar**: Visually represents the flight's duration, providing an at-a-glance sense of completion.

### Critical Information
- **Status**: The most important, up-to-date information (e.g., "Boarding", "Delayed", "In-Air").
- **Gate & Seat**: Essential data for the passenger, easily accessible on the lock screen.

### Dynamic Island Efficiency
- **Expanded**: Shows the full journey overview with a progress bar.
- **Compact**: Focuses on the most immediate information needed: the gate number.
- **Minimal**: A simple airplane icon maintains awareness without being intrusive.

## 🎨 Design Choices

### Color Scheme
- **Background**: A deep, professional blue (`#0A2C4F`) evokes the sky and is easy on the eyes.
- **Text**: White text provides high contrast for readability.
- **Accent**: A lighter blue-gray (`#A9B9CC`) is used for secondary labels to create hierarchy.
- **Progress**: A bright, positive green (`#34C759`) indicates successful progress.

### Typography
- **Airport Codes**: Large and bold to be the most prominent information.
- **Status**: Also large and bold to draw immediate attention.
- **Labels**: Uppercase, smaller, and a muted color to clearly define the data they describe without competing for attention.

## 💡 Best Practices for Travel Apps

1. **Handle Delays**: Update the status text and color to clearly indicate delays (e.g., a yellow or orange color for the status text).
2. **Timeliness is Key**: Push updates promptly for gate changes, delays, and boarding calls.
3. **Clarity Over Clutter**: Prioritize the most critical information. A passenger at the airport cares most about the gate and boarding time.
4. **End Gracefully**: When the flight lands, end the activity with a final, helpful summary (e.g., "Landed at Gate B2, baggage at Carousel 5").

## 🔗 Navigation

- [← Food Order Tracking](./food-order-tracking.md)
- [Chart Examples →](./chart-examples.md)

---

💡 **Next**: Explore how to visualize data with [Chart Examples](./chart-examples.md).
