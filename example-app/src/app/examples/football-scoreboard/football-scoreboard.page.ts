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
  selector: 'app-football-scoreboard',
  templateUrl: './football-scoreboard.page.html',
  styleUrls: ['./football-scoreboard.page.scss'],
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
export class FootballScoreboardPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startFootballScoreboardExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'football-scoreboard',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#1D1D1F' },
            { cornerRadius: 12 },
          ],
          children: [
            {
              id: 'match-header',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'live-indicator',
                  type: 'container',
                  properties: [
                    { direction: 'horizontal' },
                    { spacing: 4 },
                    { padding: 4 },
                    { backgroundColor: '#FF3B30' },
                    { cornerRadius: 4 },
                    { insideAlignment: 'center' },
                  ],
                  children: [
                    {
                      id: 'live-dot',
                      type: 'image',
                      properties: [{ systeName: 'circle.fill' }, { color: '#ffffff' }, { width: 6 }, { height: 6 }],
                    },
                    {
                      id: 'live-text',
                      type: 'text',
                      properties: [{ text: 'LIVE' }, { fontSize: 10 }, { fontWeight: 'bold' }, { color: '#ffffff' }],
                    },
                  ],
                },
                {
                  id: 'match-time',
                  type: 'text',
                  properties: [
                    { text: '{{matchTime}}' },
                    { fontSize: 12 },
                    { fontWeight: 'medium' },
                    { color: '#ffffff' },
                  ],
                },
              ],
            },
            {
              id: 'teams-container',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'home-team',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'home-logo',
                      type: 'image',
                      properties: [
                        { systeName: 'sportscourt.fill' },
                        { color: '#007AFF' },
                        { width: 32 },
                        { height: 32 },
                      ],
                    },
                    {
                      id: 'home-name',
                      type: 'text',
                      properties: [
                        { text: '{{homeTeam}}' },
                        { fontSize: 14 },
                        { fontWeight: 'semibold' },
                        { color: '#ffffff' },
                        { alignment: 'center' },
                      ],
                    },
                  ],
                },
                {
                  id: 'score-container',
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'home-score',
                      type: 'text',
                      properties: [
                        { text: '{{homeScore}}' },
                        { fontSize: 32 },
                        { fontWeight: 'bold' },
                        { color: '#ffffff' },
                        { monospacedDigit: true },
                      ],
                    },
                    {
                      id: 'separator',
                      type: 'text',
                      properties: [{ text: ':' }, { fontSize: 24 }, { fontWeight: 'medium' }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'away-score',
                      type: 'text',
                      properties: [
                        { text: '{{awayScore}}' },
                        { fontSize: 32 },
                        { fontWeight: 'bold' },
                        { color: '#ffffff' },
                        { monospacedDigit: true },
                      ],
                    },
                  ],
                },
                {
                  id: 'away-team',
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'away-logo',
                      type: 'image',
                      properties: [
                        { systeName: 'sportscourt.fill' },
                        { color: '#FF9500' },
                        { width: 32 },
                        { height: 32 },
                      ],
                    },
                    {
                      id: 'away-name',
                      type: 'text',
                      properties: [
                        { text: '{{awayTeam}}' },
                        { fontSize: 14 },
                        { fontWeight: 'semibold' },
                        { color: '#ffffff' },
                        { alignment: 'center' },
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
            leading: {
              id: 'di-home-team',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'di-home-logo',
                  type: 'image',
                  properties: [{ systeName: 'sportscourt.fill' }, { color: '#007AFF' }, { width: 20 }, { height: 20 }],
                },
                {
                  id: 'di-home-score',
                  type: 'text',
                  properties: [
                    { text: '{{homeScore}}' },
                    { fontSize: 16 },
                    { fontWeight: 'bold' },
                    { color: '#ffffff' },
                  ],
                },
              ],
            },
            trailing: {
              id: 'di-away-team',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'di-away-logo',
                  type: 'image',
                  properties: [{ systeName: 'sportscourt.fill' }, { color: '#FF9500' }, { width: 20 }, { height: 20 }],
                },
                {
                  id: 'di-away-score',
                  type: 'text',
                  properties: [
                    { text: '{{awayScore}}' },
                    { fontSize: 16 },
                    { fontWeight: 'bold' },
                    { color: '#ffffff' },
                  ],
                },
              ],
            },
            center: {
              id: 'di-time',
              type: 'text',
              properties: [{ text: '{{matchTime}}' }, { fontSize: 12 }, { fontWeight: 'medium' }, { color: '#ffffff' }],
            },
          },
          compactLeading: {
            element: {
              id: 'di-compact-score',
              type: 'text',
              properties: [
                { text: '{{homeScore}}-{{awayScore}}' },
                { fontSize: 14 },
                { fontWeight: 'bold' },
                { color: '#ffffff' },
              ],
            },
          },
          minimal: {
            element: {
              id: 'di-minimal',
              type: 'image',
              properties: [{ systeName: 'sportscourt.fill' }, { color: '#007AFF' }, { width: 16 }, { height: 16 }],
            },
          },
        },
        data: {
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          homeScore: '2',
          awayScore: '1',
          matchTime: "67'",
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com/match',
          keyLineTint: '#007AFF',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Football scoreboard started!');
    } catch (error) {
      console.error('Error starting football scoreboard:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateScore() {
    await this.liveActivitiesService.updateActivity(
      {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        homeScore: '3',
        awayScore: '1',
        matchTime: "78'",
      },
      'Goal Scored!',
      'Real Madrid scores! 3-1',
    );
  }

  async updateHalfTime() {
    await this.liveActivitiesService.updateActivity(
      {
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        homeScore: '2',
        awayScore: '1',
        matchTime: 'HT',
      },
      'Half Time',
      'First half ends 2-1',
    );
  }

  async endMatch() {
    await this.liveActivitiesService.endActivity({
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      homeScore: '3',
      awayScore: '1',
      matchTime: 'FT',
      status: 'Match Completed',
    });
  }
}
