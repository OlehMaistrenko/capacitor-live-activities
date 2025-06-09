import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { LiveActivities } from 'capacitor-live-activities';
import { LiveActivitiesService } from '../../services/live-activities.service';
import { playCircle, refresh, stopCircle, trendingUp, barChart, analytics } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-chart-examples',
  templateUrl: './chart-examples.page.html',
  styleUrls: ['./chart-examples.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    FaIconComponent,
  ],
})
export class ChartExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle, trendingUp, barChart, analytics });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  private currentDataIndex = 0;
  private readonly dataSets = [
    [10, 25, 15, 30, 20, 35, 25], // Stock-like data
    [5, 15, 25, 20, 30, 15, 40],  // Fitness data
    [20, 18, 22, 28, 24, 32, 30], // Revenue data
    [15, 10, 20, 25, 18, 28, 22], // Temperature data
  ];

  async startChartExample() {
    try {
      const currentData = this.dataSets[this.currentDataIndex];

      const activityData = {
        layout: {
          id: 'chart-demo',
          type: 'container' as const,
          properties: [
            { direction: 'vertical' as const },
            { spacing: 16 },
            { padding: 20 },
            { backgroundColor: '#000000' },
            { cornerRadius: 16 },
          ],
          children: [
            // Header
            {
              id: 'header',
              type: 'container' as const,
              properties: [{ direction: 'horizontal' as const }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'icon',
                  type: 'image' as const,
                  properties: [
                    { systeName: 'chart.line.uptrend.xyaxis' },
                    { color: '#00D4AA' },
                    { width: 24 },
                    { height: 24 },
                  ],
                },
                {
                  id: 'title',
                  type: 'text' as const,
                  properties: [{ text: 'Chart Examples' }, { fontSize: 18 }, { fontWeight: 'semibold' }, { color: '#FFFFFF' }],
                },
                {
                  id: 'value',
                  type: 'text' as const,
                  properties: [{ text: '{{currentValue}}' }, { fontSize: 16 }, { fontWeight: 'medium' }, { color: '#00D4AA' }],
                },
              ],
            },

            // Line Chart Example
            {
              id: 'line-section',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 8 }],
              children: [
                {
                  id: 'line-header',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'line-icon',
                      type: 'image' as const,
                      properties: [{ systeName: 'waveform.path' }, { color: '#007AFF' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      id: 'line-label',
                      type: 'text' as const,
                      properties: [{ text: 'Line Chart' }, { fontSize: 14 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  id: 'line-chart',
                  type: 'chart' as const,
                  properties: [
                    { type: 'line' },
                    { data: '{{chartData}}' },
                    { width: 280 },
                    { height: 50 },
                    { color: '#007AFF' },
                    { strokeWidth: 2 },
                    { showPoints: true },
                    { smooth: true },
                  ],
                },
              ],
            },

            // Bar Chart Example
            {
              id: 'bar-section',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 8 }],
              children: [
                {
                  id: 'bar-header',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'bar-icon',
                      type: 'image' as const,
                      properties: [{ systeName: 'chart.bar' }, { color: '#FF9500' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      id: 'bar-label',
                      type: 'text' as const,
                      properties: [{ text: 'Bar Chart' }, { fontSize: 14 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  id: 'bar-chart',
                  type: 'chart' as const,
                  properties: [
                    { type: 'bar' },
                    { data: '{{chartData}}' },
                    { width: 280 },
                    { height: 45 },
                    { color: '#FF9500' },
                  ],
                },
              ],
            },

            // Area Chart Example
            {
              id: 'area-section',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 8 }],
              children: [
                {
                  id: 'area-header',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'area-icon',
                      type: 'image' as const,
                      properties: [{ systeName: 'chart.line.uptrend.xyaxis.circle' }, { color: '#34C759' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      id: 'area-label',
                      type: 'text' as const,
                      properties: [{ text: 'Area Chart' }, { fontSize: 14 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  id: 'area-chart',
                  type: 'chart' as const,
                  properties: [
                    { type: 'area' },
                    { data: '{{chartData}}' },
                    { width: 280 },
                    { height: 50 },
                    { color: '#34C759' },
                    { fillColor: '#34C759' },
                    { strokeWidth: 2 },
                    { smooth: true },
                  ],
                },
              ],
            },

            // Stats Summary
            {
              id: 'stats',
              type: 'container' as const,
              properties: [
                { direction: 'horizontal' as const },
                { spacing: 16 },
                { padding: 12 },
                { backgroundColor: '#1C1C1E' },
                { cornerRadius: 8 },
              ],
              children: [
                {
                  id: 'min-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'min-label',
                      type: 'text' as const,
                      properties: [{ text: 'MIN' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'min-value',
                      type: 'text' as const,
                      properties: [{ text: '{{minValue}}' }, { fontSize: 16 }, { fontWeight: 'semibold' }, { color: '#FFFFFF' }],
                    },
                  ],
                },
                {
                  id: 'max-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'max-label',
                      type: 'text' as const,
                      properties: [{ text: 'MAX' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'max-value',
                      type: 'text' as const,
                      properties: [{ text: '{{maxValue}}' }, { fontSize: 16 }, { fontWeight: 'semibold' }, { color: '#FFFFFF' }],
                    },
                  ],
                },
                {
                  id: 'avg-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'avg-label',
                      type: 'text' as const,
                      properties: [{ text: 'AVG' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'avg-value',
                      type: 'text' as const,
                      properties: [{ text: '{{avgValue}}' }, { fontSize: 16 }, { fontWeight: 'semibold' }, { color: '#FFFFFF' }],
                    },
                  ],
                },
                {
                  id: 'trend-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'trend-label',
                      type: 'text' as const,
                      properties: [{ text: 'TREND' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'trend-value',
                      type: 'text' as const,
                      properties: [{ text: '{{trendValue}}' }, { fontSize: 16 }, { fontWeight: 'semibold' }, { color: '{{trendColor}}' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        data: this.generateChartData(currentData),
        behavior: {
          systemActionForegroundColor: '#00D4AA',
          widgetUrl: 'app://charts',
          keyLineTint: '#00D4AA',
        },
      };

      const result = await LiveActivities.startActivity(activityData as any);
      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Charts iniciado! 📊');
    } catch (error) {
      console.error('Error starting chart example:', error);
      this.liveActivitiesService.showToast('Erro ao iniciar exemplo', 'danger');
    }
  }

  async changeData() {
    this.currentDataIndex = (this.currentDataIndex + 1) % this.dataSets.length;
    const currentData = this.dataSets[this.currentDataIndex];

    const updateData = this.generateChartData(currentData);

    await this.liveActivitiesService.updateActivity(
      updateData,
      'Dados Atualizados',
      `Novo conjunto de dados ${this.currentDataIndex + 1}`
    );
  }

  private generateChartData(data: number[]) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const avg = Math.round(data.reduce((a, b) => a + b) / data.length);
    const trend = data[data.length - 1] > data[0] ? '↗️' : '↘️';
    const trendColor = data[data.length - 1] > data[0] ? '#34C759' : '#FF3B30';

    return {
      chartData: data.join(','),
      currentValue: `$${data[data.length - 1]}`,
      minValue: min.toString(),
      maxValue: max.toString(),
      avgValue: avg.toString(),
      trendValue: trend,
      trendColor: trendColor,
    };
  }

  async endExample() {
    await this.liveActivitiesService.endActivity({
      currentValue: 'Finalizado',
    });
    this.currentDataIndex = 0;
  }
}
