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
          id: 'basic-progress-example',
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
              id: 'header',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'icon',
                  type: 'image',
                  properties: [
                    { systeName: 'arrow.down.circle.fill' },
                    { color: '#007AFF' },
                    { width: 24 },
                    { height: 24 },
                  ],
                },
                {
                  id: 'title',
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontSize: 16 }, { fontWeight: 'medium' }, { color: '#1a1a1a' }],
                },
              ],
            },
            {
              id: 'progress-bar',
              type: 'progress',
              properties: [
                { value: 0.65 },
                { total: 1.0 },
                { color: '#007AFF' },
                { backgroundColor: '#E5E5EA' },
                { height: 8 },
              ] as any,
            },
            {
              id: 'progress-text',
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
          id: 'multiple-progress-example',
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
              id: 'title',
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
              id: 'cpu-progress',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 6 }],
              children: [
                {
                  id: 'cpu-label',
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'cpu-icon',
                      type: 'image',
                      properties: [{ systeName: 'cpu' }, { color: '#FF6B35' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      id: 'cpu-text',
                      type: 'text',
                      properties: [
                        { text: 'CPU Usage' },
                        { fontSize: 14 },
                        { fontWeight: 'medium' },
                        { color: '#1a1a1a' },
                      ],
                    },
                    {
                      id: 'cpu-value',
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
                  id: 'cpu-bar',
                  type: 'progress',
                  properties: [
                    { value: 0.42 },
                    { total: 1.0 },
                    { color: '#FF6B35' },
                    { backgroundColor: '#F0F0F0' },
                    { height: 6 },
                  ] as any,
                },
              ],
            },
            {
              id: 'memory-progress',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 6 }],
              children: [
                {
                  id: 'memory-label',
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'memory-icon',
                      type: 'image',
                      properties: [{ systeName: 'memorychip' }, { color: '#34C759' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      id: 'memory-text',
                      type: 'text',
                      properties: [
                        { text: 'Memory' },
                        { fontSize: 14 },
                        { fontWeight: 'medium' },
                        { color: '#1a1a1a' },
                      ],
                    },
                    {
                      id: 'memory-value',
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
                  id: 'memory-bar',
                  type: 'progress',
                  properties: [
                    { value: 0.78 },
                    { total: 1.0 },
                    { color: '#34C759' },
                    { backgroundColor: '#F0F0F0' },
                    { height: 6 },
                  ] as any,
                },
              ],
            },
          ],
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
          id: 'upload-progress-example',
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
              id: 'upload-icon',
              type: 'image',
              properties: [{ systeName: 'arrow.up.circle.fill' }, { color: '#3498DB' }, { width: 40 }, { height: 40 }],
            },
            {
              id: 'upload-content',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  id: 'upload-info',
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'file-name',
                      type: 'text',
                      properties: [
                        { text: '{{fileName}}' },
                        { fontSize: 14 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      id: 'upload-percentage',
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
                  id: 'upload-bar',
                  type: 'progress',
                  properties: [
                    { value: 0.85 },
                    { total: 1.0 },
                    { color: '#3498DB' },
                    { backgroundColor: '#34495E' },
                    { height: 4 },
                  ] as any,
                },
                {
                  id: 'upload-speed',
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
          id: 'battery-progress-example',
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
              id: 'battery-header',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 10 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'battery-icon',
                  type: 'image',
                  properties: [{ systeName: 'battery.75' }, { color: '#30D158' }, { width: 28 }, { height: 28 }],
                },
                {
                  id: 'battery-title',
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
              id: 'battery-level',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'battery-bar',
                  type: 'progress',
                  properties: [
                    { value: 0.75 },
                    { total: 1.0 },
                    { color: '#30D158' },
                    { backgroundColor: '#2C2C2E' },
                    { height: 12 },
                  ] as any,
                },
                {
                  id: 'battery-percent',
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
              id: 'charging-info',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 6 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'charging-icon',
                  type: 'image',
                  properties: [{ systeName: 'bolt.fill' }, { color: '#FFCC02' }, { width: 12 }, { height: 12 }],
                },
                {
                  id: 'charging-text',
                  type: 'text',
                  properties: [{ text: '{{chargingStatus}}' }, { fontSize: 12 }, { color: '#8E8E93' }],
                },
              ],
            },
          ],
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
