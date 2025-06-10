# Food Order Tracking

A comprehensive food delivery tracking system demonstrating advanced Live Activities with multi-stage progress, timer integration, and complete Dynamic Island support.

## 🎯 What You'll Learn

- Multi-stage progress tracking system
- Complex nested layout structures
- Timer integration for delivery estimates
- Status badge implementation
- Food delivery app UI patterns
- Dynamic Island optimization

## 🍕 Complete Food Order Tracker

This example shows a full-featured food delivery tracking system with 4-stage progress, real-time updates, and professional delivery app styling.

### Main Layout Implementation

```typescript
const estimatedDelivery = Date.now() + (35 * 60 * 1000); // 35 minutes from now

const result = await LiveActivities.startActivity({
  layout: {
    id: "food-order-tracking",
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
        id: "order-header",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 12 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "restaurant-icon",
            type: "image",
            properties: [
              { systeName: "fork.knife.circle.fill" },
              { color: "#FF6B35" },
              { width: 32 },
              { height: 32 }
            ]
          },
          {
            id: "order-info",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 2 }
            ],
            children: [
              {
                id: "restaurant-name",
                type: "text",
                properties: [
                  { text: "{{restaurantName}}" },
                  { fontSize: 16 },
                  { fontWeight: "semibold" },
                  { color: "#1a1a1a" }
                ]
              },
              {
                id: "order-number",
                type: "text",
                properties: [
                  { text: "Order #{{orderNumber}}" },
                  { fontSize: 12 },
                  { color: "#666666" }
                ]
              }
            ]
          },
          {
            id: "status-badge",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 4 },
              { padding: 6 },
              { backgroundColor: "{{statusColor}}" },
              { cornerRadius: 12 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "status-icon",
                type: "image",
                properties: [
                  { systeName: "{{statusIcon}}" },
                  { color: "#ffffff" },
                  { width: 12 },
                  { height: 12 }
                ]
              },
              {
                id: "status-text",
                type: "text",
                properties: [
                  { text: "{{statusText}}" },
                  { fontSize: 10 },
                  { fontWeight: "medium" },
                  { color: "#ffffff" }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "progress-section",
        type: "container",
        properties: [
          { direction: "vertical" },
          { spacing: 8 }
        ],
        children: [
          {
            id: "progress-bar-container",
            type: "container",
            properties: [
              { direction: "vertical" },
              { spacing: 4 }
            ],
            children: [
              {
                id: "progress-label",
                type: "text",
                properties: [
                  { text: "{{progressLabel}}" },
                  { fontSize: 12 },
                  { fontWeight: "medium" },
                  { color: "#666666" }
                ]
              },
              {
                id: "progress-bar",
                type: "progress",
                properties: [
                  { value: "{{progressValue}}" },
                  { total: 1.0 },
                  { color: "#FF6B35" },
                  { backgroundColor: "#F0F0F0" },
                  { height: 6 }
                ]
              }
            ]
          },
          {
            id: "stages-container",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 8 }
            ],
            children: [
              {
                id: "stage-1",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 4 },
                  { insideAlignment: "center" }
                ],
                children: [
                  {
                    id: "stage-1-icon",
                    type: "image",
                    properties: [
                      { systeName: "checkmark.circle.fill" },
                      { color: "#34C759" },
                      { width: 16 },
                      { height: 16 }
                    ]
                  },
                  {
                    id: "stage-1-label",
                    type: "text",
                    properties: [
                      { text: "Order Placed" },
                      { fontSize: 9 },
                      { color: "#34C759" },
                      { alignment: "center" }
                    ]
                  }
                ]
              },
              {
                id: "stage-2",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 4 },
                  { insideAlignment: "center" }
                ],
                children: [
                  {
                    id: "stage-2-icon",
                    type: "image",
                    properties: [
                      { systeName: "{{stage2Icon}}" },
                      { color: "{{stage2Color}}" },
                      { width: 16 },
                      { height: 16 }
                    ]
                  },
                  {
                    id: "stage-2-label",
                    type: "text",
                    properties: [
                      { text: "Preparing" },
                      { fontSize: 9 },
                      { color: "{{stage2Color}}" },
                      { alignment: "center" }
                    ]
                  }
                ]
              },
              {
                id: "stage-3",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 4 },
                  { insideAlignment: "center" }
                ],
                children: [
                  {
                    id: "stage-3-icon",
                    type: "image",
                    properties: [
                      { systeName: "{{stage3Icon}}" },
                      { color: "{{stage3Color}}" },
                      { width: 16 },
                      { height: 16 }
                    ]
                  },
                  {
                    id: "stage-3-label",
                    type: "text",
                    properties: [
                      { text: "Out for Delivery" },
                      { fontSize: 9 },
                      { color: "{{stage3Color}}" },
                      { alignment: "center" }
                    ]
                  }
                ]
              },
              {
                id: "stage-4",
                type: "container",
                properties: [
                  { direction: "vertical" },
                  { spacing: 4 },
                  { insideAlignment: "center" }
                ],
                children: [
                  {
                    id: "stage-4-icon",
                    type: "image",
                    properties: [
                      { systeName: "{{stage4Icon}}" },
                      { color: "{{stage4Color}}" },
                      { width: 16 },
                      { height: 16 }
                    ]
                  },
                  {
                    id: "stage-4-label",
                    type: "text",
                    properties: [
                      { text: "Delivered" },
                      { fontSize: 9 },
                      { color: "{{stage4Color}}" },
                      { alignment: "center" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "delivery-info",
        type: "container",
        properties: [
          { direction: "horizontal" },
          { spacing: 16 },
          { insideAlignment: "center" }
        ],
        children: [
          {
            id: "time-info",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 6 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "clock-icon",
                type: "image",
                properties: [
                  { systeName: "clock" },
                  { color: "#666666" },
                  { width: 14 },
                  { height: 14 }
                ]
              },
              {
                id: "delivery-time",
                type: "timer",
                properties: [
                  { endTime: estimatedDelivery },
                  { style: "relative" },
                  { fontSize: 12 },
                  { fontWeight: "medium" },
                  { color: "#666666" }
                ]
              }
            ]
          },
          {
            id: "total-info",
            type: "container",
            properties: [
              { direction: "horizontal" },
              { spacing: 6 },
              { insideAlignment: "center" }
            ],
            children: [
              {
                id: "total-label",
                type: "text",
                properties: [
                  { text: "Total:" },
                  { fontSize: 12 },
                  { color: "#666666" }
                ]
              },
              {
                id: "total-value",
                type: "text",
                properties: [
                  { text: "{{totalAmount}}" },
                  { fontSize: 12 },
                  { fontWeight: "semibold" },
                  { color: "#1a1a1a" }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  // Dynamic Island and data configuration...
});
```

