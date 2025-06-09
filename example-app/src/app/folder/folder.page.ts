import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  navigateToExamples() {
    // Redirect to the appropriate example page based on folder
    switch(this.folder) {
      case 'inbox':
        this.router.navigate(['/text-examples']);
        break;
      case 'outbox':
        this.router.navigate(['/image-examples']);
        break;
      case 'favorites':
        this.router.navigate(['/timer-examples']);
        break;
      case 'archived':
        this.router.navigate(['/progress-examples']);
        break;
      case 'trash':
        this.router.navigate(['/container-examples']);
        break;
      default:
        this.router.navigate(['/text-examples']);
    }
  }

  getExampleTitle(): string {
    switch (this.folder) {
      case 'inbox': return 'Text Examples';
      case 'outbox': return 'Image Examples';
      case 'favorites': return 'Timer Examples';
      case 'archived': return 'Progress Examples';
      case 'trash': return 'Container Examples';
      default: return 'Live Activities Examples';
    }
  }

  getExampleDescription(): string {
    switch (this.folder) {
      case 'inbox': return 'Various text styling, typography, and formatting options';
      case 'outbox': return 'SF Symbols, remote images, and image styling';
      case 'favorites': return 'Countdown timers and time formatting';
      case 'archived': return 'Progress bars and completion indicators';
      case 'trash': return 'Complex layouts with multiple containers';
      default: return 'Comprehensive Live Activities examples';
    }
  }
}