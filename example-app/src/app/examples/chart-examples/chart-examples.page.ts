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
import { LiveActivities, LiveActivitiesOptions } from 'capacitor-live-activities';
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
    [5, 15, 25, 20, 30, 15, 40], // Fitness data
    [20, 18, 22, 28, 24, 32, 30], // Revenue data
    [15, 10, 20, 25, 18, 28, 22], // Temperature data
  ];

  async startChartExample() {
    try {
      const currentData = this.dataSets[this.currentDataIndex];

      const activityData: LiveActivitiesOptions = {
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 16 },
            { padding: 20 },
            { backgroundColor: '#000000' },
            { cornerRadius: 16 },
          ],
          children: [
            // Header
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'chart.line.uptrend.xyaxis' },
                    { color: '#00D4AA' },
                    { width: 24 },
                    { height: 24 },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: 'Chart Examples' },
                    { fontSize: 18 },
                    { fontWeight: 'semibold' },
                    { color: '#FFFFFF' },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{currentValue}}' },
                    { fontSize: 16 },
                    { fontWeight: 'medium' },
                    { color: '#00D4AA' },
                  ],
                },
              ],
            },

            // Line Chart Example
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [
                        { systemName: 'waveform.path' },
                        { color: '#007AFF' },
                        { width: 16 },
                        { height: 16 },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'Line Chart' }, { fontSize: 14 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  type: 'chart',
                  properties: [
                    { type: 'line' },
                    { data: '{{chartData}}' as any },
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
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: 'chart.bar' }, { color: '#FF9500' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'Bar Chart' }, { fontSize: 14 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  type: 'chart',
                  properties: [
                    { type: 'bar' },
                    { data: '{{chartData}}' as any },
                    { width: 280 },
                    { height: 45 },
                    { color: '#FF9500' },
                  ],
                },
              ],
            },

            // Area Chart Example
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [
                        { systemName: 'chart.line.uptrend.xyaxis.circle' },
                        { color: '#34C759' },
                        { width: 16 },
                        { height: 16 },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'Area Chart' }, { fontSize: 14 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  type: 'chart',
                  properties: [
                    { type: 'area' },
                    { data: '{{chartData}}' as any },
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
              type: 'container',
              properties: [
                { direction: 'horizontal' },
                { spacing: 16 },
                { padding: 12 },
                { backgroundColor: '#1C1C1E' },
                { cornerRadius: 8 },
              ],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: 'MIN' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{minValue}}' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: 'MAX' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{maxValue}}' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: 'AVG' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{avgValue}}' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: 'TREND' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{trendValue}}' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '{{trendColor}}' as any },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        dynamicIslandLayout: {
          expanded: {
            leading: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 2 }],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'chart.line.uptrend.xyaxis' },
                    { color: '#00D4AA' },
                    { width: 20 },
                    { height: 20 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Charts' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            trailing: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'trailing' }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: '{{currentValue}}' },
                    { fontSize: 14 },
                    { fontWeight: 'bold' },
                    { color: '#FFFFFF' },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{trendValue}}' }, { fontSize: 12 }, { color: '{{trendColor}}' as any }],
                },
              ],
            },
            center: {
              type: 'text',
              properties: [
                { text: 'Chart Analysis' },
                { fontSize: 11 },
                { fontWeight: 'medium' },
                { color: '#FFFFFF' },
              ],
            },
            bottom: {
              type: 'chart',
              properties: [
                { type: 'line' },
                { data: '{{chartData}}' as any },
                { width: 220 },
                { height: 30 },
                { color: '#00D4AA' },
                { strokeWidth: 2 },
                { showPoints: false },
                { smooth: true },
              ],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [
              { systemName: 'chart.line.uptrend.xyaxis' },
              { color: '#00D4AA' },
              { width: 16 },
              { height: 16 },
            ],
          },
          compactTrailing: {
            type: 'container',
            properties: [{ direction: 'horizontal' }, { spacing: 3 }],
            children: [
              {
                type: 'text',
                properties: [
                  { text: '{{currentValue}}' },
                  { fontSize: 12 },
                  { fontWeight: 'semibold' },
                  { color: '#FFFFFF' },
                ],
              },
              {
                type: 'text',
                properties: [{ text: '{{trendValue}}' }, { fontSize: 10 }, { color: '{{trendColor}}' as any }],
              },
            ],
          },
          minimal: {
            type: 'text',
            properties: [{ text: '{{trendValue}}' }, { fontSize: 12 }, { color: '{{trendColor}}' as any }],
          },
        },
        data: this.generateChartData(currentData),
        behavior: {
          systemActionForegroundColor: '#00D4AA',
          widgetUrl: 'app://charts',
          keyLineTint: '#00D4AA',
        },
      };

      const result = await LiveActivities.startActivity(activityData);
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
      `Novo conjunto de dados ${this.currentDataIndex + 1}`,
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
