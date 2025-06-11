# Chart Examples - Complete Documentation

## Overview

The `chart` element allows you to create dynamic and interactive data visualizations in Live Activities. It supports three main types: line charts, area charts, and bar charts, all rendered natively in SwiftUI.

## Chart Types

### 1. Line Chart

Ideal for showing trends over time.

```json
{
  "type": "chart",
  "properties": [
    { "type": "line" },
    { "data": [10, 25, 15, 30, 20, 35, 28] },
    { "width": 300 },
    { "height": 60 },
    { "color": "#007AFF" },
    { "strokeWidth": 2 },
    { "showPoints": true },
    { "smooth": false }
  ]
}
```

**Features:**

- Connects data points with lines

- Option for smooth curves or straight lines

- Optional data points

- Ideal for time series

### 2. Area Chart

Combines line with fill, excellent for volumes or comparisons.

```json
{
  "type": "chart",
  "properties": [
    { "type": "area" },
    { "data": "42800,43100,42950,43250,43180,43320,43250" },
    { "width": 300 },
    { "height": 60 },
    { "color": "#34C759" },
    { "fillColor": "#34C75930" },
    { "strokeWidth": 2 },
    { "smooth": true }
  ]
}
```

**Features:**

- Line with filled area

- Customizable fill color

- Transparency support

- Perfect for showing volume/density

### 3. Bar Chart

Ideal for categorical comparisons and discrete values.

```json
{
  "type": "chart",
  "properties": [
    { "type": "bar" },
    { "data": [25, 30, 28, 35, 32, 40, 38] },
    { "width": 300 },
    { "height": 40 },
    { "color": "#FF9500" },
    { "barSpacing": 2 }
  ]
}
```

**Features:**

- Proportional vertical bars

- Customizable spacing

- Auto-scaling based on data

- Ideal for comparisons

## Detailed Properties

### Required Properties

| Property | Type | Description | Values |
|-------------|------|-----------|---------|
| `type` | String | Chart type | `"line"`, `"area"`, `"bar"` |
| `data` | String/Array | Chart data | `[1,2,3]` or `"1,2,3"` |

### Dimension Properties

| Property | Type | Default | Description |
|-------------|------|--------|-----------|
| `width` | Number | 200 | Width in points |
| `height` | Number | 40 | Height in points |

### Visual Properties

| Property | Type | Default | Description |
|-------------|------|--------|-----------|
| `color` | String | "#007AFF" | Main color (hex) |
| `fillColor` | String | - | Fill color (area only) |
| `strokeWidth` | Number | 1 | Line thickness |
| `smooth` | Boolean | false | Smooth curves (line/area) |
| `showPoints` | Boolean | false | Show points (line) |
| `barSpacing` | Number | 1 | Spacing between bars (bar) |

## Data Formatting

### JavaScript Arrays

```typescript
const chartData = [10, 25, 15, 30, 20, 35, 28];
```

### Comma-Separated Strings

```typescript
const chartData = "10,25,15,30,20,35,28";
```

### Dynamic Data

```json
{
  "properties": [
    { "data": "{{dynamicChartData}}" }
  ]
}
```

```typescript
const data = {
  dynamicChartData: [100, 120, 110, 130, 125, 140, 135]
};
```

## Practical Examples

### Example 1: System Monitor

```json
{
  "layout": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 12 },
      { "padding": 16 },
      { "backgroundColor": "#1C1C1E" },
      { "cornerRadius": 12 }
    ],
    "children": [
      {
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 8 }
        ],
        "children": [
          {
            "type": "image",
            "properties": [
              { "systeName": "cpu" },
              { "width": 16 },
              { "height": 16 },
              { "color": "#007AFF" }
            ]
          },
          {
            "type": "text",
            "properties": [
              { "text": "CPU Usage" },
              { "fontSize": 14 },
              { "fontWeight": "medium" },
              { "color": "#FFFFFF" }
            ]
          },
          {
            "type": "text",
            "properties": [
              { "text": "{{cpuPercentage}}%" },
              { "fontSize": 14 },
              { "fontWeight": "bold" },
              { "color": "{{cpuColor}}" }
            ]
          }
        ]
      },
      {
        "type": "chart",
        "properties": [
          { "type": "area" },
          { "data": "{{cpuData}}" },
          { "width": 280 },
          { "height": 45 },
          { "color": "{{cpuColor}}" },
          { "fillColor": "{{cpuFillColor}}" },
          { "strokeWidth": 2 },
          { "smooth": true }
        ]
      }
    ]
  },
  "data": {
    "cpuPercentage": 67,
    "cpuColor": "#FF9500",
    "cpuFillColor": "#FF950030",
    "cpuData": [45, 52, 48, 65, 70, 68, 67]
  }
}
```

