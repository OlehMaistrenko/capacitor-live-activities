import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp,
  restaurant,
} from 'ionicons/icons';
import { IconService } from './icon.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    FaIconComponent,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  private iconsService = inject(IconService);

  public appPages = [
    {
      title: 'Layout Components',
      note: 'Individual elements and their properties',
      childrens: [
        { title: 'Text Examples', url: '/text-examples', icon: 'font' },
        { title: 'Image Examples', url: '/image-examples', icon: 'image' },
        { title: 'Timer Examples', url: '/timer-examples', icon: 'stopwatch' },
        { title: 'Progress Examples', url: '/progress-examples', icon: 'bars-progress' },
        { title: 'Segmented Progress', url: '/segmented-progress-examples', icon: 'chart-bar' },
        { title: 'Chart Examples', url: '/chart-examples', icon: 'chart-line' },
        { title: 'Container Examples', url: '/container-examples', icon: 'border-none' },
      ],
    },
    {
      title: 'Real-World Examples',
      note: 'Complete use case demonstrations',
      childrens: [
        { title: 'Football Scoreboard', url: '/football-scoreboard', icon: 'futbol' },
        { title: 'Food Order', url: '/food-order', icon: 'utensils' },
        { title: 'Gym Workout', url: '/gym-workout', icon: 'dumbbell' },
        { title: 'Crypto Tracker', url: '/crypto-tracker', icon: 'money-bill-trend-up' },
      ],
    },
  ];

  constructor() {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
      restaurant,
    });
  }
}
