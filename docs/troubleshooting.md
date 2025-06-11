# Troubleshooting Guide - Solução de Problemas

## 🚨 Problemas Comuns e Soluções

### 1. Layout Não Aparece

#### ❌ **Problema**: Live Activity não é exibida
```typescript
// Layout não funciona
const result = await LiveActivities.startActivity({
  layout: undefined, // ❌ Layout vazio
  data: {}
});
```

#### ✅ **Solução**: Verificar estrutura básica
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

### 2. Propriedades Não Funcionam

#### ❌ **Problema**: Propriedades ignoradas
```json
// Propriedades incorretas
{
  "type": "text",
  "properties": [
    { "systeName": "heart.fill" },     // ❌ Propriedade de image em text
    { "currentSegment": 2 },           // ❌ Propriedade que não existe
    { "segmentSpacing": 4 }            // ❌ Nome incorreto
  ]
}
```

#### ✅ **Solução**: Usar propriedades corretas
```json
{
  "type": "text",
  "properties": [
    { "text": "Texto correto" },
    { "fontSize": 16 },
    { "color": "#FFFFFF" }
  ]
}
```

### 3. Dados Dinâmicos Não Substituem

#### ❌ **Problema**: Template variables não funcionam
```typescript
// Dados não batem com template
const layout = {
  properties: [
    { text: "{{userName}}" }  // Template espera userName
  ]
};

const data = {
  user: "João"  // ❌ Chave diferente
};
```

#### ✅ **Solução**: Alinhar templates com dados
```typescript
const layout = {
  properties: [
    { text: "{{userName}}" }
  ]
};

const data = {
  userName: "João"  // ✅ Chave correta
};
```

### 4. Segmented Progress Não Funciona

#### ❌ **Problema**: Propriedades incorretas
```json
{
  "type": "segmentedProgress",  // ❌ Nome incorreto
  "properties": [
    { "currentSegment": 2 },    // ❌ Propriedade incorreta
    { "completedColor": "#00FF00" }  // ❌ Nome incorreto
  ]
}
```

#### ✅ **Solução**: Usar implementação correta
```json
{
  "type": "segmented-progress",  // ✅ Nome correto
  "properties": [
    { "segments": 4 },
    { "filled": 2 },             // ✅ Propriedade correta
    { "filledColor": "#00FF00" }  // ✅ Nome correto
  ]
}
```

### 5. Charts Não Renderizam

#### ❌ **Problema**: Dados inválidos
```json
{
  "type": "chart",
  "properties": [
    { "data": "abc,def,ghi" },  // ❌ Dados não numéricos
    { "type": "pie" }           // ❌ Tipo não suportado
  ]
}
```

#### ✅ **Solução**: Dados e tipos corretos
```json
{
  "type": "chart",
  "properties": [
    { "data": "10,20,15,25" },  // ✅ Dados numéricos
    { "type": "line" }          // ✅ Tipo suportado: line|area|bar
  ]
}
```

### 6. Imagens Não Carregam

#### ❌ **Problema**: Propriedades conflitantes
```json
{
  "type": "image",
  "properties": [
    { "systeName": "heart.fill" },    // ❌ Nome incorreto
    { "url": "https://..." },         // ❌ Múltiplas fontes
    { "bundlePath": "icon.png" }      // ❌ Nome incorreto
  ]
}
```

#### ✅ **Solução**: Uma fonte por vez
```json
// Para SF Symbols:
{
  "type": "image",
  "properties": [
    { "systemName": "heart.fill" },   // ✅ Nome correto
    { "color": "#FF0000" }
  ]
}

// Para assets:
{
  "type": "image", 
  "properties": [
    { "asset": "icon.png" }           // ✅ Nome correto
  ]
}
```

## 🔍 Debugging Checklist

### Verificação Básica

- [ ] **Layout tem ID único** para cada elemento
- [ ] **Tipo de elemento** está correto (`text`, `image`, `container`, etc.)
- [ ] **Propriedades são arrays** de objetos `[{ key: value }]`
- [ ] **Template variables** batem com dados fornecidos
- [ ] **Tipos de dados** estão corretos (Number, String, Boolean)

