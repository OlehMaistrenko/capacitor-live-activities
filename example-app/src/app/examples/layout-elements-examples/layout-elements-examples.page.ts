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
import { playCircle, refresh, stopCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-layout-elements-examples',
  templateUrl: './layout-elements-examples.page.html',
  styleUrls: ['./layout-elements-examples.page.scss'],
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
export class LayoutElementsExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startSpacerExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { padding: 16 },
            { backgroundColor: '#f0f0f5' },
            { cornerRadius: 12 },
          ],
          children: [
            {
              type: 'text',
              properties: [
                { text: '{{title}}' },
                { fontSize: 16 },
                { fontWeight: 'bold' },
                { color: '#8b5cf6' },
                { alignment: 'center' },
              ],
            },
            {
              type: 'spacer',
              properties: [{ minLength: 8 }],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: 'Start' }, { fontSize: 14 }, { color: '#6b7280' }],
                },
                {
                  type: 'spacer',
                  properties: [{ minLength: -1 }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'End' }, { fontSize: 14 }, { color: '#6b7280' }],
                },
              ],
            },
            {
              type: 'spacer',
              properties: [{ minLength: 16 }],
            },
            {
              type: 'text',
              properties: [
                { text: '{{status}}' },
                { fontSize: 12 },
                { color: '#10b981' },
                { alignment: 'center' },
                { fontWeight: 'medium' },
              ],
            },
          ],
        },
        dynamicIslandLayout: {
          expanded: {
            bottom: {
              type: 'container',
              properties: [{ direction: 'horizontal' }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontWeight: 'bold' }],
                },
                {
                  type: 'spacer',
                },
                {
                  type: 'text',
                  properties: [{ text: '{{status}}' }, { fontSize: 12 }],
                },
              ],
            },
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'arrow.up.arrow.down' }],
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'arrow.up.arrow.down' }],
          },
          compactTrailing: {
            type: 'text',
            properties: [{ text: 'S' }],
          },
        },
        behavior: {
          systemActionForegroundColor: '#8b5cf6',
          widgetUrl: 'https://example.com',
          keyLineTint: '#8b5cf6',
        },
        data: {
          title: 'Spacer Elements',
          status: 'Flexible Spacing',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Spacer example started!');
    } catch (error) {
      console.error('Error starting spacer example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startGaugeExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 16 },
            { padding: 20 },
            { backgroundColor: '#fefefe' },
            { cornerRadius: 16 },
          ],
          children: [
            {
              type: 'text',
              properties: [
                { text: '{{title}}' },
                { fontSize: 18 },
                { fontWeight: 'bold' },
                { color: '#6366f1' },
                { alignment: 'center' },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 20 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }],
                  children: [
                    {
                      type: 'gauge',
                      properties: [
                        { value: '{{batteryLevel}}' },
                        { minValue: 0 },
                        { maxValue: 100 },
                        { startAngle: 135 },
                        { endAngle: 45 },
                        { foregroundColor: '#10b981' },
                        { strokeWidth: 8 },
                        { showsCurrentValueLabel: true },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: 'Battery' },
                        { fontSize: 12 },
                        { color: '#6b7280' },
                        { alignment: 'center' },
                      ],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }],
                  children: [
                    {
                      type: 'gauge',
                      properties: [
                        { value: '{{progress}}' },
                        { minValue: 0 },
                        { maxValue: 100 },
                        { startAngle: 270 },
                        { endAngle: 90 },
                        { foregroundColor: '#f59e0b' },
                        { strokeWidth: 6 },
                        { showsCurrentValueLabel: true },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: 'Progress' },
                        { fontSize: 12 },
                        { color: '#6b7280' },
                        { alignment: 'center' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'gauge',
              properties: [
                { value: '{{speed}}' },
                { minValue: 0 },
                { maxValue: 200 },
                { startAngle: 180 },
                { endAngle: 0 },
                { foregroundColor: '#ef4444' },
                { strokeWidth: 10 },
                { showsCurrentValueLabel: true },
              ],
            },
            {
              type: 'text',
              properties: [
                { text: '{{status}}' },
                { fontSize: 14 },
                { color: '#374151' },
                { alignment: 'center' },
                { fontWeight: 'medium' },
              ],
            },
          ],
        },
        dynamicIslandLayout: {
          expanded: {
            bottom: {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }],
              children: [
                {
                  type: 'gauge',
                  properties: [
                    { value: '{{batteryLevel}}' },
                    { minValue: 0 },
                    { maxValue: 100 },
                    { foregroundColor: '#10b981' },
                    { strokeWidth: 4 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{batteryLevel}}%' }, { fontWeight: 'bold' }],
                },
              ],
            },
            trailing: {
              type: 'text',
              properties: [{ text: '{{progress}}%' }],
            },
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'gauge' }],
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'speedometer' }],
          },
          compactTrailing: {
            type: 'text',
            properties: [{ text: '{{batteryLevel}}' }],
          },
        },
        behavior: {
          systemActionForegroundColor: '#6366f1',
          widgetUrl: 'https://example.com',
          keyLineTint: '#6366f1',
        },
        data: {
          title: 'System Gauges',
          batteryLevel: 78,
          progress: 45,
          speed: 125,
          status: 'Monitoring Active',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Gauge example started!');
    } catch (error) {
      console.error('Error starting gauge example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startCombinedLayoutExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 18 },
            { backgroundColor: '#f9fafb' },
            { cornerRadius: 14 },
          ],
          children: [
            {
              type: 'text',
              properties: [
                { text: '{{title}}' },
                { fontSize: 17 },
                { fontWeight: 'bold' },
                { color: '#7c3aed' },
                { alignment: 'center' },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 6 }],
                  children: [
                    {
                      type: 'gauge',
                      properties: [
                        { value: '{{cpu}}' },
                        { minValue: 0 },
                        { maxValue: 100 },
                        { foregroundColor: '#8b5cf6' },
                        { strokeWidth: 6 },
                        { showsCurrentValueLabel: true },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'CPU' }, { fontSize: 11 }, { color: '#6b7280' }, { alignment: 'center' }],
                    },
                  ],
                },
                {
                  type: 'spacer',
                  properties: [{ minLength: 8 }],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 6 }],
                  children: [
                    {
                      type: 'gauge',
                      properties: [
                        { value: '{{memory}}' },
                        { minValue: 0 },
                        { maxValue: 100 },
                        { foregroundColor: '#06b6d4' },
                        { strokeWidth: 6 },
                        { showsCurrentValueLabel: true },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [{ text: 'Memory' }, { fontSize: 11 }, { color: '#6b7280' }, { alignment: 'center' }],
                    },
                  ],
                },
              ],
            },
            {
              type: 'spacer',
              properties: [{ minLength: 12 }],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: '{{status}}' },
                    { fontSize: 13 },
                    { color: '#059669' },
                    { fontWeight: 'medium' },
                  ],
                },
                {
                  type: 'spacer',
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{uptime}}' },
                    { fontSize: 12 },
                    { color: '#6b7280' },
                    { monospacedDigit: true },
                  ],
                },
              ],
            },
          ],
        },
        dynamicIslandLayout: {
          expanded: {
            bottom: {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }],
              children: [
                {
                  type: 'gauge',
                  properties: [
                    { value: '{{cpu}}' },
                    { minValue: 0 },
                    { maxValue: 100 },
                    { foregroundColor: '#8b5cf6' },
                    { strokeWidth: 3 },
                  ],
                },
                {
                  type: 'gauge',
                  properties: [
                    { value: '{{memory}}' },
                    { minValue: 0 },
                    { maxValue: 100 },
                    { foregroundColor: '#06b6d4' },
                    { strokeWidth: 3 },
                  ],
                },
              ],
            },
            trailing: {
              type: 'text',
              properties: [{ text: '{{status}}' }],
            },
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'desktopcomputer' }],
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'cpu' }],
          },
          compactTrailing: {
            type: 'text',
            properties: [{ text: '{{cpu}}' }],
          },
        },
        behavior: {
          systemActionForegroundColor: '#7c3aed',
          widgetUrl: 'https://example.com',
          keyLineTint: '#7c3aed',
        },
        data: {
          title: 'System Monitor',
          cpu: 42,
          memory: 68,
          status: 'Normal',
          uptime: '2d 14h 32m',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Combined layout example started!');
    } catch (error) {
      console.error('Error starting combined layout example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateActivity() {
    await this.liveActivitiesService.updateActivity(
      {
        title: 'Updated Layout Elements',
        batteryLevel: 89,
        progress: 67,
        speed: 156,
        status: 'Updated Status',
        cpu: 28,
        memory: 51,
        uptime: '2d 14h 45m',
      },
      'Layout Updated',
      'Layout element values have been updated',
    );
  }

  async endActivity() {
    await this.liveActivitiesService.endActivity({
      title: 'Layout Elements Completed',
      status: 'Demo Complete',
      batteryLevel: 100,
      progress: 100,
      cpu: 15,
      memory: 32,
    });
  }
}
