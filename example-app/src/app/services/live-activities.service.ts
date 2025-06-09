import { Injectable } from '@angular/core';
import { LiveActivities } from 'capacitor-live-activities';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LiveActivitiesService {
  private currentActivityId: string | null = null;

  constructor(private toastController: ToastController) {}

  getCurrentActivityId(): string | null {
    return this.currentActivityId;
  }

  setCurrentActivityId(id: string | null): void {
    this.currentActivityId = id;
  }

  async updateActivity(data: Record<string, any>, alertTitle?: string, alertBody?: string) {
    if (!this.currentActivityId) {
      this.showToast('No active Live Activity to update', 'warning');
      return;
    }

    try {
      await LiveActivities.updateActivity({
        activityId: this.currentActivityId,
        data,
        alertConfiguration: alertTitle && alertBody ? {
          title: alertTitle,
          body: alertBody
        } : undefined
      });
      
      this.showToast('Live Activity updated successfully!');
    } catch (error) {
      console.error('Error updating activity:', error);
      this.showToast('Error updating Live Activity', 'danger');
    }
  }

  async endActivity(finalData?: Record<string, any>) {
    if (!this.currentActivityId) {
      this.showToast('No active Live Activity to end', 'warning');
      return;
    }

    try {
      await LiveActivities.endActivity({
        activityId: this.currentActivityId,
        data: finalData || {
          title: "Activity Completed",
          subtitle: "This Live Activity has ended",
          status: "Completed"
        }
      });
      
      this.currentActivityId = null;
      this.showToast('Live Activity ended successfully!');
    } catch (error) {
      console.error('Error ending activity:', error);
      this.showToast('Error ending Live Activity', 'danger');
    }
  }

  async getAllActivities() {
    try {
      const result = await LiveActivities.getAllActivities();
      return result.activities;
    } catch (error) {
      console.error('Error getting activities:', error);
      this.showToast('Error getting activities', 'danger');
      return [];
    }
  }

  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}