### Dynamic Island Implementation

Complete Dynamic Island support for food delivery tracking:

#### Expanded State
```typescript
dynamicIslandLayout: {
  expanded: {
    leading: {
      id: "di-restaurant-info",
      type: "container",
      properties: [
        { direction: "vertical" },
        { spacing: 2 },
        { insideAlignment: "center" }
      ],
      children: [
        {
          id: "di-restaurant-icon",
          type: "image",
          properties: [
            { systeName: "fork.knife.circle.fill" },
            { color: "#FF6B35" },
            { width: 20 },
            { height: 20 }
          ]
        },
        {
          id: "di-order-number",
          type: "text",
          properties: [
            { text: "#{{orderNumber}}" },
            { fontSize: 10 },
            { color: "#ffffff" },
            { alignment: "center" }
          ]
        }
      ]
    },
    trailing: {
      id: "di-delivery-time",
      type: "container",
      properties: [
        { direction: "vertical" },
        { spacing: 2 },
        { insideAlignment: "center" }
      ],
      children: [
        {
          id: "di-clock-icon",
          type: "image",
          properties: [
            { systeName: "clock" },
            { color: "#ffffff" },
            { width: 16 },
            { height: 16 }
          ]
        },
        {
          id: "di-time-text",
          type: "timer",
          properties: [
            { endTime: estimatedDelivery },
            { style: "relative" },
            { fontSize: 10 },
            { color: "#ffffff" },
            { alignment: "center" }
          ]
        }
      ]
    },
    center: {
      id: "di-status",
      type: "text",
      properties: [
        { text: "{{statusText}}" },
        { fontSize: 12 },
        { fontWeight: "medium" },
        { color: "#ffffff" },
        { alignment: "center" }
      ]
    }
  },
  compactLeading: {
    element: {
      id: "di-compact-restaurant",
      type: "image",
      properties: [
        { systeName: "fork.knife.circle.fill" },
        { color: "#FF6B35" },
        { width: 16 },
        { height: 16 }
      ]
    }
  },
  compactTrailing: {
    element: {
      id: "di-compact-time",
      type: "timer",
      properties: [
        { endTime: estimatedDelivery },
        { style: "relative" },
        { fontSize: 12 },
        { color: "#ffffff" }
      ]
    }
  },
  minimal: {
    element: {
      id: "di-minimal-icon",
      type: "image",
      properties: [
        { systeName: "fork.knife.circle.fill" },
        { color: "#FF6B35" },
        { width: 16 },
        { height: 16 }
      ]
    }
  }
}
```

