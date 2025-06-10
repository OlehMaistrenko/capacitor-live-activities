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
} from '@ionic/angular/standalone';
import { LiveActivities, LiveActivitiesOptions } from 'capacitor-live-activities';
import { LiveActivitiesService } from '../../services/live-activities.service';
import { playCircle, refresh, stopCircle, trendingUp, trendingDown } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-crypto-tracker',
  templateUrl: './crypto-tracker.page.html',
  styleUrls: ['./crypto-tracker.page.scss'],
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
export class CryptoTrackerPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle, trendingUp, trendingDown });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  private currentPriceIndex = 0;
  private readonly priceData = [
    { price: 43250, data: [42800, 43100, 42950, 43250, 43180, 43320, 43250] },
    { price: 43520, data: [43250, 43350, 43280, 43450, 43520, 43480, 43520] },
    { price: 42980, data: [43520, 43400, 43250, 43100, 42980, 43050, 42980] },
    { price: 44100, data: [42980, 43200, 43580, 43890, 44100, 44050, 44100] },
  ];

  async startCryptoTracker() {
    try {
      const currentData = this.priceData[this.currentPriceIndex];
      const prevPrice = 43000; // Previous day close
      const change = currentData.price - prevPrice;
      const changePercent = (change / prevPrice) * 100;

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
            // Header with crypto info
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: '₿' }, { fontSize: 24 }, { color: '#F7931A' }],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [
                        { text: 'Bitcoin' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'BTC/USD' }, { fontSize: 12 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'trailing' }],
                  children: [
                    {
                      type: 'text',
                      properties: [
                        { text: '${{currentPrice}}' },
                        { fontSize: 18 },
                        { fontWeight: 'bold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      type: 'container',
                      properties: [{ direction: 'horizontal' }, { spacing: 4 }, { insideAlignment: 'center' }],
                      children: [
                        {
                          type: 'image',
                          properties: [
                            { systemName: '{{trendIcon}}' },
                            { color: '{{trendColor}}' as any },
                            { width: 12 },
                            { height: 12 },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [
                            { text: '{{changeText}}' },
                            { fontSize: 12 },
                            { color: '{{trendColor}}' as any },
                            { fontWeight: 'medium' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Price Chart
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: '24H Chart' }, { fontSize: 12 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'Last 7 points' }, { fontSize: 10 }, { color: '#48484A' }],
                    },
                  ],
                },
                {
                  type: 'chart',
                  properties: [
                    { type: 'area' },
                    { data: '{{chartData}}' as any },
                    { width: 300 },
                    { height: 60 },
                    { color: '{{chartColor}}' as any },
                    { fillColor: '{{chartColor}}' as any },
                    { strokeWidth: 2 },
                    { smooth: true },
                  ],
                },
              ],
            },

            // Stats Row
            {
              type: 'container',
              properties: [
                { direction: 'horizontal' },
                { spacing: 12 },
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
                      properties: [{ text: '24H HIGH' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '${{highPrice}}' },
                        { fontSize: 13 },
                        { fontWeight: 'medium' },
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
                      properties: [{ text: '24H LOW' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '${{lowPrice}}' },
                        { fontSize: 13 },
                        { fontWeight: 'medium' },
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
                      properties: [{ text: 'VOLUME' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{volume}}' },
                        { fontSize: 13 },
                        { fontWeight: 'medium' },
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
                      properties: [{ text: 'MARKET CAP' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{marketCap}}' },
                        { fontSize: 13 },
                        { fontWeight: 'medium' },
                        { color: '#FFFFFF' },
                      ],
                    },
                  ],
                },
              ],
            },

            // Mini bar chart for volume
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 6 }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: 'Volume Trend' }, { fontSize: 10 }, { color: '#8E8E93' }],
                },
                {
                  type: 'chart',
                  properties: [
                    { type: 'bar' },
                    { data: '{{volumeData}}' as any },
                    { width: 300 },
                    { height: 25 },
                    { color: '#48484A' },
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
                  type: 'text',
                  properties: [{ text: '₿' }, { fontSize: 20 }, { color: '#F7931A' }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'BTC' }, { fontSize: 10 }, { color: '#8E8E93' }],
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
                    { text: '${{currentPrice}}' },
                    { fontSize: 14 },
                    { fontWeight: 'bold' },
                    { color: '#FFFFFF' },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{changeText}}' },
                    { fontSize: 10 },
                    { color: '{{trendColor}}' as any },
                    { fontWeight: 'medium' },
                  ],
                },
              ],
            },
            center: {
              type: 'text',
              properties: [{ text: 'Bitcoin' }, { fontSize: 12 }, { fontWeight: 'medium' }, { color: '#FFFFFF' }],
            },
            bottom: {
              type: 'chart',
              properties: [
                { type: 'area' },
                { data: '{{chartData}}' as any },
                { width: 250 },
                { height: 30 },
                { color: '{{chartColor}}' as any },
                { fillColor: '{{chartColor}}' as any },
                { strokeWidth: 1 },
                { smooth: true },
              ],
            },
          },
          compactLeading: {
            type: 'text',
            properties: [{ text: '₿' }, { fontSize: 16 }, { color: '#F7931A' }],
          },
          compactTrailing: {
            type: 'container',
            properties: [{ direction: 'horizontal' }, { spacing: 2 }],
            children: [
              {
                type: 'text',
                properties: [
                  { text: '${{compactPrice}}' },
                  { fontSize: 12 },
                  { fontWeight: 'semibold' },
                  { color: '#FFFFFF' },
                ],
              },
              {
                type: 'image',
                properties: [
                  { systemName: '{{trendIcon}}' },
                  { color: '{{trendColor}}' as any },
                  { width: 10 },
                  { height: 10 },
                ],
              },
            ],
          },
          minimal: {
            type: 'image',
            properties: [
              { systemName: '{{trendIcon}}' },
              { color: '{{trendColor}}' as any },
              { width: 12 },
              { height: 12 },
            ],
          },
        },
        data: this.generateCryptoData(currentData, change, changePercent),
        behavior: {
          systemActionForegroundColor: '#F7931A',
          widgetUrl: 'crypto://btc',
          keyLineTint: '#F7931A',
        },
      };

      const result = await LiveActivities.startActivity(activityData);
      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Crypto Tracker iniciado! ₿');
    } catch (error) {
      console.error('Error starting crypto tracker:', error);
      this.liveActivitiesService.showToast('Erro ao iniciar tracker', 'danger');
    }
  }

  async updatePrice() {
    this.currentPriceIndex = (this.currentPriceIndex + 1) % this.priceData.length;
    const currentData = this.priceData[this.currentPriceIndex];
    const prevPrice =
      this.priceData[(this.currentPriceIndex - 1 + this.priceData.length) % this.priceData.length].price;
    const change = currentData.price - prevPrice;
    const changePercent = (change / prevPrice) * 100;

    const updateData = this.generateCryptoData(currentData, change, changePercent);

    await this.liveActivitiesService.updateActivity(
      updateData,
      'Price Updated',
      `BTC: $${currentData.price.toLocaleString()}`,
    );
  }

  private generateCryptoData(priceInfo: any, change: number, changePercent: number) {
    const isPositive = change >= 0;
    const high = Math.max(...priceInfo.data);
    const low = Math.min(...priceInfo.data);

    // Generate volume data (simulated)
    const volumeData = [25, 30, 28, 35, 32, 40, 38];

    return {
      currentPrice: priceInfo.price.toLocaleString(),
      compactPrice: (priceInfo.price / 1000).toFixed(1) + 'K',
      chartData: priceInfo.data.join(','),
      chartColor: isPositive ? '#34C759' : '#FF3B30',
      trendIcon: isPositive ? 'triangle.fill' : 'triangle.fill',
      trendColor: isPositive ? '#34C759' : '#FF3B30',
      changeText: `${isPositive ? '+' : ''}$${Math.abs(change).toFixed(0)} (${changePercent.toFixed(1)}%)`,
      highPrice: high.toLocaleString(),
      lowPrice: low.toLocaleString(),
      volume: '$2.4B',
      marketCap: '$845B',
      volumeData: volumeData.join(','),
    };
  }

  async endTracker() {
    await this.liveActivitiesService.endActivity({
      currentPrice: 'Finalizado',
    });
    this.currentPriceIndex = 0;
  }
}
