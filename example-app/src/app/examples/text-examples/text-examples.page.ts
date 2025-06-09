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
  selector: 'app-text-examples',
  templateUrl: './text-examples.page.html',
  styleUrls: ['./text-examples.page.scss'],
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
export class TextExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startBasicTextExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'basic-text-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#f8f9fa' },
            { cornerRadius: 12 },
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
              id: 'subtitle',
              type: 'text',
              properties: [
                { text: '{{subtitle}}' },
                { fontSize: 14 },
                { color: '#666666' },
                { alignment: 'center' },
                { lineLimit: 2 },
              ],
            },
            {
              id: 'status',
              type: 'text',
              properties: [
                { text: '{{status}}' },
                { fontSize: 12 },
                { fontWeight: 'medium' },
                { color: '#007AFF' },
                { alignment: 'center' },
                { italic: true },
              ],
            },
          ],
        },
        data: {
          title: 'Basic Text Layout',
          subtitle: 'Demonstrating different font sizes, weights, and colors',
          status: 'Active',
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Basic text example started!');
    } catch (error) {
      console.error('Error starting basic text example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startTypographyExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'typography-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 8 },
            { padding: 20 },
            { backgroundColor: '#ffffff' },
            { cornerRadius: 16 },
            { borderWidth: 1 },
            { borderColor: '#e5e5e5' },
          ],
          children: [
            {
              id: 'heading',
              type: 'text',
              properties: [
                { text: '{{heading}}' },
                { fontSize: 24 },
                { fontWeight: 'heavy' },
                { color: '#2c3e50' },
                { alignment: 'leading' },
              ],
            },
            {
              id: 'body',
              type: 'text',
              properties: [
                { text: '{{body}}' },
                { fontSize: 16 },
                { fontWeight: 'regular' },
                { color: '#34495e' },
                { alignment: 'leading' },
                { lineLimit: 3 },
              ],
            },
            {
              id: 'caption',
              type: 'text',
              properties: [
                { text: '{{caption}}' },
                { fontSize: 12 },
                { fontWeight: 'light' },
                { color: '#7f8c8d' },
                { alignment: 'trailing' },
                { italic: true },
              ],
            },
            {
              id: 'monospace',
              type: 'text',
              properties: [
                { text: '{{monospace}}' },
                { fontSize: 14 },
                { fontWeight: 'medium' },
                { color: '#e74c3c' },
                { alignment: 'center' },
                { monospacedDigit: true },
              ],
            },
          ],
        },
        data: {
          heading: 'Typography Showcase',
          body: 'This example demonstrates different font weights, sizes, and text alignments. Text can be leading, center, or trailing aligned.',
          caption: 'Caption with italic styling',
          monospace: '123.456.789',
        },
        behavior: {
          systemActionForegroundColor: '#2c3e50',
          widgetUrl: 'https://example.com',
          keyLineTint: '#2c3e50',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Typography example started!');
    } catch (error) {
      console.error('Error starting typography example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startFormattingExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'formatting-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 10 },
            { padding: 16 },
            { backgroundColor: '#f1f3f4' },
            { cornerRadius: 12 },
          ],
          children: [
            {
              id: 'normal-text',
              type: 'text',
              properties: [
                { text: '{{normalText}}' },
                { fontSize: 16 },
                { fontWeight: 'regular' },
                { color: '#1a1a1a' },
                { alignment: 'center' },
              ],
            },
            {
              id: 'bold-text',
              type: 'text',
              properties: [
                { text: '{{boldText}}' },
                { fontSize: 16 },
                { fontWeight: 'bold' },
                { color: '#1a1a1a' },
                { alignment: 'center' },
              ],
            },
            {
              id: 'italic-text',
              type: 'text',
              properties: [
                { text: '{{italicText}}' },
                { fontSize: 16 },
                { fontWeight: 'regular' },
                { color: '#1a1a1a' },
                { alignment: 'center' },
                { italic: true },
              ],
            },
            {
              id: 'underline-text',
              type: 'text',
              properties: [
                { text: '{{underlineText}}' },
                { fontSize: 16 },
                { fontWeight: 'regular' },
                { color: '#007AFF' },
                { alignment: 'center' },
                { underline: true },
              ],
            },
            {
              id: 'strikethrough-text',
              type: 'text',
              properties: [
                { text: '{{strikethroughText}}' },
                { fontSize: 16 },
                { fontWeight: 'regular' },
                { color: '#8e8e93' },
                { alignment: 'center' },
                { strikethrough: true },
              ],
            },
          ],
        },
        data: {
          normalText: 'Normal Text',
          boldText: 'Bold Text',
          italicText: 'Italic Text',
          underlineText: 'Underlined Text',
          strikethroughText: 'Strikethrough Text',
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Text formatting example started!');
    } catch (error) {
      console.error('Error starting formatting example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateActivity() {
    await this.liveActivitiesService.updateActivity(
      {
        title: 'Updated Text Example',
        subtitle: 'This text has been updated with new content',
        status: 'Updated',
        heading: 'Updated Typography',
        body: 'The text content has been dynamically updated to show new information.',
        caption: 'Updated caption',
        normalText: 'Updated Normal Text',
        boldText: 'Updated Bold Text',
      },
      'Text Updated',
      'Live Activity text content has been updated',
    );
  }

  async endActivity() {
    await this.liveActivitiesService.endActivity({
      title: 'Text Example Completed',
      subtitle: 'This text example has ended',
      status: 'Completed',
    });
  }
}
