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
  selector: 'app-image-examples',
  templateUrl: './image-examples.page.html',
  styleUrls: ['./image-examples.page.scss'],
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
export class ImageExamplesPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  async startSFSymbolsExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'sf-symbols-example',
          type: 'container',
          properties: [
            { direction: 'horizontal' },
            { spacing: 16 },
            { padding: 16 },
            { backgroundColor: '#ffffff' },
            { cornerRadius: 12 },
            { insideAlignment: 'center' },
          ],
          children: [
            {
              id: 'icon',
              type: 'image',
              properties: [{ systeName: 'photo.circle.fill' }, { color: '#34C759' }, { width: 40 }, { height: 40 }],
            },
            {
              id: 'content',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  id: 'title',
                  type: 'text',
                  properties: [
                    { text: '{{title}}' },
                    { fontSize: 16 },
                    { fontWeight: 'semibold' },
                    { color: '#1a1a1a' },
                  ],
                },
                {
                  id: 'description',
                  type: 'text',
                  properties: [{ text: '{{description}}' }, { fontSize: 13 }, { color: '#666666' }, { lineLimit: 1 }],
                },
              ],
            },
          ],
        },
        data: {
          title: 'SF Symbols Example',
          description: 'System icons with custom colors',
        },
        behavior: {
          systemActionForegroundColor: '#34C759',
          widgetUrl: 'https://example.com',
          keyLineTint: '#34C759',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('SF Symbols example started!');
    } catch (error) {
      console.error('Error starting SF Symbols example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startMultipleIconsExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'multiple-icons-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 16 },
            { padding: 20 },
            { backgroundColor: '#f8f9fa' },
            { cornerRadius: 16 },
          ],
          children: [
            {
              id: 'header',
              type: 'text',
              properties: [
                { text: '{{headerText}}' },
                { fontSize: 18 },
                { fontWeight: 'bold' },
                { color: '#1a1a1a' },
                { alignment: 'center' },
              ],
            },
            {
              id: 'icons-row',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 20 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'heart-icon',
                  type: 'image',
                  properties: [{ systeName: 'heart.fill' }, { color: '#FF3B30' }, { width: 32 }, { height: 32 }],
                },
                {
                  id: 'star-icon',
                  type: 'image',
                  properties: [{ systeName: 'star.fill' }, { color: '#FF9500' }, { width: 32 }, { height: 32 }],
                },
                {
                  id: 'checkmark-icon',
                  type: 'image',
                  properties: [
                    { systeName: 'checkmark.circle.fill' },
                    { color: '#34C759' },
                    { width: 32 },
                    { height: 32 },
                  ],
                },
              ],
            },
            {
              id: 'status-text',
              type: 'text',
              properties: [{ text: '{{statusText}}' }, { fontSize: 14 }, { color: '#666666' }, { alignment: 'center' }],
            },
          ],
        },
        data: {
          headerText: 'Multiple Icons',
          statusText: 'Icons with different colors and sizes',
        },
        behavior: {
          systemActionForegroundColor: '#FF9500',
          widgetUrl: 'https://example.com',
          keyLineTint: '#FF9500',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Multiple icons example started!');
    } catch (error) {
      console.error('Error starting multiple icons example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startImageSizesExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'image-sizes-example',
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#ffffff' },
            { cornerRadius: 12 },
            { borderWidth: 1 },
            { borderColor: '#e5e5e5' },
          ],
          children: [
            {
              id: 'title',
              type: 'text',
              properties: [
                { text: '{{title}}' },
                { fontSize: 16 },
                { fontWeight: 'semibold' },
                { color: '#1a1a1a' },
                { alignment: 'center' },
              ],
            },
            {
              id: 'sizes-row',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'small-icon',
                  type: 'image',
                  properties: [{ systeName: 'circle.fill' }, { color: '#007AFF' }, { width: 16 }, { height: 16 }],
                },
                {
                  id: 'medium-icon',
                  type: 'image',
                  properties: [{ systeName: 'circle.fill' }, { color: '#007AFF' }, { width: 24 }, { height: 24 }],
                },
                {
                  id: 'large-icon',
                  type: 'image',
                  properties: [{ systeName: 'circle.fill' }, { color: '#007AFF' }, { width: 32 }, { height: 32 }],
                },
                {
                  id: 'xlarge-icon',
                  type: 'image',
                  properties: [{ systeName: 'circle.fill' }, { color: '#007AFF' }, { width: 48 }, { height: 48 }],
                },
              ],
            },
            {
              id: 'labels-row',
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'small-label',
                  type: 'text',
                  properties: [
                    { text: '16pt' },
                    { fontSize: 10 },
                    { color: '#666666' },
                    { alignment: 'center' },
                    { width: 16 },
                  ],
                },
                {
                  id: 'medium-label',
                  type: 'text',
                  properties: [
                    { text: '24pt' },
                    { fontSize: 10 },
                    { color: '#666666' },
                    { alignment: 'center' },
                    { width: 24 },
                  ],
                },
                {
                  id: 'large-label',
                  type: 'text',
                  properties: [
                    { text: '32pt' },
                    { fontSize: 10 },
                    { color: '#666666' },
                    { alignment: 'center' },
                    { width: 32 },
                  ],
                },
                {
                  id: 'xlarge-label',
                  type: 'text',
                  properties: [
                    { text: '48pt' },
                    { fontSize: 10 },
                    { color: '#666666' },
                    { alignment: 'center' },
                    { width: 48 },
                  ],
                },
              ],
            },
          ],
        },
        data: {
          title: 'Different Image Sizes',
        },
        behavior: {
          systemActionForegroundColor: '#007AFF',
          widgetUrl: 'https://example.com',
          keyLineTint: '#007AFF',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Image sizes example started!');
    } catch (error) {
      console.error('Error starting image sizes example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async startRoundedImagesExample() {
    try {
      const result = await LiveActivities.startActivity({
        layout: {
          id: 'rounded-images-example',
          type: 'container',
          properties: [
            { direction: 'horizontal' },
            { spacing: 20 },
            { padding: 20 },
            { backgroundColor: '#2c3e50' },
            { cornerRadius: 16 },
          ],
          children: [
            {
              id: 'avatar-section',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'avatar-image',
                  type: 'image',
                  properties: [
                    { systeName: 'person.crop.circle.fill' },
                    { color: '#3498db' },
                    { width: 50 },
                    { height: 50 },
                    { cornerRadius: 25 },
                  ],
                },
                {
                  id: 'avatar-label',
                  type: 'text',
                  properties: [
                    { text: '{{userName}}' },
                    { fontSize: 12 },
                    { color: '#ffffff' },
                    { alignment: 'center' },
                  ],
                },
              ],
            },
            {
              id: 'info-section',
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  id: 'status-with-icon',
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'status-icon',
                      type: 'image',
                      properties: [{ systeName: 'circle.fill' }, { color: '#2ecc71' }, { width: 8 }, { height: 8 }],
                    },
                    {
                      id: 'status-text',
                      type: 'text',
                      properties: [
                        { text: '{{status}}' },
                        { fontSize: 14 },
                        { color: '#2ecc71' },
                        { fontWeight: 'medium' },
                      ],
                    },
                  ],
                },
                {
                  id: 'description',
                  type: 'text',
                  properties: [{ text: '{{description}}' }, { fontSize: 12 }, { color: '#ecf0f1' }, { lineLimit: 2 }],
                },
              ],
            },
          ],
        },
        data: {
          userName: 'John Doe',
          status: 'Online',
          description: 'User profile with rounded avatar and status indicator',
        },
        behavior: {
          systemActionForegroundColor: '#3498db',
          widgetUrl: 'https://example.com',
          keyLineTint: '#3498db',
        },
      });

      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Rounded images example started!');
    } catch (error) {
      console.error('Error starting rounded images example:', error);
      this.liveActivitiesService.showToast('Error starting Live Activity', 'danger');
    }
  }

  async updateActivity() {
    await this.liveActivitiesService.updateActivity(
      {
        title: 'Updated Image Example',
        description: 'Images have been updated with new content',
        headerText: 'Updated Multiple Icons',
        statusText: 'Icons updated with new styling',
        userName: 'Jane Smith',
        status: 'Busy',
      },
      'Images Updated',
      'Live Activity images have been updated',
    );
  }

  async endActivity() {
    await this.liveActivitiesService.endActivity({
      title: 'Image Example Completed',
      description: 'This image example has ended',
      status: 'Completed',
    });
  }

  async openSFSymbolsLink() {
    location.href = 'https://developer.apple.com/sf-symbols/';
  }
}
