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
  selector: 'app-container-examples',
  templateUrl: './container-examples.page.html',
  styleUrls: ['./container-examples.page.scss'],
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
export class ContainerExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startStackLayoutExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'stack-layout-example',
          type: 'container',
          properties: [{ direction: 'stack' }, { padding: 16 }, { cornerRadius: 12 }, { height: 80 }],
          children: [
            {
              id: 'background-gradient',
              type: 'container',
              properties: [
                { direction: 'horizontal' },
                {
                  backgroundGradient: {
                    colors: ['#667eea', '#764ba2'],
                    startPoint: 'topLeading',
                    endPoint: 'bottomTrailing',
                  },
                },
                { cornerRadius: 12 },
              ],
              children: [],
            },
            {
              id: 'content-overlay',
              type: 'container',
              properties: [
                { direction: 'horizontal' },
                { spacing: 12 },
                { padding: 16 },
                { insideAlignment: 'center' },
              ],
              children: [
                {
                  id: 'overlay-icon',
                  type: 'image',
                  properties: [{ systeName: 'layers.fill' }, { color: '#ffffff' }, { width: 32 }, { height: 32 }],
                },
                {
                  id: 'overlay-text',
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontSize: 18 }, { fontWeight: 'bold' }, { color: '#ffffff' }],
                },
              ],
            },
          ],
        },
        data: {
          title: 'ZStack with Gradient',
        },
        behavior: {
          systemActionForegroundColor: '#667eea',
          widgetUrl: 'https://example.com',
          keyLineTint: '#667eea',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Stack layout example started!');
    } catch (error) {
      console.error('Error starting stack layout example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startComplexLayoutExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'complex-layout-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#ffffff' },
            { cornerRadius: 16 },
            { borderWidth: 1 },
            { borderColor: '#E5E5EA' },
          ],
          children: [
            {
              id: 'header-section',
              type: 'container',
              properties: [{ direction: 'stack' }, { height: 60 }],
              children: [
                {
                  id: 'header-background',
                  type: 'container',
                  properties: [
                    { direction: 'horizontal' },
                    {
                      backgroundGradient: {
                        colors: ['#FF6B35', '#F7931E'],
                        startPoint: 'leading',
                        endPoint: 'trailing',
                      },
                    },
                    { cornerRadius: 8 },
                  ],
                  children: [],
                },
                {
                  id: 'header-content',
                  type: 'container',
                  properties: [
                    { direction: 'horizontal' },
                    { spacing: 12 },
                    { padding: 12 },
                    { insideAlignment: 'center' },
                  ],
                  children: [
                    {
                      id: 'app-icon',
                      type: 'image',
                      properties: [
                        { systeName: 'star.circle.fill' },
                        { color: '#ffffff' },
                        { width: 32 },
                        { height: 32 },
                      ],
                    },
                    {
                      id: 'header-text',
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 2 }],
                      children: [
                        {
                          id: 'app-name',
                          type: 'text',
                          properties: [
                            { text: '{{appName}}' },
                            { fontSize: 16 },
                            { fontWeight: 'bold' },
                            { color: '#ffffff' },
                          ],
                        },
                        {
                          id: 'status',
                          type: 'text',
                          properties: [
                            { text: '{{status}}' },
                            { fontSize: 12 },
                            { color: '#ffffff' },
                            { opacity: 0.9 },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'main-content',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'top' }],
              children: [
                {
                  id: 'left-column',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }],
                  children: [
                    {
                      id: 'metric-1',
                      type: 'container',
                      properties: [
                        { direction: 'vertical' },
                        { spacing: 4 },
                        { padding: 8 },
                        { backgroundColor: '#F2F2F7' },
                        { cornerRadius: 6 },
                      ],
                      children: [
                        {
                          id: 'metric-1-value',
                          type: 'text',
                          properties: [
                            { text: '{{metric1Value}}' },
                            { fontSize: 18 },
                            { fontWeight: 'bold' },
                            { color: '#007AFF' },
                            { alignment: 'center' },
                          ],
                        },
                        {
                          id: 'metric-1-label',
                          type: 'text',
                          properties: [
                            { text: '{{metric1Label}}' },
                            { fontSize: 10 },
                            { color: '#666666' },
                            { alignment: 'center' },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'right-column',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }],
                  children: [
                    {
                      id: 'metric-2',
                      type: 'container',
                      properties: [
                        { direction: 'vertical' },
                        { spacing: 4 },
                        { padding: 8 },
                        { backgroundColor: '#F2F2F7' },
                        { cornerRadius: 6 },
                      ],
                      children: [
                        {
                          id: 'metric-2-value',
                          type: 'text',
                          properties: [
                            { text: '{{metric2Value}}' },
                            { fontSize: 18 },
                            { fontWeight: 'bold' },
                            { color: '#34C759' },
                            { alignment: 'center' },
                          ],
                        },
                        {
                          id: 'metric-2-label',
                          type: 'text',
                          properties: [
                            { text: '{{metric2Label}}' },
                            { fontSize: 10 },
                            { color: '#666666' },
                            { alignment: 'center' },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        data: {
          appName: 'Container Showcase',
          status: 'Multi-layout demo',
          metric1Value: '42',
          metric1Label: 'Score',
          metric2Value: '98%',
          metric2Label: 'Accuracy',
        },
        behavior: {
          systemActionForegroundColor: '#FF6B35',
          widgetUrl: 'https://example.com',
          keyLineTint: '#FF6B35',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Complex layout example started!');
    } catch (error) {
      console.error('Error starting complex layout example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startDashboardExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'dashboard-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 14 },
            { padding: 18 },
            { backgroundColor: '#1a1a1a' },
            { cornerRadius: 14 },
          ],
          children: [
            {
              id: 'dashboard-header',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 10 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'dashboard-icon',
                  type: 'image',
                  properties: [
                    { systeName: 'chart.line.uptrend.xyaxis' },
                    { color: '#007AFF' },
                    { width: 24 },
                    { height: 24 },
                  ],
                },
                {
                  id: 'dashboard-title',
                  type: 'text',
                  properties: [
                    { text: '{{dashboardTitle}}' },
                    { fontSize: 16 },
                    { fontWeight: 'semibold' },
                    { color: '#ffffff' },
                  ],
                },
              ],
            },
            {
              id: 'stats-grid',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }],
              children: [
                {
                  id: 'stat-1',
                  type: 'container',
                  properties: [
                    { direction: 'vertical' },
                    { spacing: 6 },
                    { padding: 12 },
                    { backgroundColor: '#2c2c2e' },
                    { cornerRadius: 8 },
                  ],
                  children: [
                    {
                      id: 'stat-1-icon',
                      type: 'image',
                      properties: [{ systeName: 'person.3.fill' }, { color: '#30D158' }, { width: 16 }, { height: 16 }],
                    },
                    {
                      id: 'stat-1-value',
                      type: 'text',
                      properties: [
                        { text: '{{users}}' },
                        { fontSize: 16 },
                        { fontWeight: 'bold' },
                        { color: '#ffffff' },
                        { alignment: 'center' },
                      ],
                    },
                    {
                      id: 'stat-1-label',
                      type: 'text',
                      properties: [{ text: 'Users' }, { fontSize: 10 }, { color: '#8e8e93' }, { alignment: 'center' }],
                    },
                  ],
                },
                {
                  id: 'stat-2',
                  type: 'container',
                  properties: [
                    { direction: 'vertical' },
                    { spacing: 6 },
                    { padding: 12 },
                    { backgroundColor: '#2c2c2e' },
                    { cornerRadius: 8 },
                  ],
                  children: [
                    {
                      id: 'stat-2-icon',
                      type: 'image',
                      properties: [
                        { systeName: 'dollarsign.circle.fill' },
                        { color: '#FFD60A' },
                        { width: 16 },
                        { height: 16 },
                      ],
                    },
                    {
                      id: 'stat-2-value',
                      type: 'text',
                      properties: [
                        { text: '{{revenue}}' },
                        { fontSize: 16 },
                        { fontWeight: 'bold' },
                        { color: '#ffffff' },
                        { alignment: 'center' },
                      ],
                    },
                    {
                      id: 'stat-2-label',
                      type: 'text',
                      properties: [
                        { text: 'Revenue' },
                        { fontSize: 10 },
                        { color: '#8e8e93' },
                        { alignment: 'center' },
                      ],
                    },
                  ],
                },
                {
                  id: 'stat-3',
                  type: 'container',
                  properties: [
                    { direction: 'vertical' },
                    { spacing: 6 },
                    { padding: 12 },
                    { backgroundColor: '#2c2c2e' },
                    { cornerRadius: 8 },
                  ],
                  children: [
                    {
                      id: 'stat-3-icon',
                      type: 'image',
                      properties: [
                        { systeName: 'arrow.up.right.circle.fill' },
                        { color: '#FF453A' },
                        { width: 16 },
                        { height: 16 },
                      ],
                    },
                    {
                      id: 'stat-3-value',
                      type: 'text',
                      properties: [
                        { text: '{{growth}}' },
                        { fontSize: 16 },
                        { fontWeight: 'bold' },
                        { color: '#ffffff' },
                        { alignment: 'center' },
                      ],
                    },
                    {
                      id: 'stat-3-label',
                      type: 'text',
                      properties: [{ text: 'Growth' }, { fontSize: 10 }, { color: '#8e8e93' }, { alignment: 'center' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        data: {
          dashboardTitle: 'Analytics Dashboard',
          users: '1.2K',
          revenue: '$5.4K',
          growth: '+12%',
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Dashboard example started!');
    } catch (error) {
      console.error('Error starting dashboard example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateActivity() {
    await this.liveActivitiesService.updateActivity(
      {
        title: 'Updated Container Layout',
        appName: 'Updated App',
        status: 'Updated layout demo',
        metric1Value: '58',
        metric1Label: 'Updated Score',
        metric2Value: '95%',
        metric2Label: 'Updated Accuracy',
        dashboardTitle: 'Updated Analytics',
        users: '1.5K',
        revenue: '$6.2K',
        growth: '+18%',
      },
      'Layout Updated',
      'Container layout has been updated',
    );
  }

  async endActivity() {
    await this.liveActivitiesService.endActivity({
      title: 'Container Example Completed',
      status: 'Layout demo completed',
    });
  }
}
