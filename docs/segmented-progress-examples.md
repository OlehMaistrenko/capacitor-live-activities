# Segmented Progress Examples - Complete Documentation

## Overview

The `segmented-progress` element allows creating progress bars divided into segments, ideal for showing process stages, delivery phases, progress levels, and sequential workflows.

## Basic Concept

Segmented progress divides a progress bar into multiple segments, where each segment can have different states: complete, in progress, or pending.

```json
{
  "id": "delivery-progress",
  "type": "segmented-progress",
  "properties": [
    { "segments": 4 },
    { "filled": 2 },
    { "width": 280 },
    { "height": 8 },
    { "filledColor": "#34C759" },
    { "unfilledColor": "#3A3A3C" },
    { "spacing": 4 },
    { "cornerRadius": 4 },
    { "strokeColor": "#C7C7CC" },
    { "strokeWidth": 1 },
    { "strokeDashed": false }
  ]
}
```

## Detailed Properties

### Required Properties

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `segments` | Number | Total number of segments | `4` |
| `filled` | Number | Number of filled segments | `2` |

### Visual Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | Number | 200 | Total width of the bar |
| `height` | Number | 6 | Height of the segments |
| `filledColor` | String | "#007AFF" | Color of filled segments |
| `unfilledColor` | String | "#E5E5E7" | Color of unfilled segments |
| `spacing` | Number | 4 | Space between segments |
| `cornerRadius` | Number | 3 | Corner radius |

### Border Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `strokeColor` | String | "#C7C7CC" | Border color |
| `strokeWidth` | Number | 1 | Border thickness |
| `strokeDashed` | Boolean | false | Dashed border |

## Segment States

### 1. Complete Segments
Segments before the current one, fully filled.

### 2. Current Segment
Segment in progress, partially filled based on the `progress` property.

### 3. Pending Segments
Future segments, not yet started.

## Practical Examples

### Example 1: Delivery Tracking

```json
{
  "layout": {
    "id": "delivery-tracker",
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 16 },
      { "padding": 20 },
      { "backgroundColor": "#1C1C1E" },
      { "cornerRadius": 16 }
    ],
    "children": [
      {
        "id": "header",
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 12 },
          { "insideAlignment": "center" }
        ],
        "children": [
          {
            "id": "delivery-icon",
            "type": "image",
            "properties": [
              { "systemName": "shippingbox.fill" },
              { "width": 24 },
              { "height": 24 },
              { "color": "#FF9500" }
            ]
          },
          {
            "id": "order-info",
            "type": "container",
            "properties": [
              { "direction": "vertical" },
              { "spacing": 2 }
            ],
            "children": [
              {
                "id": "order-title",
                "type": "text",
                "properties": [
                  { "text": "Order #{{orderNumber}}" },
                  { "fontSize": 16 },
                  { "fontWeight": "semibold" },
                  { "color": "#FFFFFF" }
                ]
              },
              {
                "id": "current-status",
                "type": "text",
                "properties": [
                  { "text": "{{currentStatus}}" },
                  { "fontSize": 14 },
                  { "color": "#8E8E93" }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "progress-section",
        "type": "container",
        "properties": [
          { "direction": "vertical" },
          { "spacing": 12 }
        ],
        "children": [
          {
            "id": "delivery-progress",
            "type": "segmented-progress",
            "properties": [
              { "segments": 4 },
              { "filled": "{{filledSegments}}" },
              { "width": 280 },
              { "height": 8 },
              { "filledColor": "#34C759" },
              { "unfilledColor": "#3A3A3C" },
              { "spacing": 4 },
              { "cornerRadius": 4 },
              { "strokeColor": "#C7C7CC" },
              { "strokeWidth": 1 }
            ]
          },
          {
            "id": "stages",
            "type": "container",
            "properties": [
              { "direction": "horizontal" },
              { "spacing": 8 }
            ],
            "children": [
              {
                "id": "stage-1",
                "type": "text",
                "properties": [
                  { "text": "Confirmed" },
                  { "fontSize": 11 },
                  { "color": "#34C759" }
                ]
              },
              {
                "id": "stage-2",
                "type": "text",
                "properties": [
                  { "text": "Preparing" },
                  { "fontSize": 11 },
                  { "color": "{{stage2Color}}" }
                ]
              },
              {
                "id": "stage-3",
                "type": "text",
                "properties": [
                  { "text": "On the way" },
                  { "fontSize": 11 },
                  { "color": "{{stage3Color}}" }
                ]
              },
              {
                "id": "stage-4",
                "type": "text",
                "properties": [
                  { "text": "Delivered" },
                  { "fontSize": 11 },
                  { "color": "{{stage4Color}}" }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "eta-info",
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 8 },
          { "insideAlignment": "center" }
        ],
        "children": [
          {
            "id": "clock-icon",
            "type": "image",
            "properties": [
              { "systemName": "clock" },
              { "width": 14 },
              { "height": 14 },
              { "color": "#8E8E93" }
            ]
          },
          {
            "id": "eta-text",
            "type": "text",
            "properties": [
              { "text": "{{etaText}}" },
              { "fontSize": 13 },
              { "color": "#8E8E93" }
            ]
          }
        ]
      }
    ]
  },
  "data": {
    "orderNumber": "1247",
    "currentStatus": "Preparing your order",
    "filledSegments": 2,
    "stage2Color": "#FF9500",
    "stage3Color": "#3A3A3C",
    "stage4Color": "#3A3A3C",
    "etaText": "Expected delivery at 15:30"
  }
}
```