### Initial Order Data

```typescript
data: {
  restaurantName: "Italian Pizzeria",
  orderNumber: "1247",
  statusText: "PREPARING",
  statusColor: "#FF9500",
  statusIcon: "flame.fill",
  progressLabel: "Your order is being prepared",
  progressValue: 0.3,
  totalAmount: "R$ 42,90",
  // Stage indicators
  stage2Icon: "flame.fill",
  stage2Color: "#FF9500",
  stage3Icon: "circle",
  stage3Color: "#8E8E93",
  stage4Icon: "circle",
  stage4Color: "#8E8E93"
}
```

## 🔄 Multi-Stage Progress Updates

### Stage 1: Order Placed (Initial State)
```typescript
// Order confirmed - already set in initial data
```

### Stage 2: Preparing Food
```typescript
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    statusText: "PREPARING",
    statusColor: "#FF9500",
    statusIcon: "flame.fill",
    progressLabel: "Your order is being prepared with care",
    progressValue: 0.5,
    stage2Icon: "flame.fill",
    stage2Color: "#FF9500",
    stage3Icon: "circle",
    stage3Color: "#8E8E93",
    stage4Icon: "circle",
    stage4Color: "#8E8E93"
  },
  alertConfiguration: {
    title: "Preparing Order",
    body: "Your food is being prepared!"
  }
});
```

### Stage 3: Out for Delivery
```typescript
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    statusText: "OUT FOR DELIVERY",
    statusColor: "#007AFF",
    statusIcon: "bicycle",
    progressLabel: "Your order is out for delivery",
    progressValue: 0.75,
    stage2Icon: "checkmark.circle.fill",
    stage2Color: "#34C759",
    stage3Icon: "bicycle",
    stage3Color: "#007AFF",
    stage4Icon: "circle",
    stage4Color: "#8E8E93"
  },
  alertConfiguration: {
    title: "Out for Delivery",
    body: "Your order is on the way!"
  }
});
```

### Stage 4: Delivered
```typescript
await LiveActivities.updateActivity({
  activityId: result.activityId,
  data: {
    statusText: "DELIVERED",
    statusColor: "#34C759",
    statusIcon: "checkmark.circle.fill",
    progressLabel: "Order delivered successfully!",
    progressValue: 1.0,
    stage2Icon: "checkmark.circle.fill",
    stage2Color: "#34C759",
    stage3Icon: "checkmark.circle.fill",
    stage3Color: "#34C759",
    stage4Icon: "checkmark.circle.fill",
    stage4Color: "#34C759"
  },
  alertConfiguration: {
    title: "Order Delivered!",
    body: "Enjoy your meal! Rate your experience."
  }
});
```

