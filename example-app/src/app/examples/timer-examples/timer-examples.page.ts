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
  selector: 'app-timer-examples',
  templateUrl: './timer-examples.page.html',
  styleUrls: ['./timer-examples.page.scss'],
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
export class TimerExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startCountdownExample() {
    try {
      const endTime = Date.now() + 15 * 60 * 1000; // 15 minutes from now

      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 8 },
            { padding: 16 },
            { backgroundColor: '#FF3B30' },
            { cornerRadius: 12 },
          ],
          children: [
            {
              type: 'text',
              properties: [
                { text: '{{title}}' },
                { fontSize: 14 },
                { fontWeight: 'medium' },
                { color: '#ffffff' },
                { alignment: 'center' },
              ],
            },
            {
              type: 'timer',
              properties: [
                { endTime: endTime },
                { style: 'timer' },
                { fontSize: 24 },
                { fontWeight: 'bold' },
                { color: '#ffffff' },
                { alignment: 'center' },
                { monospacedDigit: true },
              ],
            },
            {
              type: 'text',
              properties: [
                { text: '{{description}}' },
                { fontSize: 12 },
                { color: '#ffffff' },
                { alignment: 'center' },
                { opacity: 0.8 },
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
                  properties: [{ systemName: 'timer' }, { color: '#FF3B30' }, { width: 20 }, { height: 20 }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Timer' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            trailing: {
              type: 'timer',
              properties: [
                { endTime: endTime },
                { style: 'timer' },
                { fontSize: 14 },
                { fontWeight: 'bold' },
                { color: '#FFFFFF' },
                { monospacedDigit: true },
              ],
            },
            center: {
              type: 'text',
              properties: [{ text: '{{title}}' }, { fontSize: 11 }, { fontWeight: 'medium' }, { color: '#FFFFFF' }],
            },
            bottom: {
              type: 'text',
              properties: [{ text: '{{description}}' }, { fontSize: 10 }, { color: '#8E8E93' }],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'timer' }, { color: '#FF3B30' }, { width: 16 }, { height: 16 }],
          },
          compactTrailing: {
            type: 'timer',
            properties: [
              { endTime: endTime },
              { style: 'time' },
              { fontSize: 12 },
              { fontWeight: 'semibold' },
              { color: '#FFFFFF' },
              { monospacedDigit: true },
            ],
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'timer' }, { color: '#FF3B30' }, { width: 12 }, { height: 12 }],
          },
        },
        data: {
          title: 'Countdown Timer',
          description: '15 minutes remaining',
        },
        behavior: {
          systemActionForegroundColor: '#FF3B30',
          widgetUrl: 'https://example.com',
          keyLineTint: '#FF3B30',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Countdown timer started!');
    } catch (error) {
      console.error('Error starting countdown timer:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startRelativeTimeExample() {
    try {
      const endTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours from now

      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'horizontal' },
            { spacing: 16 },
            { padding: 16 },
            { backgroundColor: '#34C759' },
            { cornerRadius: 12 },
            { insideAlignment: 'center' },
          ],
          children: [
            {
              type: 'image',
              properties: [{ systemName: 'clock.fill' }, { color: '#ffffff' }, { width: 32 }, { height: 32 }],
            },
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  type: 'timer',
                  properties: [
                    { endTime: endTime },
                    { style: 'relative' },
                    { fontSize: 18 },
                    { fontWeight: 'semibold' },
                    { color: '#ffffff' },
                    { alignment: 'leading' },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{label}}' },
                    { fontSize: 12 },
                    { color: '#ffffff' },
                    { alignment: 'leading' },
                    { opacity: 0.9 },
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
              properties: [{ direction: 'vertical' }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontWeight: 'bold' }],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{subtitle}}' }, { fontFamily: 'footnote' }],
                },
              ],
            },
            trailing: {
              type: 'text',
              properties: [{ text: '{{status}}' }],
            },
          },
          minimal: {
            type: 'text',
            properties: [{ text: 'abc' }],
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'textformat.size' }],
          },
          compactTrailing: {
            type: 'image',
            properties: [{ systemName: 'text.aligncenter' }],
          },
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
        data: {
          label: 'Time until completion',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Relative time example started!');
    } catch (error) {
      console.error('Error starting relative time example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startWorkoutTimerExample() {
    try {
      const endTime = Date.now() + 45 * 60 * 1000; // 45 minutes from now

      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 20 },
            { backgroundColor: '#1D1D1F' },
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
                    { systemName: 'figure.run.circle.fill' },
                    { color: '#FF6B35' },
                    { width: 40 },
                    { height: 40 },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [
                        { text: '{{workoutName}}' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#ffffff' },
                        { alignment: 'leading' },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: '{{workoutType}}' },
                        { fontSize: 12 },
                        { color: '#8E8E93' },
                        { alignment: 'leading' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 4 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'timer',
                      properties: [
                        { endTime: endTime },
                        { style: 'timer' },
                        { fontSize: 28 },
                        { fontWeight: 'bold' },
                        { color: '#FF6B35' },
                        { alignment: 'center' },
                        { monospacedDigit: true },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [
                        { text: 'TIME LEFT' },
                        { fontSize: 10 },
                        { fontWeight: 'medium' },
                        { color: '#8E8E93' },
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
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'center' }],
                      children: [
                        {
                          type: 'text',
                          properties: [
                            { text: '{{calories}}' },
                            { fontSize: 16 },
                            { fontWeight: 'bold' },
                            { color: '#ffffff' },
                            { alignment: 'center' },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [{ text: 'CAL' }, { fontSize: 9 }, { color: '#8E8E93' }, { alignment: 'center' }],
                        },
                      ],
                    },
                    {
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'center' }],
                      children: [
                        {
                          type: 'text',
                          properties: [
                            { text: '{{heartRate}}' },
                            { fontSize: 16 },
                            { fontWeight: 'bold' },
                            { color: '#ffffff' },
                            { alignment: 'center' },
                          ],
                        },
                        {
                          type: 'text',
                          properties: [{ text: 'BPM' }, { fontSize: 9 }, { color: '#8E8E93' }, { alignment: 'center' }],
                        },
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
            bottom: {
              type: 'container',
              properties: [{ direction: 'vertical' }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontWeight: 'bold' }],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{subtitle}}' }, { fontFamily: 'footnote' }],
                },
              ],
            },
            trailing: {
              type: 'text',
              properties: [{ text: '{{status}}' }],
            },
          },
          minimal: {
            type: 'text',
            properties: [{ text: 'abc' }],
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'textformat.size' }],
          },
          compactTrailing: {
            type: 'image',
            properties: [{ systemName: 'text.aligncenter' }],
          },
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
        data: {
          workoutName: 'Morning Run',
          workoutType: 'Outdoor Running',
          calories: '245',
          heartRate: '142',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Workout timer started!');
    } catch (error) {
      console.error('Error starting workout timer:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startMeetingTimerExample() {
    try {
      const endTime = Date.now() + 30 * 60 * 1000; // 30 minutes from now

      const result = await LiveActivities.startActivity({
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 10 },
            { padding: 16 },
            { backgroundColor: '#5856D6' },
            { cornerRadius: 12 },
          ],
          children: [
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 10 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'video.fill' }, { color: '#ffffff' }, { width: 20 }, { height: 20 }],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{meetingTitle}}' },
                    { fontSize: 16 },
                    { fontWeight: 'semibold' },
                    { color: '#ffffff' },
                    { alignment: 'leading' },
                  ],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'clock' }, { color: '#ffffff' }, { width: 16 }, { height: 16 }],
                },
                {
                  type: 'timer',
                  properties: [
                    { endTime: endTime },
                    { style: 'timer' },
                    { fontSize: 18 },
                    { fontWeight: 'medium' },
                    { color: '#ffffff' },
                    { alignment: 'leading' },
                    { monospacedDigit: true },
                  ],
                },
                {
                  type: 'image',
                  properties: [{ systemName: 'circle.fill' }, { color: '#30D158' }, { width: 8 }, { height: 8 }],
                },
                {
                  type: 'text',
                  properties: [{ text: 'LIVE' }, { fontSize: 10 }, { fontWeight: 'bold' }, { color: '#30D158' }],
                },
              ],
            },
            {
              type: 'text',
              properties: [
                { text: '{{participants}}' },
                { fontSize: 12 },
                { color: '#ffffff' },
                { alignment: 'center' },
                { opacity: 0.9 },
              ],
            },
          ],
        },
        dynamicIslandLayout: {
          expanded: {
            bottom: {
              type: 'container',
              properties: [{ direction: 'vertical' }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: '{{title}}' }, { fontWeight: 'bold' }],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{subtitle}}' }, { fontFamily: 'footnote' }],
                },
              ],
            },
            trailing: {
              type: 'text',
              properties: [{ text: '{{status}}' }],
            },
          },
          minimal: {
            type: 'text',
            properties: [{ text: 'abc' }],
          },
          compactLeading: {
            type: 'image',
            properties: [{ systemName: 'textformat.size' }],
          },
          compactTrailing: {
            type: 'image',
            properties: [{ systemName: 'text.aligncenter' }],
          },
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
        data: {
          meetingTitle: 'Team Standup',
          participants: '5 participants',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Meeting timer started!');
    } catch (error) {
      console.error('Error starting meeting timer:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateActivity() {
    await this.liveActivitiesService.updateActivity(
      {
        title: 'Updated Timer',
        description: 'Timer has been updated',
        label: 'Updated time remaining',
        workoutName: 'Updated Workout',
        workoutType: 'Updated Activity',
        calories: '365',
        heartRate: '158',
        meetingTitle: 'Updated Meeting',
        participants: '8 participants',
      },
      'Timer Updated',
      'Live Activity timer has been updated',
    );
  }

  async endActivity() {
    await this.liveActivitiesService.endActivity({
      title: 'Timer Completed',
      description: 'This timer example has ended',
      status: 'Completed',
    });
  }
}
