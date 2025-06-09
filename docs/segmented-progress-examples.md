# Segmented Progress Examples - Documentação Completa

## Visão Geral

O elemento `segmentedProgress` permite criar barras de progresso divididas em segmentos, ideal para mostrar etapas de processos, fases de entrega, níveis de progresso e workflows sequenciais.

## Conceito Básico

O segmented progress divide uma barra de progresso em múltiplos segmentos, onde cada segmento pode ter diferentes estados: completo, em progresso, ou pendente.

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

## Propriedades Detalhadas

### Propriedades Obrigatórias

| Propriedade | Tipo | Descrição | Exemplo |
|-------------|------|-----------|---------|
| `segments` | Number | Número total de segmentos | `4` |
| `filled` | Number | Número de segmentos preenchidos | `2` |

### Propriedades Visuais

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

## Estados dos Segmentos

### 1. Segmentos Completos
Segmentos anteriores ao atual, totalmente preenchidos.

### 2. Segmento Atual
Segmento em progresso, parcialmente preenchido baseado na propriedade `progress`.

### 3. Segmentos Pendentes
Segmentos futuros, ainda não iniciados.

## Exemplos Práticos

### Exemplo 1: Rastreamento de Entrega

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
              { "systeName": "shippingbox.fill" },
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
                  { "text": "Pedido #{{orderNumber}}" },
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
                  { "text": "Confirmado" },
                  { "fontSize": 11 },
                  { "color": "#34C759" }
                ]
              },
              {
                "id": "stage-2",
                "type": "text",
                "properties": [
                  { "text": "Preparando" },
                  { "fontSize": 11 },
                  { "color": "{{stage2Color}}" }
                ]
              },
              {
                "id": "stage-3",
                "type": "text",
                "properties": [
                  { "text": "A caminho" },
                  { "fontSize": 11 },
                  { "color": "{{stage3Color}}" }
                ]
              },
              {
                "id": "stage-4",
                "type": "text",
                "properties": [
                  { "text": "Entregue" },
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
              { "systeName": "clock" },
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
    "currentStatus": "Preparando seu pedido",
    "currentSegment": 2,
    "segmentProgress": 0.6,
    "stage2Color": "#FF9500",
    "stage3Color": "#3A3A3C",
    "stage4Color": "#3A3A3C",
    "etaText": "Entrega prevista para 15:30"
  }
}
```

### Exemplo 2: Progresso de Instalação

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
              { "bundlePath": "{{appIcon}}" },
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
        "type": "segmentedProgress",
        "properties": [
          { "segments": 5 },
          { "currentSegment": "{{currentStep}}" },
          { "progress": "{{stepProgress}}" },
          { "width": 260 },
          { "height": 6 },
          { "completedColor": "#34C759" },
          { "currentColor": "#007AFF" },
          { "pendingColor": "#2C2C2E" },
          { "segmentSpacing": 3 },
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
              { "text": "Verificando" },
              { "fontSize": 9 },
              { "color": "{{step2Color}}" }
            ]
          },
          {
            "id": "step-3",
            "type": "text",
            "properties": [
              { "text": "Instalando" },
              { "fontSize": 9 },
              { "color": "{{step3Color}}" }
            ]
          },
          {
            "id": "step-4",
            "type": "text",
            "properties": [
              { "text": "Configurando" },
              { "fontSize": 9 },
              { "color": "{{step4Color}}" }
            ]
          },
          {
            "id": "step-5",
            "type": "text",
            "properties": [
              { "text": "Concluído" },
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
    "installStatus": "Verificando integridade...",
    "currentStep": 2,
    "stepProgress": 0.8,
    "step2Color": "#007AFF",
    "step3Color": "#2C2C2E",
    "step4Color": "#2C2C2E",
    "step5Color": "#2C2C2E"
  }
}
```