### Example 2: Financial Dashboard

```json
{
  "layout": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 16 },
      { "padding": 20 },
      { "backgroundColor": "#000000" },
      { "cornerRadius": 16 }
    ],
    "children": [
      {
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 12 },
          { "insideAlignment": "center" }
        ],
        "children": [
          {
            "type": "text",
            "properties": [
              { "text": "{{symbol}}" },
              { "fontSize": 18 },
              { "fontWeight": "bold" },
              { "color": "#FFFFFF" }
            ]
          },
          {
            "type": "text",
            "properties": [
              { "text": "${{price}}" },
              { "fontSize": 20 },
              { "fontWeight": "semibold" },
              { "color": "#FFFFFF" }
            ]
          },
          {
            "type": "container",
            "properties": [
              { "direction": "horizontal" },
              { "spacing": 4 },
              { "insideAlignment": "center" }
            ],
            "children": [
              {
                "type": "image",
                "properties": [
                  { "systeName": "{{trendIcon}}" },
                  { "width": 12 },
                  { "height": 12 },
                  { "color": "{{trendColor}}" }
                ]
              },
              {
                "type": "text",
                "properties": [
                  { "text": "{{changeText}}" },
                  { "fontSize": 14 },
                  { "color": "{{trendColor}}" }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "chart",
        "properties": [
          { "type": "area" },
          { "data": "{{priceData}}" },
          { "width": 320 },
          { "height": 60 },
          { "color": "{{trendColor}}" },
          { "fillColor": "{{trendFillColor}}" },
          { "strokeWidth": 2 },
          { "smooth": true }
        ]
      },
      {
        "type": "container",
        "properties": [
          { "direction": "vertical" },
          { "spacing": 6 }
        ],
        "children": [
          {
            "type": "text",
            "properties": [
              { "text": "Volume" },
              { "fontSize": 12 },
              { "color": "#8E8E93" }
            ]
          },
          {
            "type": "chart",
            "properties": [
              { "type": "bar" },
              { "data": "{{volumeData}}" },
              { "width": 320 },
              { "height": 25 },
              { "color": "#48484A" },
              { "barSpacing": 1 }
            ]
          }
        ]
      }
    ]
  },
  "data": {
    "symbol": "AAPL",
    "price": "175.43",
    "changeText": "+2.15 (+1.24%)",
    "trendIcon": "triangle.fill",
    "trendColor": "#34C759",
    "trendFillColor": "#34C75930",
    "priceData": [170, 172, 169, 174, 175, 173, 175],
    "volumeData": [25, 30, 28, 35, 32, 40, 38]
  }
}
```

### Example 3: Analytics Dashboard