### Example 2: Installation Progress

```json
{
  "layout": {
    "id": "installation-progress",
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 12 },
      { "padding": 16 },
      { "backgroundColor": "#000000" },
      { "cornerRadius": 12 }
    ],
    "children": [
      {
        "id": "app-header",
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 12 },
          { "insideAlignment": "center" }
        ],
        "children": [
          {
            "id": "app-icon",
            "type": "image",
            "properties": [
              { "asset": "{{appIcon}}" },
              { "width": 32 },
              { "height": 32 },
              { "cornerRadius": 8 }
            ]
          },
          {
            "id": "app-info",
            "type": "container",
            "properties": [
              { "direction": "vertical" },
              { "spacing": 2 }
            ],
            "children": [
              {
                "id": "app-name",
                "type": "text",
                "properties": [
                  { "text": "{{appName}}" },
                  { "fontSize": 16 },
                  { "fontWeight": "medium" },
                  { "color": "#FFFFFF" }
                ]
              },
              {
                "id": "install-status",
                "type": "text",
                "properties": [
                  { "text": "{{installStatus}}" },
                  { "fontSize": 13 },
                  { "color": "#8E8E93" }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "install-progress",
        "type": "segmented-progress",
        "properties": [
          { "segments": 5 },
          { "filled": "{{currentStep}}" },
          { "width": 260 },
          { "height": 6 },
          { "filledColor": "#34C759" },
          { "unfilledColor": "#2C2C2E" },
          { "spacing": 3 },
          { "cornerRadius": 3 }
        ]
      },
      {
        "id": "steps-info",
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 4 }
        ],
        "children": [
          {
            "id": "step-1",
            "type": "text",
            "properties": [
              { "text": "Download" },
              { "fontSize": 9 },
              { "color": "#34C759" }
            ]
          },
          {
            "id": "step-2",
            "type": "text",
            "properties": [
              { "text": "Verifying" },
              { "fontSize": 9 },
              { "color": "{{step2Color}}" }
            ]
          },
          {
            "id": "step-3",
            "type": "text",
            "properties": [
              { "text": "Installing" },
              { "fontSize": 9 },
              { "color": "{{step3Color}}" }
            ]
          },
          {
            "id": "step-4",
            "type": "text",
            "properties": [
              { "text": "Configuring" },
              { "fontSize": 9 },
              { "color": "{{step4Color}}" }
            ]
          },
          {
            "id": "step-5",
            "type": "text",
            "properties": [
              { "text": "Complete" },
              { "fontSize": 9 },
              { "color": "{{step5Color}}" }
            ]
          }
        ]
      }
    ]
  },
  "data": {
    "appName": "Awesome App",
    "appIcon": "app-icon.png",
    "installStatus": "Verifying integrity...",
    "currentStep": 2,
    "step2Color": "#007AFF",
    "step3Color": "#2C2C2E",
    "step4Color": "#2C2C2E",
    "step5Color": "#2C2C2E"
  }
}
```

### Example 3: Game Levels

```json
{
  "layout": {
    "id": "game-progress",
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 14 },
      { "padding": 18 },
      { "backgroundColor": "#1A1A2E" },
      { "cornerRadius": 14 }
    ],
    "children": [
      {
        "id": "player-header",
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 12 },
          { "insideAlignment": "center" }
        ],
        "children": [
          {
            "id": "avatar",
            "type": "image",
            "properties": [
              { "url": "{{avatarUrl}}" },
              { "width": 28 },
              { "height": 28 },
              { "cornerRadius": 14 }
            ]
          },
          {
            "id": "player-info",
            "type": "container",
            "properties": [
              { "direction": "vertical" },
              { "spacing": 2 }
            ],
            "children": [
              {
                "id": "player-name",
                "type": "text",
                "properties": [
                  { "text": "{{playerName}}" },
                  { "fontSize": 16 },
                  { "fontWeight": "bold" },
                  { "color": "#FFFFFF" }
                ]
              },
              {
                "id": "current-level",
                "type": "text",
                "properties": [
                  { "text": "Level {{currentLevel}}" },
                  { "fontSize": 13 },
                  { "color": "#A0A0A0" }
                ]
              }
            ]
          },
          {
            "id": "xp-info",
            "type": "container",
            "properties": [
              { "direction": "vertical" },
              { "spacing": 2 },
              { "insideAlignment": "trailing" }
            ],
            "children": [
              {
                "id": "xp-current",
                "type": "text",
                "properties": [
                  { "text": "{{currentXP}} XP" },
                  { "fontSize": 14 },
                  { "fontWeight": "semibold" },
                  { "color": "#FFDE59" }
                ]
              },
              {
                "id": "xp-next",
                "type": "text",
                "properties": [
                  { "text": "{{nextLevelXP}} to next" },
                  { "fontSize": 11 },
                  { "color": "#A0A0A0" }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "level-progress",
        "type": "segmented-progress",
        "properties": [
          { "segments": 10 },
          { "filled": "{{currentLevelSegment}}" },
          { "width": 280 },
          { "height": 10 },
          { "filledColor": "#FFDE59" },
          { "unfilledColor": "#3C3C3C" },
          { "spacing": 3 },
          { "cornerRadius": 5 }
        ]
      },
      {
        "id": "achievements",
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 8 },
          { "insideAlignment": "center" }
        ],
        "children": [
          {
            "id": "achievement-icon",
            "type": "image",
            "properties": [
              { "systemName": "star.fill" },
              { "width": 14 },
              { "height": 14 },
              { "color": "#FFDE59" }
            ]
          },
          {
            "id": "achievement-text",
            "type": "text",
            "properties": [
              { "text": "{{recentAchievement}}" },
              { "fontSize": 12 },
              { "color": "#A0A0A0" }
            ]
          }
        ]
      }
    ]
  },
  "data": {
    "playerName": "GamerPro",
    "avatarUrl": "https://example.com/avatar.jpg",
    "currentLevel": 23,
    "currentXP": "8,450",
    "nextLevelXP": "1,550",
    "currentLevelSegment": 7,
    "recentAchievement": "Achieved 'Master Explorer'"
  }
}
```

