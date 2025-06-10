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
  IonIcon,
} from '@ionic/angular/standalone';
import { LiveActivities, LiveActivitiesOptions } from 'capacitor-live-activities';
import { LiveActivitiesService } from '../../services/live-activities.service';
import { playCircle, refresh, stopCircle, add, remove } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-segmented-progress-examples',
  templateUrl: './segmented-progress-examples.page.html',
  styleUrls: ['./segmented-progress-examples.page.scss'],
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
export class SegmentedProgressExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle, add, remove });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  private currentProgress = 0;
  private readonly maxSegments = 8;

  async startSegmentedProgressExample() {
    try {
      const activityData: LiveActivitiesOptions = {
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 20 },
            { padding: 20 },
            { backgroundColor: '#1C1C1E' },
            { cornerRadius: 16 },
          ],
          children: [
            // Header
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'chart.bar.fill' }, { color: '#007AFF' }, { width: 28 }, { height: 28 }],
                },
                {
                  type: 'text',
                  properties: [
                    { text: 'Segmented Progress' },
                    { fontSize: 18 },
                    { fontWeight: 'semibold' },
                    { color: '#FFFFFF' },
                  ],
                },
              ],
            },

            // Example 1: Basic Segmented Progress
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'text',
                  properties: [{ text: 'Básico ({{progress1}}/{{total1}})' }, { fontSize: 14 }, { color: '#8E8E93' }],
                },
                {
                  type: 'segmented-progress',
                  properties: [
                    { segments: '{{total1}}' as any },
                    { filled: '{{progress1}}' as any },
                    { spacing: 6 },
                    { height: 8 },
                    { cornerRadius: 4 },
                    { filledColor: '#007AFF' },
                    { unfilledColor: '#2C2C2E' },
                  ],
                },
              ],
            },

            // Example 2: With Stroke (Dashed)
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: 'Com Stroke Tracejado ({{progress2}}/{{total2}})' },
                    { fontSize: 14 },
                    { color: '#8E8E93' },
                  ],
                },
                {
                  type: 'segmented-progress',
                  properties: [
                    { segments: '{{total2}}' as any },
                    { filled: '{{progress2}}' as any },
                    { spacing: 4 },
                    { height: 6 },
                    { cornerRadius: 3 },
                    { filledColor: '#FF9500' },
                    { strokeColor: '#48484A' },
                    { strokeDashed: true },
                    { strokeWidth: 1 },
                  ],
                },
              ],
            },

            // Example 3: Different Colors and Styles
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: 'Verde Personalizado ({{progress3}}/{{total3}})' },
                    { fontSize: 14 },
                    { color: '#8E8E93' },
                  ],
                },
                {
                  type: 'segmented-progress',
                  properties: [
                    { segments: '{{total3}}' as any },
                    { filled: '{{progress3}}' as any },
                    { spacing: 3 },
                    { height: 10 },
                    { cornerRadius: 5 },
                    { filledColor: '#34C759' },
                    { unfilledColor: '#1C1C1E' },
                    { strokeColor: '#34C759' },
                    { strokeDashed: false },
                    { strokeWidth: 1 },
                  ],
                },
              ],
            },

            // Example 4: Compact Style
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: 'Estilo Compacto ({{progress4}}/{{total4}})' },
                    { fontSize: 14 },
                    { color: '#8E8E93' },
                  ],
                },
                {
                  type: 'segmented-progress',
                  properties: [
                    { segments: '{{total4}}' as any },
                    { filled: '{{progress4}}' as any },
                    { spacing: 2 },
                    { height: 4 },
                    { cornerRadius: 2 },
                    { filledColor: '#FF2D92' },
                    { unfilledColor: '#2C2C2E' },
                  ],
                },
              ],
            },

            // Current Status
            {
              type: 'container',
              properties: [
                { direction: 'horizontal' },
                { spacing: 8 },
                { padding: 12 },
                { backgroundColor: '#2C2C2E' },
                { cornerRadius: 8 },
                { insideAlignment: 'center' },
              ],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'info.circle' }, { color: '#007AFF' }, { width: 16 }, { height: 16 }],
                },
                {
                  type: 'text',
                  properties: [
                    { text: 'Progresso: {{mainProgress}}/{{maxSegments}}' },
                    { fontSize: 12 },
                    { color: '#FFFFFF' },
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
              properties: [
                { direction: 'vertical' },
                { spacing: 12 },
                { padding: 16 },
                { backgroundColor: '#1C1C1E' },
                { cornerRadius: 16 },
              ],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: 'Progresso: {{mainProgress}}/{{maxSegments}}' },
                    { fontSize: 12 },
                    { color: '#FFFFFF' },
                  ],
                },
              ],
            },
          },
          compactLeading: {
            type: 'container',
            properties: [
              { direction: 'horizontal' },
              { spacing: 8 },
              { padding: 8 },
              { backgroundColor: '#1C1C1E' },
              { cornerRadius: 8 },
            ],
            children: [
              {
                type: 'image',
                properties: [{ systemName: 'chart.bar.fill' }, { color: '#007AFF' }, { width: 20 }, { height: 20 }],
              },
            ],
          },
          compactTrailing: {
            type: 'container',
            properties: [
              { direction: 'horizontal' },
              { spacing: 8 },
              { padding: 8 },
              { backgroundColor: '#1C1C1E' },
              { cornerRadius: 8 },
            ],
            children: [
              {
                type: 'image',
                properties: [{ systemName: 'chart.bar.fill' }, { color: '#007AFF' }, { width: 20 }, { height: 20 }],
              },
            ],
          },
          minimal: {
            type: 'container',
            properties: [
              { direction: 'horizontal' },
              { spacing: 8 },
              { padding: 8 },
              { backgroundColor: '#1C1C1E' },
              { cornerRadius: 8 },
            ],
            children: [
              {
                type: 'image',
                properties: [{ systemName: 'chart.bar.fill' }, { color: '#007AFF' }, { width: 20 }, { height: 20 }],
              },
            ],
          },
        },
        data: {
          progress1: this.currentProgress,
          total1: 5,
          progress2: Math.min(this.currentProgress, 6),
          total2: 6,
          progress3: Math.min(this.currentProgress, 4),
          total3: 4,
          progress4: Math.min(this.currentProgress, 10),
          total4: 10,
          mainProgress: this.currentProgress,
          maxSegments: this.maxSegments,
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'app://segmented-progress',
          keyLineTint: '#007AFF',
        },
      };

      const result = await LiveActivities.startActivity(activityData);
      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Segmented Progress iniciado!');
    } catch (error) {
      console.error('Error starting segmented progress:', error);
      this.liveActivitiesService.showToast('Erro ao iniciar exemplo', 'danger');
    }
  }

  async increaseProgress() {
    if (this.currentProgress < this.maxSegments) {
      this.currentProgress++;
      await this.updateProgress();
    }
  }

  async decreaseProgress() {
    if (this.currentProgress > 0) {
      this.currentProgress--;
      await this.updateProgress();
    }
  }

  private async updateProgress() {
    const updateData = {
      progress1: this.currentProgress,
      progress2: Math.min(this.currentProgress, 6),
      progress3: Math.min(this.currentProgress, 4),
      progress4: Math.min(this.currentProgress, 10),
      mainProgress: this.currentProgress,
    };

    await this.liveActivitiesService.updateActivity(
      updateData,
      'Progresso Atualizado',
      `Progresso: ${this.currentProgress}/${this.maxSegments}`,
    );
  }

  async resetProgress() {
    this.currentProgress = 0;
    await this.updateProgress();
  }

  async endExample() {
    await this.liveActivitiesService.endActivity({
      mainProgress: this.maxSegments,
    });
    this.currentProgress = 0;
  }
}