## 🍽️ Key Features

### Restaurant Information
- **Restaurant Name**: Clear restaurant identification
- **Order Number**: Unique order tracking number
- **Restaurant Icon**: Fork and knife symbol with brand color

### Dynamic Status Badge
- **Color-Coded**: Different colors for each stage
  - Orange (`#FF9500`): Preparing
  - Blue (`#007AFF`): Out for delivery
  - Green (`#34C759`): Delivered
- **Status Icons**: Contextual SF Symbols
  - `flame.fill`: Cooking/preparing
  - `bicycle`: Out for delivery
  - `checkmark.circle.fill`: Completed/delivered

### Progress Visualization
- **Progress Bar**: Visual completion indicator (0-100%)
- **Stage Icons**: 4-stage visual progress
- **Color Transitions**: Icons change color as stages complete

### Delivery Information
- **Timer Integration**: Real-time estimated delivery countdown
- **Total Amount**: Order total with currency formatting
- **Progress Labels**: Human-readable status descriptions

### Dynamic Island Optimization
- **Restaurant Branding**: Restaurant icon in leading area
- **Time Display**: Delivery countdown in trailing area
- **Status Center**: Current order status in center
- **Minimal State**: Restaurant icon for quick identification

## 🎨 Design System

### Color Palette
- **Brand Orange** (`#FF6B35`): Restaurant icon, progress bar
- **Status Orange** (`#FF9500`): Preparing status
- **Status Blue** (`#007AFF`): Delivery status
- **Status Green** (`#34C759`): Completed status
- **Inactive Gray** (`#8E8E93`): Pending stages

### Typography
- **Restaurant Name**: 16pt semibold for prominence
- **Order Number**: 12pt regular for reference
- **Status Text**: 10pt medium in badge
- **Progress Label**: 12pt medium for clarity

### Layout Principles
- **Header Section**: Restaurant info and status badge
- **Progress Section**: Progress bar and stage indicators
- **Footer Section**: Time and total information
- **Consistent Spacing**: 8-16pt spacing throughout

## 📱 Real-World Integration

### Push Notifications
Each status update includes alert configuration for push notifications:
- Order confirmation
- Preparation updates
- Delivery dispatch
- Delivery completion

### Timer Updates
The delivery timer automatically updates in real-time showing:
- "35 minutes" when order starts
- "20 minutes" as time progresses
- "5 minutes" near delivery
- Completed when delivered

### Status Persistence
Order status persists across:
- App backgrounding
- Device restarts
- Different views in Dynamic Island

## 🔗 Integration Tips

### Restaurant Apps
Perfect for:
- **Food Delivery**: Pizza, burgers, Chinese food
- **Coffee Orders**: Pickup notifications
- **Grocery Delivery**: Shopping and delivery progress
- **Meal Kits**: Preparation and delivery tracking

### Customization Options
- **Restaurant Branding**: Custom colors and icons
- **Language Localization**: Portuguese, English, Spanish
- **Currency Formatting**: Local currency display
- **Custom Stages**: Adapt for different business models

## 💡 Best Practices

1. **Timer Accuracy**: Use realistic delivery estimates
2. **Status Clarity**: Use clear, understandable status text
3. **Color Consistency**: Maintain consistent color meanings
4. **Progress Updates**: Update frequently during active stages
5. **Final State**: Always end activity when order is complete
6. **Error Handling**: Handle delivery delays gracefully
7. **Accessibility**: Use high contrast colors and clear text

## 🔗 Navigation

- [← Football Scoreboard](./football-scoreboard.md)
- [Back to Documentation Index](./README.md)

---

💡 **Complete**: You've now seen comprehensive examples of Live Activities implementation. Check out all examples in the working [example app](../example-app/) to see them in action!