## Common Use Cases

### 1. **E-commerce and Delivery**
- Order status
- Delivery progress
- Payment stages

### 2. **Downloads and Installations**
- Download progress
- Installation stages
- App updates

### 3. **Workflows and Processes**
- Step-by-step approvals
- Onboarding processes
- Production pipelines

### 4. **Gaming and Gamification**
- Level progress
- Step-by-step achievements
- Sequential missions

### 5. **Fitness and Goals**
- Weekly goals
- Training progress
- Step-by-step challenges

## Dynamic States

### TypeScript Implementation

```typescript
interface SegmentedProgressState {
  totalSegments: number;
  currentSegment: number;
  progress: number;
  labels?: string[];
}

function updateProgress(state: SegmentedProgressState, newProgress: number) {
  return {
    layout: {
      id: "dynamic-progress",
      type: "segmented-progress",
      properties: [
        { segments: state.totalSegments },
        { filled: state.currentSegment },
        { width: 280 },
        { height: 8 },
        { filledColor: "#34C759" },
        { unfilledColor: "#3A3A3C" }
      ]
    },
    data: {
      progressPercent: Math.round(newProgress * 100),
      currentStage: state.labels?.[state.currentSegment - 1] || `Stage ${state.currentSegment}`
    }
  };
}

// Usage example
const deliveryState = {
  totalSegments: 4,
  currentSegment: 2,
  progress: 0.6,
  labels: ["Confirmed", "Preparing", "On the way", "Delivered"]
};

const updatedLayout = updateProgress(deliveryState, 0.8);
```

## Animations and Transitions

Segmented progress supports smooth transitions when:

1. **Segment change**: Fill animation
2. **Internal progress**: Smooth bar growth
3. **Color states**: Transitions between colors

### Animation Configuration

```json
{
  "properties": [
    { "animationDuration": 0.5 },
    { "animationType": "easeInOut" }
  ]
}
```

## Accessibility

### Best Practices

- ✅ **Adequate color contrast** for visibility
- ✅ **Descriptive labels** for each stage
- ✅ **Textual information** complementing the visual
- ✅ **Minimum dimensions** for touch (44pt)

### Accessible Implementation

```json
{
  "id": "accessible-progress",
  "type": "container",
  "properties": [
    { "direction": "vertical" },
    { "spacing": 8 }
  ],
  "children": [
    {
      "id": "progress-label",
      "type": "text",
      "properties": [
        { "text": "Progress: {{currentStep}} of {{totalSteps}}" },
        { "fontSize": 14 },
        { "color": "#FFFFFF" }
      ]
    },
    {
      "id": "segmented-bar",
      "type": "segmented-progress",
      "properties": [
        { "segments": "{{totalSteps}}" },
        { "filled": "{{currentStep}}" }
      ]
    }
  ]
}
```

## Performance and Limitations

### Recommendations

- ✅ **Maximum 10 segments** for readability
- ✅ **Proportional dimensions** (width ≥ 20x height)
- ✅ **Moderate updates** (not more than 1/second)
- ❌ Avoid very complex animations

### Technical Limitations

1. **Maximum segments**: 20 (recommended: 10)
2. **Progress**: Values between 0.0 and 1.0
3. **Rendering**: Native SwiftUI
4. **Interactivity**: Tap only to open app

---

For more information about other elements, see:
- [JSON Layout Guide](./json-layout-guide.md) - Main guide
- [Chart Examples](./chart-examples.md) - Chart documentation
- [Universal Properties](./universal-properties.md) - Universal properties