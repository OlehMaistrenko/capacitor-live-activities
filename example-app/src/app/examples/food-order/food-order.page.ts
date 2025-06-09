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
  IonItem,
  IonLabel,
  IonList,
  IonChip,
  IonIcon,
} from '@ionic/angular/standalone';
import { LiveActivities } from 'capacitor-live-activities';
import { LiveActivitiesService } from '../../services/live-activities.service';
import { playCircle, refresh, stopCircle, checkmark, time, restaurant } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-food-order',
  templateUrl: './food-order.page.html',
  styleUrls: ['./food-order.page.scss'],
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
    IonItem,
    IonLabel,
    IonList,
    IonChip,
    FaIconComponent,
  ],
})
export class FoodOrderPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle, checkmark, time, restaurant });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  private foodOrderLayoutId: string | null = null;

  async startFoodOrderExample() {
    try {
      const estimatedDelivery = Date.now() + 35 * 60 * 1000; // 35 minutes from now

      // Complete original layout
      const activityData = {
        layout: {
          id: 'order',
          type: 'container' as const,
          properties: [
            { direction: 'vertical' as const },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#fff' },
            { cornerRadius: 16 },
          ],
          children: [
            {
              id: 'header',
              type: 'container' as const,
              properties: [{ direction: 'horizontal' as const }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'icon',
                  type: 'image' as const,
                  properties: [
                    { systeName: 'fork.knife.circle.fill' },
                    { color: '#FF6B35' },
                    { width: 32 },
                    { height: 32 },
                  ],
                },
                {
                  id: 'info',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'name',
                      type: 'text' as const,
                      properties: [{ text: '{{restaurantName}}' }, { fontSize: 16 }, { fontWeight: 'semibold' }],
                    },
                    {
                      id: 'num',
                      type: 'text' as const,
                      properties: [{ text: '#{{orderNumber}}' }, { fontSize: 12 }, { color: '#666' }],
                    },
                  ],
                },
                {
                  id: 'badge',
                  type: 'container' as const,
                  properties: [
                    { direction: 'horizontal' as const },
                    { spacing: 4 },
                    { padding: 6 },
                    { backgroundColor: '{{statusColor}}' },
                    { cornerRadius: 12 },
                  ] as any,
                  children: [
                    {
                      id: 'si',
                      type: 'image' as const,
                      properties: [{ systeName: '{{statusIcon}}' }, { color: '#fff' }, { width: 12 }, { height: 12 }],
                    },
                    {
                      id: 'st',
                      type: 'text' as const,
                      properties: [{ text: '{{statusText}}' }, { fontSize: 10 }, { color: '#fff' }],
                    },
                  ],
                },
              ],
            },
            {
              id: 'prog',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 8 }],
              children: [
                {
                  id: 'label',
                  type: 'text' as const,
                  properties: [{ text: '{{progressLabel}}' }, { fontSize: 12 }, { color: '#666' }],
                },
                {
                  id: 'bar',
                  type: 'progress' as const,
                  properties: [
                    { value: '{{progressValue}}' },
                    { total: 1.0 },
                    { color: '#FF6B35' },
                    { height: 6 },
                  ] as any,
                },
                {
                  id: 'stages',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 8 }],
                  children: [
                    {
                      id: 's1',
                      type: 'container' as const,
                      properties: [{ direction: 'vertical' as const }, { spacing: 4 }],
                      children: [
                        {
                          id: 's1i',
                          type: 'image' as const,
                          properties: [
                            { systeName: 'checkmark.circle.fill' },
                            { color: '#34C759' },
                            { width: 16 },
                            { height: 16 },
                          ],
                        },
                        {
                          id: 's1l',
                          type: 'text' as const,
                          properties: [{ text: 'Order' }, { fontSize: 9 }, { color: '#34C759' }],
                        },
                      ],
                    },
                    {
                      id: 's2',
                      type: 'container' as const,
                      properties: [{ direction: 'vertical' as const }, { spacing: 4 }],
                      children: [
                        {
                          id: 's2i',
                          type: 'image' as const,
                          properties: [
                            { systeName: '{{stage2Icon}}' },
                            { color: '{{stage2Color}}' },
                            { width: 16 },
                            { height: 16 },
                          ] as any,
                        },
                        {
                          id: 's2l',
                          type: 'text' as const,
                          properties: [{ text: 'Preparation' }, { fontSize: 9 }, { color: '{{stage2Color}}' }] as any,
                        },
                      ],
                    },
                    {
                      id: 's3',
                      type: 'container' as const,
                      properties: [{ direction: 'vertical' as const }, { spacing: 4 }],
                      children: [
                        {
                          id: 's3i',
                          type: 'image' as const,
                          properties: [
                            { systeName: '{{stage3Icon}}' },
                            { color: '{{stage3Color}}' },
                            { width: 16 },
                            { height: 16 },
                          ] as any,
                        },
                        {
                          id: 's3l',
                          type: 'text' as const,
                          properties: [{ text: 'Delivery' }, { fontSize: 9 }, { color: '{{stage3Color}}' }] as any,
                        },
                      ],
                    },
                    {
                      id: 's4',
                      type: 'container' as const,
                      properties: [{ direction: 'vertical' as const }, { spacing: 4 }],
                      children: [
                        {
                          id: 's4i',
                          type: 'image' as const,
                          properties: [
                            { systeName: '{{stage4Icon}}' },
                            { color: '{{stage4Color}}' },
                            { width: 16 },
                            { height: 16 },
                          ] as any,
                        },
                        {
                          id: 's4l',
                          type: 'text' as const,
                          properties: [{ text: 'Delivered' }, { fontSize: 9 }, { color: '{{stage4Color}}' }] as any,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'bottom',
              type: 'container' as const,
              properties: [{ direction: 'horizontal' as const }, { spacing: 16 }],
              children: [
                {
                  id: 'time',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 6 }],
                  children: [
                    {
                      id: 'clock',
                      type: 'image' as const,
                      properties: [{ systeName: 'clock' }, { color: '#666' }, { width: 14 }, { height: 14 }],
                    },
                    {
                      id: 'timer',
                      type: 'timer' as const,
                      properties: [
                        { endTime: '{{deliveryTime}}' },
                        { style: 'relative' },
                        { fontSize: 12 },
                        { color: '#666' },
                      ] as any,
                    },
                  ],
                },
                {
                  id: 'total',
                  type: 'text' as const,
                  properties: [{ text: '{{totalAmount}}' }, { fontSize: 12 }, { fontWeight: 'semibold' }],
                },
              ],
            },
          ],
        },
        data: {
          restaurantName: 'Italian Pizzeria',
          orderNumber: '1247',
          statusText: 'PREPARING',
          statusColor: '#FF9500',
          statusIcon: 'flame.fill',
          progressLabel: 'Your order is being prepared',
          progressValue: 0.3,
          totalAmount: 'R$ 42,90',
          deliveryTime: estimatedDelivery,
          stage2Icon: 'flame.fill',
          stage2Color: '#FF9500',
          stage3Icon: 'circle',
          stage3Color: '#8E8E93',
          stage4Icon: 'circle',
          stage4Color: '#8E8E93',
        },
        behavior: {
          systemActionForegroundColor: '#FF6B35',
          widgetUrl: 'https://example.com/order/1247',
          keyLineTint: '#FF6B35',
        },
      };

      const result = await LiveActivities.startActivity(activityData as any);

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Food order started!');
    } catch (error) {
      console.error('Error starting food order:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateToPreparing() {
    await this.liveActivitiesService.updateActivity(
      {
        statusText: 'PREPARING',
        statusColor: '#FF9500',
        statusIcon: 'flame.fill',
        progressValue: 0.5,
        stage2Icon: 'flame.fill',
        stage2Color: '#FF9500',
        stage3Icon: 'circle',
        stage3Color: '#8E8E93',
        stage4Icon: 'circle',
        stage4Color: '#8E8E93',
      },
      'Preparing Order',
      'Your food is being prepared!',
    );
  }

  async updateToReadyForDelivery() {
    await this.liveActivitiesService.updateActivity(
      {
        statusText: 'OUT FOR DELIVERY',
        statusColor: '#007AFF',
        statusIcon: 'bicycle',
        progressValue: 0.75,
        stage2Icon: 'checkmark.circle.fill',
        stage2Color: '#34C759',
        stage3Icon: 'bicycle',
        stage3Color: '#007AFF',
        stage4Icon: 'circle',
        stage4Color: '#8E8E93',
      },
      'Out for Delivery',
      'Your order is on the way!',
    );
  }

  async updateToDelivered() {
    await this.liveActivitiesService.updateActivity(
      {
        statusText: 'DELIVERED',
        statusColor: '#34C759',
        statusIcon: 'checkmark.circle.fill',
        progressValue: 1.0,
        stage2Icon: 'checkmark.circle.fill',
        stage2Color: '#34C759',
        stage3Icon: 'checkmark.circle.fill',
        stage3Color: '#34C759',
        stage4Icon: 'checkmark.circle.fill',
        stage4Color: '#34C759',
      },
      'Order Delivered!',
      'Enjoy your meal! Rate your experience.',
    );
  }

  async endOrder() {
    await this.liveActivitiesService.endActivity({
      statusText: 'COMPLETED',
      progressValue: 1.0,
    });
  }
}