### Exemplo 3: Níveis de Jogo

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
                  { "text": "Nível {{currentLevel}}" },
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
                  { "text": "{{nextLevelXP}} para próximo" },
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
        "type": "segmentedProgress",
        "properties": [
          { "segments": 10 },
          { "currentSegment": "{{currentLevelSegment}}" },
          { "progress": "{{levelProgress}}" },
          { "width": 280 },
          { "height": 10 },
          { "completedColor": "#FFDE59" },
          { "currentColor": "#FFB347" },
          { "pendingColor": "#3C3C3C" },
          { "segmentSpacing": 3 },
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
              { "systeName": "star.fill" },
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
    "levelProgress": 0.4,
    "recentAchievement": "Conquistou 'Master Explorer'"
  }
}
```

## Casos de Uso Comuns

### 1. **E-commerce e Delivery**
- Status de pedidos
- Progresso de entrega
- Etapas de pagamento

### 2. **Downloads e Instalações**
- Progresso de download
- Etapas de instalação
- Updates de aplicativo

### 3. **Workflows e Processos**
- Aprovações em etapas
- Processos de onboarding
- Pipelines de produção

### 4. **Gaming e Gamificação**
- Progresso de níveis
- Conquistas por etapas
- Missões sequenciais

### 5. **Fitness e Objetivos**
- Metas semanais
- Progresso de treino
- Challenges por etapas

## Estados Dinâmicos

### Implementação TypeScript

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
      type: "segmentedProgress",
      properties: [
        { segments: state.totalSegments },
        { currentSegment: state.currentSegment },
        { progress: newProgress },
        { width: 280 },
        { height: 8 },
        { completedColor: "#34C759" },
        { currentColor: "#007AFF" },
        { pendingColor: "#3A3A3C" }
      ]
    },
    data: {
      progressPercent: Math.round(newProgress * 100),
      currentStage: state.labels?.[state.currentSegment - 1] || `Etapa ${state.currentSegment}`
    }
  };
}

// Exemplo de uso
const deliveryState = {
  totalSegments: 4,
  currentSegment: 2,
  progress: 0.6,
  labels: ["Confirmado", "Preparando", "A caminho", "Entregue"]
};

const updatedLayout = updateProgress(deliveryState, 0.8);
```

## Animações e Transições

O segmented progress suporta transições suaves quando:

1. **Mudança de segmento**: Animação de preenchimento
2. **Progresso interno**: Crescimento suave da barra
3. **Estados de cor**: Transições entre cores

### Configuração de Animação

```json
{
  "properties": [
    { "animationDuration": 0.5 },
    { "animationType": "easeInOut" }
  ]
}
```

## Acessibilidade

### Melhores Práticas

- ✅ **Contraste de cores** adequado para visibilidade
- ✅ **Labels descritivos** para cada etapa
- ✅ **Informação textual** complementar ao visual
- ✅ **Dimensões mínimas** para toque (44pt)

### Implementação Acessível

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
        { "text": "Progresso: {{currentStep}} de {{totalSteps}}" },
        { "fontSize": 14 },
        { "color": "#FFFFFF" }
      ]
    },
    {
      "id": "segmented-bar",
      "type": "segmentedProgress",
      "properties": [
        { "segments": "{{totalSteps}}" },
        { "currentSegment": "{{currentStep}}" },
        { "progress": "{{stepProgress}}" }
      ]
    }
  ]
}
```

## Performance e Limitações

### Recomendações

- ✅ **Máximo 10 segmentos** para legibilidade
- ✅ **Dimensões proporcionais** (largura ≥ 20x altura)
- ✅ **Updates moderados** (não mais que 1/segundo)
- ❌ Evite animações muito complexas

### Limitações Técnicas

1. **Segmentos máximos**: 20 (recomendado: 10)
2. **Progresso**: Valores entre 0.0 e 1.0
3. **Renderização**: SwiftUI nativo
4. **Interatividade**: Apenas tap para abrir app

---

Para mais informações sobre outros elementos, consulte:
- [Guia Principal de Layouts JSON](./json-layout-guide.md)
- [Chart Examples](./chart-examples.md)
- [Progress Examples](./progress-examples.md)