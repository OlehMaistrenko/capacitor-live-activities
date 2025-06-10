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
              type: 'image',
              properties: [
                { systemName: 'photo.circle.fill' },
                { color: '#34C759' },
                { contentMode: 'fit' },
                { resizable: true },
                { width: 40 },
                { height: 40 },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: '{{title}}' },
                    { fontSize: 16 },
                    { fontWeight: 'semibold' },
                    { color: '#1a1a1a' },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: '{{description}}' }, { fontSize: 13 }, { color: '#666666' }, { lineLimit: 1 }],
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
          title: 'SF Symbols Example',
          description: 'System icons with custom colors',
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
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 20 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'heart.fill' }, { color: '#FF3B30' }, { width: 32 }, { height: 32 }],
                },
                {
                  type: 'image',
                  properties: [{ systemName: 'star.fill' }, { color: '#FF9500' }, { width: 32 }, { height: 32 }],
                },
                {
                  type: 'image',
                  properties: [
                    { systemName: 'checkmark.circle.fill' },
                    { color: '#34C759' },
                    { width: 32 },
                    { height: 32 },
                  ],
                },
              ],
            },
            {
              type: 'text',
              properties: [{ text: '{{statusText}}' }, { fontSize: 14 }, { color: '#666666' }, { alignment: 'center' }],
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
          headerText: 'Multiple Icons',
          statusText: 'Icons with different colors and sizes',
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
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [{ systemName: 'circle.fill' }, { color: '#007AFF' }, { width: 16 }, { height: 16 }],
                },
                {
                  type: 'image',
                  properties: [{ systemName: 'circle.fill' }, { color: '#007AFF' }, { width: 24 }, { height: 24 }],
                },
                {
                  type: 'image',
                  properties: [{ systemName: 'circle.fill' }, { color: '#007AFF' }, { width: 32 }, { height: 32 }],
                },
                {
                  type: 'image',
                  properties: [{ systemName: 'circle.fill' }, { color: '#007AFF' }, { width: 48 }, { height: 48 }],
                },
              ],
            },
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 16 }, { insideAlignment: 'center' }],
              children: [
                {
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
          title: 'Different Image Sizes',
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
          type: 'container',
          properties: [
            { direction: 'horizontal' },
            { spacing: 20 },
            { padding: 20 },
            { backgroundColor: '#2c3e50' },
            { cornerRadius: 16 },
            { maxWidth: -1 },
          ],
          children: [
            {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [
                    // { url: 'https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png' },
                    { asset: 'arsenal' }, // Local image for demonstration
                    { width: 50 },
                    { height: 50 },
                    { cornerRadius: 25 },
                  ],
                },
                {
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
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 4 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: 'circle.fill' }, { color: '#2ecc71' }, { width: 8 }, { height: 8 }],
                    },
                    {
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
                  type: 'text',
                  properties: [{ text: '{{description}}' }, { fontSize: 12 }, { color: '#ecf0f1' }, { lineLimit: 2 }],
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
          userName: 'John Doe',
          status: 'Online',
          description: 'User profile with rounded avatar and status indicator',
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
