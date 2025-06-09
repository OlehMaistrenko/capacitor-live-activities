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
          id: 'countdown-example',
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
              id: 'title',
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
              id: 'timer',
              type: 'timer',
              properties: [
                { endTime: endTime },
                { style: 'timer' },
                { fontSize: 24 },
                { fontWeight: 'bold' },
                { color: '#ffffff' },
                { alignment: 'center' },
                { monospacedDigit: true },
              ] as any,
            },
            {
              id: 'description',
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
          id: 'relative-time-example',
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
              id: 'clock-icon',
              type: 'image',
              properties: [{ systeName: 'clock.fill' }, { color: '#ffffff' }, { width: 32 }, { height: 32 }],
            },
            {
              id: 'time-content',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  id: 'relative-timer',
                  type: 'timer',
                  properties: [
                    { endTime: endTime },
                    { style: 'relative' },
                    { fontSize: 18 },
                    { fontWeight: 'semibold' },
                    { color: '#ffffff' },
                    { alignment: 'leading' },
                  ] as any,
                },
                {
                  id: 'label',
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
        data: {
          label: 'Time until completion',
        },
        behavior: {
          systemActionForegroundColor: '#34C759',
          widgetUrl: 'https://example.com',
          keyLineTint: '#34C759',
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
          id: 'workout-timer-example',
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
              id: 'workout-header',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'workout-icon',
                  type: 'image',
                  properties: [
                    { systeName: 'figure.run.circle.fill' },
                    { color: '#FF6B35' },
                    { width: 40 },
                    { height: 40 },
                  ],
                },
                {
                  id: 'workout-info',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      id: 'workout-name',
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
                      id: 'workout-type',
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
              id: 'timer-display',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'time-remaining',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 4 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'remaining-timer',
                      type: 'timer',
                      properties: [
                        { endTime: endTime },
                        { style: 'timer' },
                        { fontSize: 28 },
                        { fontWeight: 'bold' },
                        { color: '#FF6B35' },
                        { alignment: 'center' },
                        { monospacedDigit: true },
                      ] as any,
                    },
                    {
                      id: 'remaining-label',
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
                  id: 'stats',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }],
                  children: [
                    {
                      id: 'calories',
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'center' }],
                      children: [
                        {
                          id: 'calories-value',
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
                          id: 'calories-label',
                          type: 'text',
                          properties: [{ text: 'CAL' }, { fontSize: 9 }, { color: '#8E8E93' }, { alignment: 'center' }],
                        },
                      ],
                    },
                    {
                      id: 'heart-rate',
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'center' }],
                      children: [
                        {
                          id: 'hr-value',
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
                          id: 'hr-label',
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
        data: {
          workoutName: 'Morning Run',
          workoutType: 'Outdoor Running',
          calories: '245',
          heartRate: '142',
        },
        behavior: {
          systemActionForegroundColor: '#FF6B35',
          widgetUrl: 'https://example.com',
          keyLineTint: '#FF6B35',
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
          id: 'meeting-timer-example',
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
              id: 'meeting-header',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 10 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'video-icon',
                  type: 'image',
                  properties: [{ systeName: 'video.fill' }, { color: '#ffffff' }, { width: 20 }, { height: 20 }],
                },
                {
                  id: 'meeting-title',
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
              id: 'timer-row',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'time-icon',
                  type: 'image',
                  properties: [{ systeName: 'clock' }, { color: '#ffffff' }, { width: 16 }, { height: 16 }],
                },
                {
                  id: 'meeting-timer',
                  type: 'timer',
                  properties: [
                    { endTime: endTime },
                    { style: 'timer' },
                    { fontSize: 18 },
                    { fontWeight: 'medium' },
                    { color: '#ffffff' },
                    { alignment: 'leading' },
                    { monospacedDigit: true },
                  ] as any,
                },
                {
                  id: 'status-dot',
                  type: 'image',
                  properties: [{ systeName: 'circle.fill' }, { color: '#30D158' }, { width: 8 }, { height: 8 }],
                },
                {
                  id: 'live-text',
                  type: 'text',
                  properties: [{ text: 'LIVE' }, { fontSize: 10 }, { fontWeight: 'bold' }, { color: '#30D158' }],
                },
              ],
            },
            {
              id: 'participants',
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
        data: {
          meetingTitle: 'Team Standup',
          participants: '5 participants',
        },
        behavior: {
          systemActionForegroundColor: '#5856D6',
          widgetUrl: 'https://example.com',
          keyLineTint: '#5856D6',
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
