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
import { LiveActivities, LiveActivitiesOptions } from 'capacitor-live-activities';
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
      const activityData: LiveActivitiesOptions = {
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#fff' },
            { cornerRadius: 16 },
          ],
          children: [
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'fork.knife.circle.fill' },
                    { color: '#FF6B35' },
                    { width: 32 },
                    { height: 32 },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: '{{restaurantName}}' }, { fontSize: 16 }, { fontWeight: 'semibold' }],
                    },
                    {
                      type: 'text',
                      properties: [{ text: '#{{orderNumber}}' }, { fontSize: 12 }, { color: '#666' }],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [
                    { direction: 'horizontal' },
                    { spacing: 4 },
                    { padding: 6 },
                    { backgroundColor: '{{statusColor}}' as any },
                    { cornerRadius: 12 },
                  ],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: '{{statusIcon}}' }, { color: '#fff' }, { width: 12 }, { height: 12 }],
                    },
                    {
                      type: 'text',
                      properties: [{ text: '{{statusText}}' }, { fontSize: 10 }, { color: '#fff' }],
                    },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: '{{progressLabel}}' }, { fontSize: 12 }, { color: '#666' }],
                },
                {
                  type: 'progress',
                  properties: [
                    { value: '{{progressValue}}' as any },
                    { total: 1.0 },
                    { color: '#FF6B35' },
                    { height: 6 },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }],
                  children: [
                    {
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 4 }],
                      children: [
                        {
                          type: 'image',
                          properties: [
                            { systemName: 'checkmark.circle.fill' },
                            { color: '#34C759' },
                            { width: 16 },
                            { height: 16 },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [{ text: 'Order' }, { fontSize: 9 }, { color: '#34C759' }],
                        },
                      ],
                    },
                    {
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 4 }],
                      children: [
                        {
                          type: 'image',
                          properties: [
                            { systemName: '{{stage2Icon}}' },
                            { color: '{{stage2Color}}' as any },
                            { width: 16 },
                            { height: 16 },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [{ text: 'Preparation' }, { fontSize: 9 }, { color: '{{stage2Color}}' as any }],
                        },
                      ],
                    },
                    {
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 4 }],
                      children: [
                        {
                          type: 'image',
                          properties: [
                            { systemName: '{{stage3Icon}}' },
                            { color: '{{stage3Color}}' },
                            { width: 16 },
                            { height: 16 },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [{ text: 'Delivery' }, { fontSize: 9 }, { color: '{{stage3Color}}' }],
                        },
                      ],
                    },
                    {
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 4 }],
                      children: [
                        {
                          type: 'image',
                          properties: [
                            { systemName: '{{stage4Icon}}' },
                            { color: '{{stage4Color}}' },
                            { width: 16 },
                            { height: 16 },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [{ text: 'Delivered' }, { fontSize: 9 }, { color: '{{stage4Color}}' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 6 }],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: 'clock' }, { color: '#666' }, { width: 14 }, { height: 14 }],
                    },
                    {
                      type: 'timer',
                      properties: [
                        { endTime: '{{deliveryTime}}' as any },
                        { style: 'relative' },
                        { fontSize: 12 },
                        { color: '#666' },
                      ],
                    },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{totalAmount}}' }, { fontSize: 12 }, { fontWeight: 'semibold' }],
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
                    { systemName: 'fork.knife.circle.fill' },
                    { color: '#FF6B35' },
                    { width: 20 },
                    { height: 20 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Pedido' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            trailing: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'trailing' }],
              children: [
                {
                  type: 'timer',
                  properties: [
                    { endTime: '{{deliveryTime}}' as any },
                    { style: 'relative' },
                    { fontSize: 12 },
                    { fontWeight: 'semibold' },
                    { color: '#FFFFFF' },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{statusText}}' },
                    { fontSize: 9 },
                    { color: '{{statusColor}}' as any },
                    { fontWeight: 'medium' },
                  ],
                },
              ],
            },
            center: {
              type: 'text',
              properties: [
                { text: '{{restaurantName}}' },
                { fontSize: 11 },
                { fontWeight: 'medium' },
                { color: '#FFFFFF' },
              ],
            },
            bottom: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  type: 'progress',
                  properties: [
                    { value: '{{progressValue}}' as any },
                    { total: 1.0 },
                    { color: '#FF6B35' },
                    { height: 4 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{progressLabel}}' }, { fontSize: 10 }, { color: '#8E8E93' }],
                },
              ],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'fork.knife.circle.fill' }, { color: '#FF6B35' }, { width: 16 }, { height: 16 }],
          },
          compactTrailing: {
            type: 'container',
            properties: [{ direction: 'horizontal' }, { spacing: 3 }],
            children: [
              {
                type: 'timer',
                properties: [
                  { endTime: '{{deliveryTime}}' as any },
                  { style: 'relative' },
                  { fontSize: 12 },
                  { fontWeight: 'semibold' },
                  { color: '#FFFFFF' },
                ],
              },
              {
                type: 'image',
                properties: [
                  { systemName: '{{statusIcon}}' },
                  { color: '{{statusColor}}' as any },
                  { width: 10 },
                  { height: 10 },
                ],
              },
            ],
          },
          minimal: {
            type: 'image',
            properties: [
              { systemName: '{{statusIcon}}' },
              { color: '{{statusColor}}' as any },
              { width: 12 },
              { height: 12 },
            ],
          },
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

      const result = await LiveActivities.startActivity(activityData);

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