```json
{
  "layout": {
    "type": "container",
    "properties": [
      { "direction": "vertical" },
      { "spacing": 12 },
      { "padding": 16 },
      { "backgroundColor": "#1C1C1E" },
      { "cornerRadius": 14 }
    ],
    "children": [
      {
        "type": "container",
        "properties": [
          { "direction": "horizontal" },
          { "spacing": 16 }
        ],
        "children": [
          {
            "type": "container",
            "properties": [
              { "direction": "vertical" },
              { "spacing": 4 }
            ],
            "children": [
              {
                "type": "text",
                "properties": [
                  { "text": "Visitors" },
                  { "fontSize": 12 },
                  { "color": "#8E8E93" }
                ]
              },
              {
                "type": "text",
                "properties": [
                  { "text": "{{visitorsCount}}" },
                  { "fontSize": 16 },
                  { "fontWeight": "bold" },
                  { "color": "#FFFFFF" }
                ]
              },
              {
                "type": "chart",
                "properties": [
                  { "type": "line" },
                  { "data": "{{visitorsData}}" },
                  { "width": 80 },
                  { "height": 20 },
                  { "color": "#007AFF" },
                  { "strokeWidth": 1.5 },
                  { "smooth": true }
                ]
              }
            ]
          },
          {
            "type": "container",
            "properties": [
              { "direction": "vertical" },
              { "spacing": 4 }
            ],
            "children": [
              {
                "type": "text",
                "properties": [
                  { "text": "Revenue" },
                  { "fontSize": 12 },
                  { "color": "#8E8E93" }
                ]
              },
              {
                "type": "text",
                "properties": [
                  { "text": "${{revenue}}" },
                  { "fontSize": 16 },
                  { "fontWeight": "bold" },
                  { "color": "#FFFFFF" }
                ]
              },
              {
                "type": "chart",
                "properties": [
                  { "type": "bar" },
                  { "data": "{{revenueData}}" },
                  { "width": 80 },
                  { "height": 20 },
                  { "color": "#34C759" },
                  { "barSpacing": 1 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "data": {
    "visitorsCount": "2.4K",
    "visitorsData": [100, 120, 110, 135, 125, 140, 150],
    "revenue": "1.8K",
    "revenueData": [50, 75, 60, 90, 85, 100, 95]
  }
}
```

## Recommended Dimensions

### For Compact Live Activities

```json
{
  "small": { "width": 150, "height": 30 },
  "medium": { "width": 200, "height": 40 },
  "large": { "width": 280, "height": 50 }
}
```

### For Expanded Live Activities

```json
{
  "standard": { "width": 300, "height": 60 },
  "tall": { "width": 300, "height": 80 },
  "extra": { "width": 350, "height": 100 }
}
```

## Performance and Limitations

### Performance Recommendations

- ✅ **Max 15 data points** for optimal performance
- ✅ **Simple numeric data** (avoid complex objects)
- ✅ **Reasonable dimensions** (max 400x100)
- ❌ Avoid very frequent updates (max every 5s)

### Technical Limitations

1. **Data types**: Only numeric values
2. **Rendering**: Native SwiftUI Path
3. **Interactivity**: Tap to open app only
4. **Animations**: System automatic transitions

## Integration with Real Data

### TypeScript Implementation Example

```typescript
interface ChartData {
  symbol: string;
  prices: number[];
  volumes: number[];
  currentPrice: number;
  change: number;
}

function generateChartLayout(data: ChartData) {
  const isPositive = data.change >= 0;
  
  return {
    layout: {
      type: "container",
      properties: [
        { direction: "vertical" },
        { spacing: 12 },
        { padding: 16 },
        { backgroundColor: "#000000" },
        { cornerRadius: 12 }
      ],
      children: [
        {
          type: "chart",
          properties: [
            { type: "area" },
            { data: data.prices.join(',') },
            { width: 300 },
            { height: 60 },
            { color: isPositive ? "#34C759" : "#FF3B30" },
            { fillColor: isPositive ? "#34C75930" : "#FF3B3030" },
            { strokeWidth: 2 },
            { smooth: true }
          ]
        },
        {
          type: "chart",
          properties: [
            { type: "bar" },
            { data: data.volumes.join(',') },
            { width: 300 },
            { height: 25 },
            { color: "#48484A" }
          ]
        }
      ]
    },
    data: {
      symbol: data.symbol,
      currentPrice: data.currentPrice.toLocaleString(),
      change: `${isPositive ? '+' : ''}${data.change.toFixed(2)}%`
    }
  };
}
```

## Common Use Cases

### 1. **Financial Monitoring**

- Stock prices

### 2. **Analytics and Metrics**

- Website traffic

### 3. **IoT and Monitoring**

- Temperature/humidity

### 4. **Fitness and Health**

- Heart rate monitoring

### 5. **Business Intelligence**

- Sales performance

---

For more information on other elements, see:

- [Main JSON Layout Guide](./json-layout-guide.md)

- [Container Examples](./container-examples.md)