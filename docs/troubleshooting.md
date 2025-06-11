# Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. Layout Not Displayed

#### ❌ **Issue**: Live Activity is not shown
```typescript
// Layout not working
const result = await LiveActivities.startActivity({
  layout: undefined, // ❌ Empty layout
  data: {}
});
```

#### ✅ **Solution**: Check basic structure
```typescript
const result = await LiveActivities.startActivity({
  layout: {
    type: "container",
    properties: [
      { direction: "vertical" }
    ],
    children: [
      {
        type: "text",
        properties: [
          { text: "Hello World" }
        ]
      }
    ]
  },
  data: {}
});
```

### 2. Properties Not Working

#### ❌ **Issue**: Properties are ignored
```json
// Incorrect properties
{
  "type": "text",
  "properties": [
    { "systeName": "heart.fill" },     // ❌ Image property in text
    { "currentSegment": 2 },           // ❌ Non-existent property
    { "segmentSpacing": 4 }            // ❌ Incorrect name
  ]
}
```

#### ✅ **Solution**: Use correct properties
```json
{
  "type": "text",
  "properties": [
    { "text": "Correct text" },
    { "fontSize": 16 },
    { "color": "#FFFFFF" }
  ]
}
```

### 3. Dynamic Data Not Replacing

#### ❌ **Issue**: Template variables not working
```typescript
// Data mismatch with template
const layout = {
  properties: [
    { text: "{{userName}}" }  // Template expects userName
  ]
};

const data = {
  user: "John"  // ❌ Different key
};
```

#### ✅ **Solution**: Align templates with data
```typescript
const layout = {
  properties: [
    { text: "{{userName}}" }
  ]
};

const data = {
  userName: "John"  // ✅ Correct key
};
```

### 4. Segmented Progress Not Working

#### ❌ **Issue**: Incorrect properties
```json
{
  "type": "segmentedProgress",  // ❌ Incorrect name
  "properties": [
    { "currentSegment": 2 },    // ❌ Incorrect property
    { "completedColor": "#00FF00" }  // ❌ Incorrect name
  ]
}
```

#### ✅ **Solution**: Use correct implementation
```json
{
  "type": "segmented-progress",  // ✅ Correct name
  "properties": [
    { "segments": 4 },
    { "filled": 2 },             // ✅ Correct property
    { "filledColor": "#00FF00" }  // ✅ Correct name
  ]
}
```

### 5. Charts Not Rendering

#### ❌ **Issue**: Invalid data
```json
{
  "type": "chart",
  "properties": [
    { "data": "abc,def,ghi" },  // ❌ Non-numeric data
    { "type": "pie" }           // ❌ Unsupported type
  ]
}
```

#### ✅ **Solution**: Correct data and types
```json
{
  "type": "chart",
  "properties": [
    { "data": "10,20,15,25" },  // ✅ Numeric data
    { "type": "line" }          // ✅ Supported type: line|area|bar
  ]
}
```

### 6. Images Not Loading

#### ❌ **Issue**: Conflicting properties
```json
{
  "type": "image",
  "properties": [
    { "systeName": "heart.fill" },    // ❌ Incorrect name
    { "url": "https://..." },         // ❌ Multiple sources
    { "bundlePath": "icon.png" }      // ❌ Incorrect name
  ]
}
```

#### ✅ **Solution**: Use one source at a time
```json
// For SF Symbols:
{
  "type": "image",
  "properties": [
    { "systemName": "heart.fill" },   // ✅ Correct name
    { "color": "#FF0000" }
  ]
}

// For assets:
{
  "type": "image", 
  "properties": [
    { "asset": "icon.png" }           // ✅ Correct name
  ]
}
```

## 🔍 Debugging Checklist

### Basic Verification

- [ ] **Layout has unique ID** for each element
- [ ] **Element type** is correct (`text`, `image`, `container`, etc.)
- [ ] **Properties are arrays** of objects `[{ key: value }]`
- [ ] **Template variables** match provided data
- [ ] **Data types** are correct (Number, String, Boolean)

### Syntax Verification