### Verificação de Sintaxe

```typescript
// ✅ Estrutura correta
{
  "type": "text",                 // String obrigatório  
  "properties": [                 // Array obrigatório
    { "text": "Hello" },          // Objetos com 1 propriedade
    { "fontSize": 16 }
  ],
  "children": []                  // Array (opcional, apenas containers)
}
```

### Verificação de Performance

- [ ] **Charts**: Máximo 15 pontos de dados
- [ ] **Segmented Progress**: Máximo 10 segmentos  
- [ ] **Imagens**: URLs são otimizadas/acessíveis
- [ ] **Updates**: Não mais que 1 por segundo
- [ ] **Nesting**: Máximo 4 níveis de containers

## 📋 Nomenclatura Correta

### Elementos
| ✅ Correto | ❌ Incorreto |
|------------|--------------|
| `text` | `label`, `textView` |
| `image` | `icon`, `picture` |
| `container` | `view`, `stack` |
| `timer` | `countdown`, `clock` |
| `progress` | `progressBar`, `bar` |
| `chart` | `graph`, `plot` |
| `segmented-progress` | `segmentedProgress` |

### Propriedades de Image
| ✅ Correto | ❌ Incorreto |
|------------|--------------|
| `systemName` | `systeName`, `sfSymbol` |
| `asset` | `bundlePath`, `imageName` |
| `width` | `imageWidth`, `size` |
| `height` | `imageHeight`, `size` |

### Propriedades de Segmented Progress
| ✅ Correto | ❌ Incorreto |
|------------|--------------|
| `filled` | `currentSegment`, `completed` |
| `filledColor` | `completedColor`, `activeColor` |
| `unfilledColor` | `pendingColor`, `inactiveColor` |
| `spacing` | `segmentSpacing`, `gap` |

## 🛠️ Ferramentas de Debug

### 1. Console Logs
```typescript
// Verificar dados antes de enviar
console.log('Layout:', JSON.stringify(layout, null, 2));
console.log('Data:', JSON.stringify(data, null, 2));

const result = await LiveActivities.startActivity({
  layout,
  data
});

console.log('Result:', result);
```

### 2. Validação de Template Variables
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

### 3. Estrutura de Layout Validator
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

## 🚑 Soluções para Erros Específicos

### "Activity failed to start"
1. Verificar permissões iOS (Settings > Live Activities)
2. Confirmar iOS 16.2+ 
3. Verificar estrutura do layout
4. Testar com layout simples primeiro

### "Template variables not replaced"
1. Verificar ortografia das chaves
2. Confirmar tipos de dados
3. Testar com dados estáticos primeiro
4. Verificar se data object não está vazio

### "Properties ignored"
1. Consultar [Universal Properties](./universal-properties.md)
2. Verificar nomenclatura específica do elemento
3. Confirmar tipo de valor (String, Number, Boolean)
4. Testar propriedade isoladamente

### "Images not loading"
1. Para SF Symbols: usar `systemName` correto
2. Para URLs: verificar conectividade e HTTPS
3. Para assets: confirmar arquivo no bundle
4. Verificar dimensões razoáveis (não muito grandes)

### "Performance issues"
1. Reduzir número de elementos
2. Limitar dados de charts
3. Otimizar imagens
4. Evitar updates muito frequentes
5. Simplificar hierarquia de containers

## 🔗 Links Úteis

- [Universal Properties](./universal-properties.md) - Propriedades aplicáveis a todos elementos
- [Quick Reference](./quick-reference.md) - Sintaxe rápida
- [JSON Layout Guide](./json-layout-guide.md) - Guia completo
- [Chart Examples](./chart-examples.md) - Troubleshooting específico de charts
- [Segmented Progress](./segmented-progress-examples.md) - Propriedades corretas

---

💡 **Dica**: Sempre teste com layouts simples primeiro e adicione complexidade gradualmente!