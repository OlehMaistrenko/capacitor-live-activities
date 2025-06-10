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
  selector: 'app-progress-examples',
  templateUrl: './progress-examples.page.html',
  styleUrls: ['./progress-examples.page.scss'],
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
export class ProgressExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startBasicProgressExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#f0f0f0' },
            { cornerRadius: 12 },
          ],
          children: [
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'arrow.down.circle.fill' },
                    { color: '#007AFF' },
                    { width: 24 },
                    { height: 24 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontSize: 16 }, { fontWeight: 'medium' }, { color: '#1a1a1a' }],
                },
              ],
            },
            {
              type: 'progress',
              properties: [
                { value: 0.65 },
                { total: 1.0 },
                { color: '#007AFF' },
                { backgroundColor: '#E5E5EA' },
                { height: 8 },
              ],
            },
            {
              type: 'text',
              properties: [
                { text: '{{progressText}}' },
                { fontSize: 12 },
                { color: '#666666' },
                { alignment: 'center' },
                { monospacedDigit: true },
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
                    { systemName: 'arrow.down.circle.fill' },
                    { color: '#007AFF' },
                    { width: 20 },
                    { height: 20 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Download' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            trailing: {
              type: 'text',
              properties: [
                { text: '{{progressText}}' },
                { fontSize: 12 },
                { fontWeight: 'semibold' },
                { color: '#FFFFFF' },
              ],
            },
            center: {
              type: 'text',
              properties: [{ text: '{{title}}' }, { fontSize: 11 }, { fontWeight: 'medium' }, { color: '#FFFFFF' }],
            },
            bottom: {
              type: 'progress',
              properties: [{ value: 0.65 }, { total: 1.0 }, { color: '#007AFF' }, { height: 4 }],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'arrow.down.circle.fill' }, { color: '#007AFF' }, { width: 16 }, { height: 16 }],
          },
          compactTrailing: {
            type: 'text',
            properties: [{ text: '65%' }, { fontSize: 12 }, { fontWeight: 'semibold' }, { color: '#FFFFFF' }],
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'arrow.down.circle.fill' }, { color: '#007AFF' }, { width: 12 }, { height: 12 }],
          },
        },
        data: {
          title: 'Download Progress',
          progressText: '65% Complete',
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Basic progress example started!');
    } catch (error) {
      console.error('Error starting basic progress example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startMultipleProgressExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 16 },
            { padding: 20 },
            { backgroundColor: '#ffffff' },
            { cornerRadius: 16 },
            { borderWidth: 1 },
            { borderColor: '#e5e5e5' },
          ],
          children: [
            {
              type: 'text',
              properties: [
                { text: '{{title}}' },
                { fontSize: 18 },
                { fontWeight: 'bold' },
                { color: '#1a1a1a' },
                { alignment: 'center' },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 6 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: 'cpu' }, { color: '#FF6B35' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: 'CPU Usage' },
                        { fontSize: 14 },
                        { fontWeight: 'medium' },
                        { color: '#1a1a1a' },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{cpuUsage}}' },
                        { fontSize: 14 },
                        { fontWeight: 'bold' },
                        { color: '#FF6B35' },
                        { alignment: 'trailing' },
                      ],
                    },
                  ],
                },
                {
                  type: 'progress',
                  properties: [
                    { value: 0.42 },
                    { total: 1.0 },
                    { color: '#FF6B35' },
                    { backgroundColor: '#F0F0F0' },
                    { height: 6 },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 6 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: 'memorychip' }, { color: '#34C759' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: 'Memory' },
                        { fontSize: 14 },
                        { fontWeight: 'medium' },
                        { color: '#1a1a1a' },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{memoryUsage}}' },
                        { fontSize: 14 },
                        { fontWeight: 'bold' },
                        { color: '#34C759' },
                        { alignment: 'trailing' },
                      ],
                    },
                  ],
                },
                {
                  type: 'progress',
                  properties: [
                    { value: 0.78 },
                    { total: 1.0 },
                    { color: '#34C759' },
                    { backgroundColor: '#F0F0F0' },
                    { height: 6 },
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
                  properties: [{ systemName: 'cpu' }, { color: '#FF6B35' }, { width: 18 }, { height: 18 }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'CPU' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            trailing: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 2 }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'memorychip' }, { color: '#34C759' }, { width: 18 }, { height: 18 }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'RAM' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            center: {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 8 }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: '{{cpuUsage}}' },
                    { fontSize: 12 },
                    { fontWeight: 'semibold' },
                    { color: '#FF6B35' },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '|' }, { fontSize: 12 }, { color: '#8E8E93' }],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{memoryUsage}}' },
                    { fontSize: 12 },
                    { fontWeight: 'semibold' },
                    { color: '#34C759' },
                  ],
                },
              ],
            },
            bottom: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 3 }],
              children: [
                {
                  type: 'progress',
                  properties: [{ value: 0.42 }, { total: 1.0 }, { color: '#FF6B35' }, { height: 3 }],
                },
                {
                  type: 'progress',
                  properties: [{ value: 0.78 }, { total: 1.0 }, { color: '#34C759' }, { height: 3 }],
                },
              ],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'cpu' }, { color: '#FF6B35' }, { width: 16 }, { height: 16 }],
          },
          compactTrailing: {
            type: 'container',
            properties: [{ direction: 'horizontal' }, { spacing: 3 }],
            children: [
              {
                type: 'text',
                properties: [{ text: '42%' }, { fontSize: 11 }, { fontWeight: 'semibold' }, { color: '#FF6B35' }],
              },
              {
                type: 'text',
                properties: [{ text: '78%' }, { fontSize: 11 }, { fontWeight: 'semibold' }, { color: '#34C759' }],
              },
            ],
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'cpu' }, { color: '#FF6B35' }, { width: 12 }, { height: 12 }],
          },
        },
        data: {
          title: 'System Monitor',
          cpuUsage: '42%',
          memoryUsage: '78%',
        },
        behavior: {
          systemActionForegroundColor: '#FF6B35',
          widgetUrl: 'https://example.com',
          keyLineTint: '#FF6B35',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Multiple progress example started!');
    } catch (error) {
      console.error('Error starting multiple progress example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startUploadProgressExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'horizontal' },
            { spacing: 16 },
            { padding: 16 },
            { backgroundColor: '#2C3E50' },
            { cornerRadius: 12 },
            { insideAlignment: 'center' },
          ],
          children: [
            {
              type: 'image',
              properties: [{ systemName: 'arrow.up.circle.fill' }, { color: '#3498DB' }, { width: 40 }, { height: 40 }],
            },
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'text',
                      properties: [
                        { text: '{{fileName}}' },
                        { fontSize: 14 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{uploadPercentage}}' },
                        { fontSize: 12 },
                        { fontWeight: 'medium' },
                        { color: '#3498DB' },
                        { alignment: 'trailing' },
                      ],
                    },
                  ],
                },
                {
                  type: 'progress',
                  properties: [
                    { value: 0.85 },
                    { total: 1.0 },
                    { color: '#3498DB' },
                    { backgroundColor: '#34495E' },
                    { height: 4 },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{uploadSpeed}}' },
                    { fontSize: 11 },
                    { color: '#BDC3C7' },
                    { alignment: 'leading' },
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
                    { systemName: 'arrow.up.circle.fill' },
                    { color: '#3498DB' },
                    { width: 20 },
                    { height: 20 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Upload' }, { fontSize: 9 }, { color: '#8E8E93' }],
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
                    { text: '{{uploadPercentage}}' },
                    { fontSize: 14 },
                    { fontWeight: 'bold' },
                    { color: '#FFFFFF' },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '2.1 MB/s' }, { fontSize: 9 }, { color: '#3498DB' }],
                },
              ],
            },
            center: {
              type: 'text',
              properties: [{ text: '{{fileName}}' }, { fontSize: 10 }, { fontWeight: 'medium' }, { color: '#FFFFFF' }],
            },
            bottom: {
              type: 'progress',
              properties: [{ value: 0.85 }, { total: 1.0 }, { color: '#3498DB' }, { height: 4 }],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'arrow.up.circle.fill' }, { color: '#3498DB' }, { width: 16 }, { height: 16 }],
          },
          compactTrailing: {
            type: 'text',
            properties: [{ text: '85%' }, { fontSize: 12 }, { fontWeight: 'semibold' }, { color: '#FFFFFF' }],
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'arrow.up.circle.fill' }, { color: '#3498DB' }, { width: 12 }, { height: 12 }],
          },
        },
        data: {
          fileName: 'project_files.zip',
          uploadPercentage: '85%',
          uploadSpeed: '2.1 MB/s • 30s remaining',
        },
        behavior: {
          systemActionForegroundColor: '#3498DB',
          widgetUrl: 'https://example.com',
          keyLineTint: '#3498DB',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Upload progress example started!');
    } catch (error) {
      console.error('Error starting upload progress example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startBatteryProgressExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 18 },
            { backgroundColor: '#1C1C1E' },
            { cornerRadius: 14 },
          ],
          children: [
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 10 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'battery.75' }, { color: '#30D158' }, { width: 28 }, { height: 28 }],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{batteryTitle}}' },
                    { fontSize: 16 },
                    { fontWeight: 'semibold' },
                    { color: '#FFFFFF' },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'progress',
                  properties: [
                    { value: 0.75 },
                    { total: 1.0 },
                    { color: '#30D158' },
                    { backgroundColor: '#2C2C2E' },
                    { height: 12 },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{batteryPercent}}' },
                    { fontSize: 16 },
                    { fontWeight: 'bold' },
                    { color: '#30D158' },
                    { monospacedDigit: true },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 6 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'bolt.fill' }, { color: '#FFCC02' }, { width: 12 }, { height: 12 }],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{chargingStatus}}' }, { fontSize: 12 }, { color: '#8E8E93' }],
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
                  properties: [{ systemName: 'battery.75' }, { color: '#30D158' }, { width: 20 }, { height: 20 }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Battery' }, { fontSize: 9 }, { color: '#8E8E93' }],
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
                    { text: '{{batteryPercent}}' },
                    { fontSize: 14 },
                    { fontWeight: 'bold' },
                    { color: '#30D158' },
                  ],
                },
                {
                  type: 'image',
                  properties: [{ systemName: 'bolt.fill' }, { color: '#FFCC02' }, { width: 12 }, { height: 12 }],
                },
              ],
            },
            center: {
              type: 'text',
              properties: [{ text: 'Charging' }, { fontSize: 11 }, { fontWeight: 'medium' }, { color: '#FFFFFF' }],
            },
            bottom: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  type: 'progress',
                  properties: [{ value: 0.75 }, { total: 1.0 }, { color: '#30D158' }, { height: 4 }],
                },
                {
                  type: 'text',
                  properties: [{ text: '1h 20m until full' }, { fontSize: 10 }, { color: '#8E8E93' }],
                },
              ],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'battery.75' }, { color: '#30D158' }, { width: 16 }, { height: 16 }],
          },
          compactTrailing: {
            type: 'container',
            properties: [{ direction: 'horizontal' }, { spacing: 3 }],
            children: [
              {
                type: 'text',
                properties: [{ text: '75%' }, { fontSize: 12 }, { fontWeight: 'semibold' }, { color: '#30D158' }],
              },
              {
                type: 'image',
                properties: [{ systemName: 'bolt.fill' }, { color: '#FFCC02' }, { width: 10 }, { height: 10 }],
              },
            ],
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'bolt.fill' }, { color: '#FFCC02' }, { width: 12 }, { height: 12 }],
          },
        },
        data: {
          batteryTitle: 'Battery Status',
          batteryPercent: '75%',
          chargingStatus: 'Charging • 1h 20m until full',
        },
        behavior: {
          systemActionForegroundColor: '#30D158',
          widgetUrl: 'https://example.com',
          keyLineTint: '#30D158',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Battery progress example started!');
    } catch (error) {
      console.error('Error starting battery progress example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateActivity() {
    await this.liveActivitiesService.updateActivity(
      {
        title: 'Updated Progress',
        progressText: '85% Complete',
        cpuUsage: '38%',
        memoryUsage: '82%',
        fileName: 'updated_file.zip',
        uploadPercentage: '95%',
        uploadSpeed: '3.2 MB/s • 15s remaining',
        batteryPercent: '85%',
        chargingStatus: 'Charging • 45m until full',
      },
      'Progress Updated',
      'Live Activity progress has been updated',
    );
  }

  async endActivity() {
    await this.liveActivitiesService.endActivity({
      title: 'Progress Completed',
      progressText: '100% Complete',
      status: 'Completed',
    });
  }
}