```typescript
// ✅ Correct structure
{
  "type": "text",                 // Required string  
  "properties": [                 // Required array
    { "text": "Hello" },          // Objects with 1 property
    { "fontSize": 16 }
  ],
  "children": []                  // Array (optional, only for containers)
}
```

### Performance Verification

- [ ] **Charts**: Maximum 15 data points
- [ ] **Segmented Progress**: Maximum 10 segments  
- [ ] **Images**: URLs are optimized/accessible
- [ ] **Updates**: No more than 1 per second
- [ ] **Nesting**: Maximum 4 levels of containers

## 📋 Correct Naming

### Elements
| ✅ Correct | ❌ Incorrect |
|------------|--------------|
| `text` | `label`, `textView` |
| `image` | `icon`, `picture` |
| `container` | `view`, `stack` |
| `timer` | `countdown`, `clock` |
| `progress` | `progressBar`, `bar` |
| `chart` | `graph`, `plot` |
| `segmented-progress` | `segmentedProgress` |

### Image Properties
| ✅ Correct | ❌ Incorrect |
|------------|--------------|
| `systemName` | `systeName`, `sfSymbol` |
| `asset` | `bundlePath`, `imageName` |
| `width` | `imageWidth`, `size` |
| `height` | `imageHeight`, `size` |

### Segmented Progress Properties
| ✅ Correct | ❌ Incorrect |
|------------|--------------|
| `filled` | `currentSegment`, `completed` |
| `filledColor` | `completedColor`, `activeColor` |
| `unfilledColor` | `pendingColor`, `inactiveColor` |
| `spacing` | `segmentSpacing`, `gap` |

## 🛠️ Debugging Tools

### 1. Console Logs
```typescript
// Check data before sending
console.log('Layout:', JSON.stringify(layout, null, 2));
console.log('Data:', JSON.stringify(data, null, 2));

const result = await LiveActivities.startActivity({
  layout,
  data
});

console.log('Result:', result);
```

### 2. Template Variables Validation
```typescript
function validateTemplateVariables(layout: any, data: any) {
  const layoutString = JSON.stringify(layout);
  const templateVars = layoutString.match(/\{\{(\w+)\}\}/g) || [];
  
  templateVars.forEach(template => {
    const key = template.replace(/\{\{|\}\}/g, '');
    if (!(key in data)) {
      console.warn(`Template variable "${key}" not found in data`);
    }
  });
}
```

### 3. Layout Structure Validator
```typescript
function validateLayout(element: any): boolean {
  if (!element.id || !element.type) {
    console.error('Element missing id or type:', element);
    return false;
  }
  
  if (!Array.isArray(element.properties)) {
    console.error('Properties must be array:', element);
    return false;
  }
  
  if (element.children && !Array.isArray(element.children)) {
    console.error('Children must be array:', element);
    return false;
  }
  
  return true;
}
```

## 🚑 Specific Error Solutions

### "Activity failed to start"
1. Check iOS permissions (Settings > Live Activities)
2. Confirm iOS 16.2+ 
3. Verify layout structure
4. Test with a simple layout first

### "Template variables not replaced"
1. Check key spelling
2. Confirm data types
3. Test with static data first
4. Ensure data object is not empty

### "Properties ignored"
1. Refer to [Universal Properties](./universal-properties.md)
2. Verify element-specific naming
3. Confirm value type (String, Number, Boolean)
4. Test property in isolation

### "Images not loading"
1. For SF Symbols: use correct `systemName`
2. For URLs: check connectivity and HTTPS
3. For assets: confirm file in bundle
4. Verify reasonable dimensions (not too large)

### "Performance issues"
1. Reduce number of elements
2. Limit chart data
3. Optimize images
4. Avoid frequent updates
5. Simplify container hierarchy

## 🔗 Useful Links

- [Universal Properties](./universal-properties.md) - Properties applicable to all elements
- [Quick Reference](./quick-reference.md) - Quick syntax guide
- [JSON Layout Guide](./json-layout-guide.md) - Complete guide
- [Chart Examples](./chart-examples.md) - Chart-specific troubleshooting
- [Segmented Progress](./segmented-progress-examples.md) - Correct properties

---

💡 **Tip**: Always test with simple layouts first and gradually add complexity!