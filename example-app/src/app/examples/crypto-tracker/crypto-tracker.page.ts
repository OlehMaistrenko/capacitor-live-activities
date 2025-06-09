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
import { LiveActivities } from 'capacitor-live-activities';
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

      const activityData = {
        layout: {
          id: 'crypto-tracker',
          type: 'container' as const,
          properties: [
            { direction: 'vertical' as const },
            { spacing: 16 },
            { padding: 20 },
            { backgroundColor: '#000000' },
            { cornerRadius: 16 },
          ],
          children: [
            // Header with crypto info
            {
              id: 'header',
              type: 'container' as const,
              properties: [{ direction: 'horizontal' as const }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'crypto-icon',
                  type: 'text' as const,
                  properties: [{ text: '₿' }, { fontSize: 24 }, { color: '#F7931A' }],
                },
                {
                  id: 'crypto-info',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'crypto-name',
                      type: 'text' as const,
                      properties: [
                        { text: 'Bitcoin' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      id: 'crypto-symbol',
                      type: 'text' as const,
                      properties: [{ text: 'BTC/USD' }, { fontSize: 12 }, { color: '#8E8E93' }],
                    },
                  ],
                },
                {
                  id: 'price-container',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }, { insideAlignment: 'trailing' }],
                  children: [
                    {
                      id: 'current-price',
                      type: 'text' as const,
                      properties: [
                        { text: '${{currentPrice}}' },
                        { fontSize: 18 },
                        { fontWeight: 'bold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      id: 'price-change',
                      type: 'container' as const,
                      properties: [{ direction: 'horizontal' as const }, { spacing: 4 }, { insideAlignment: 'center' }],
                      children: [
                        {
                          id: 'trend-icon',
                          type: 'image' as const,
                          properties: [
                            { systeName: '{{trendIcon}}' },
                            { color: '{{trendColor}}' },
                            { width: 12 },
                            { height: 12 },
                          ],
                        },
                        {
                          id: 'change-amount',
                          type: 'text' as const,
                          properties: [
                            { text: '{{changeText}}' },
                            { fontSize: 12 },
                            { color: '{{trendColor}}' },
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
              id: 'price-chart-section',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 8 }],
              children: [
                {
                  id: 'chart-header',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 8 }],
                  children: [
                    {
                      id: 'chart-label',
                      type: 'text' as const,
                      properties: [{ text: '24H Chart' }, { fontSize: 12 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'chart-period',
                      type: 'text' as const,
                      properties: [{ text: 'Last 7 points' }, { fontSize: 10 }, { color: '#48484A' }],
                    },
                  ],
                },
                {
                  id: 'main-chart',
                  type: 'chart' as const,
                  properties: [
                    { type: 'area' },
                    { data: '{{chartData}}' },
                    { width: 300 },
                    { height: 60 },
                    { color: '{{chartColor}}' },
                    { fillColor: '{{chartColor}}' },
                    { strokeWidth: 2 },
                    { smooth: true },
                  ],
                },
              ],
            },

            // Stats Row
            {
              id: 'stats-row',
              type: 'container' as const,
              properties: [
                { direction: 'horizontal' as const },
                { spacing: 12 },
                { padding: 12 },
                { backgroundColor: '#1C1C1E' },
                { cornerRadius: 8 },
              ],
              children: [
                {
                  id: 'high-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'high-label',
                      type: 'text' as const,
                      properties: [{ text: '24H HIGH' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'high-value',
                      type: 'text' as const,
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
                  id: 'low-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'low-label',
                      type: 'text' as const,
                      properties: [{ text: '24H LOW' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'low-value',
                      type: 'text' as const,
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
                  id: 'volume-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'volume-label',
                      type: 'text' as const,
                      properties: [{ text: 'VOLUME' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'volume-value',
                      type: 'text' as const,
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
                  id: 'market-cap-stat',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'market-cap-label',
                      type: 'text' as const,
                      properties: [{ text: 'MARKET CAP' }, { fontSize: 9 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'market-cap-value',
                      type: 'text' as const,
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
              id: 'volume-chart-section',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 6 }],
              children: [
                {
                  id: 'volume-chart-label',
                  type: 'text' as const,
                  properties: [{ text: 'Volume Trend' }, { fontSize: 10 }, { color: '#8E8E93' }],
                },
                {
                  id: 'volume-chart',
                  type: 'chart' as const,
                  properties: [
                    { type: 'bar' },
                    { data: '{{volumeData}}' },
                    { width: 300 },
                    { height: 25 },
                    { color: '#48484A' },
                  ],
                },
              ],
            },
          ],
        },
        data: this.generateCryptoData(currentData, change, changePercent),
        behavior: {
          systemActionForegroundColor: '#F7931A',
          widgetUrl: 'crypto://btc',
          keyLineTint: '#F7931A',
        },
      };

      const result = await LiveActivities.startActivity(activityData as any);
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
