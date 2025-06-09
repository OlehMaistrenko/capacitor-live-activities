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
import { LiveActivities } from 'capacitor-live-activities';
import { LiveActivitiesService } from '../../services/live-activities.service';
import { playCircle, refresh, stopCircle, fitness, timer, barbell } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-gym-workout',
  templateUrl: './gym-workout.page.html',
  styleUrls: ['./gym-workout.page.scss'],
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
    FaIconComponent,
  ],
})
export class GymWorkoutPage {
  constructor(private liveActivitiesService: LiveActivitiesService) {
    addIcons({ playCircle, refresh, stopCircle, fitness, timer, barbell });
  }

  get currentActivityId() {
    return this.liveActivitiesService.getCurrentActivityId();
  }

  private currentExerciseIndex = 0;
  private readonly exercises = [
    { name: 'Supino Reto', sets: 4, reps: 12, icon: 'barbell', muscle: 'Peito' },
    { name: 'Remada Curvada', sets: 4, reps: 10, icon: 'fitness', muscle: 'Costas' },
    { name: 'Agachamento', sets: 3, reps: 15, icon: 'fitness', muscle: 'Pernas' },
    { name: 'Desenvolvimento', sets: 3, reps: 12, icon: 'barbell', muscle: 'Ombros' },
    { name: 'Rosca Direta', sets: 3, reps: 12, icon: 'fitness', muscle: 'Bíceps' },
    { name: 'Tríceps Testa', sets: 3, reps: 12, icon: 'barbell', muscle: 'Tríceps' },
  ];

  async startGymWorkout() {
    try {
      const currentExercise = this.exercises[this.currentExerciseIndex];
      const nextExercise = this.exercises[this.currentExerciseIndex + 1];
      const completedExercises = this.currentExerciseIndex;
      const totalExercises = this.exercises.length;
      const progressPercentage = (completedExercises / totalExercises) * 100;

      // Create segmented progress indicators for each exercise
      const exerciseProgress = this.exercises.map((exercise, index) => {
        let status = 'pending';
        let color = '#8E8E93';
        let icon = 'circle';

        if (index < this.currentExerciseIndex) {
          status = 'completed';
          color = '#34C759';
          icon = 'checkmark.circle.fill';
        } else if (index === this.currentExerciseIndex) {
          status = 'current';
          color = '#FF9500';
          icon = 'flame.fill';
        }

        return { status, color, icon, name: exercise.name };
      });

      const activityData = {
        layout: {
          id: 'workout',
          type: 'container' as const,
          properties: [
            { direction: 'vertical' as const },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#1C1C1E' },
            { cornerRadius: 16 },
          ],
          children: [
            // Header with gym icon and workout status
            {
              id: 'header',
              type: 'container' as const,
              properties: [{ direction: 'horizontal' as const }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  id: 'gym-icon',
                  type: 'image' as const,
                  properties: [
                    { systeName: 'figure.strengthtraining.traditional' },
                    { color: '#FF6B35' },
                    { width: 28 },
                    { height: 28 },
                  ],
                },
                {
                  id: 'workout-info',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                  children: [
                    {
                      id: 'workout-title',
                      type: 'text' as const,
                      properties: [
                        { text: 'Treino de Força' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      id: 'workout-status',
                      type: 'text' as const,
                      properties: [{ text: '{{status}}' }, { fontSize: 12 }, { color: '#FF9500' }],
                    },
                  ],
                },
                {
                  id: 'timer-badge',
                  type: 'container' as const,
                  properties: [
                    { direction: 'horizontal' as const },
                    { spacing: 4 },
                    { padding: 6 },
                    { backgroundColor: '#FF9500' },
                    { cornerRadius: 8 },
                  ],
                  children: [
                    {
                      id: 'timer-icon',
                      type: 'image' as const,
                      properties: [{ systeName: 'timer' }, { color: '#FFFFFF' }, { width: 12 }, { height: 12 }],
                    },
                    {
                      id: 'workout-time',
                      type: 'text' as const,
                      properties: [
                        { text: '{{workoutTime}}' },
                        { fontSize: 10 },
                        { color: '#FFFFFF' },
                        { fontWeight: 'medium' },
                      ],
                    },
                  ],
                },
              ],
            },

            // Current Exercise Section
            {
              id: 'current-exercise',
              type: 'container' as const,
              properties: [
                { direction: 'vertical' as const },
                { spacing: 8 },
                { padding: 12 },
                { backgroundColor: '#2C2C2E' },
                { cornerRadius: 12 },
              ],
              children: [
                {
                  id: 'current-label',
                  type: 'text' as const,
                  properties: [
                    { text: 'EXERCÍCIO ATUAL' },
                    { fontSize: 10 },
                    { color: '#8E8E93' },
                    { fontWeight: 'medium' },
                  ],
                },
                {
                  id: 'current-exercise-info',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 12 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      id: 'exercise-icon',
                      type: 'image' as const,
                      properties: [
                        { systeName: '{{currentExerciseIcon}}' },
                        { color: '#FF9500' },
                        { width: 24 },
                        { height: 24 },
                      ],
                    },
                    {
                      id: 'exercise-details',
                      type: 'container' as const,
                      properties: [{ direction: 'vertical' as const }, { spacing: 2 }],
                      children: [
                        {
                          id: 'exercise-name',
                          type: 'text' as const,
                          properties: [
                            { text: '{{currentExerciseName}}' },
                            { fontSize: 16 },
                            { fontWeight: 'semibold' },
                            { color: '#FFFFFF' },
                          ],
                        },
                        {
                          id: 'exercise-specs',
                          type: 'text' as const,
                          properties: [{ text: '{{currentExerciseSpecs}}' }, { fontSize: 13 }, { color: '#8E8E93' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            // Progress Section
            {
              id: 'progress-section',
              type: 'container' as const,
              properties: [{ direction: 'vertical' as const }, { spacing: 8 }],
              children: [
                {
                  id: 'progress-header',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 8 }],
                  children: [
                    {
                      id: 'progress-label',
                      type: 'text' as const,
                      properties: [{ text: 'Progresso do Treino' }, { fontSize: 12 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'progress-count',
                      type: 'text' as const,
                      properties: [
                        { text: '{{progressText}}' },
                        { fontSize: 12 },
                        { color: '#FF9500' },
                        { fontWeight: 'medium' },
                      ],
                    },
                  ],
                },
                {
                  id: 'segmented-progress-bar',
                  type: 'segmented-progress' as const,
                  properties: [
                    { segments: 6 },
                    { filled: '{{progressFilled}}' },
                    { spacing: 4 },
                    { height: 6 },
                    { cornerRadius: 3 },
                    { filledColor: '#FF9500' },
                    { unfilledColor: '#2C2C2E' },
                    { strokeColor: '#48484A' },
                    { strokeDashed: false },
                    { strokeWidth: 1 },
                  ],
                },
                // Exercise dots showing progress
                {
                  id: 'exercise-dots',
                  type: 'container' as const,
                  properties: [{ direction: 'horizontal' as const }, { spacing: 6 }],
                  children: this.exercises.slice(0, 6).map((_, index) => ({
                    id: `dot-${index}`,
                    type: 'image' as const,
                    properties: [
                      { systeName: `{{dot${index}Icon}}` },
                      { color: `{{dot${index}Color}}` },
                      { width: 12 },
                      { height: 12 },
                    ],
                  })),
                },
              ],
            },

            // Next Exercise Preview
            {
              id: 'next-exercise',
              type: 'container' as const,
              properties: [
                { direction: 'horizontal' as const },
                { spacing: 8 },
                { padding: 8 },
                { backgroundColor: '#1C1C1E' },
                { cornerRadius: 8 },
                { insideAlignment: 'center' },
              ],
              children: [
                {
                  id: 'next-icon',
                  type: 'image' as const,
                  properties: [
                    { systeName: 'arrow.right.circle' },
                    { color: '#8E8E93' },
                    { width: 16 },
                    { height: 16 },
                  ],
                },
                {
                  id: 'next-info',
                  type: 'container' as const,
                  properties: [{ direction: 'vertical' as const }, { spacing: 1 }],
                  children: [
                    {
                      id: 'next-label',
                      type: 'text' as const,
                      properties: [{ text: 'Próximo:' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      id: 'next-exercise-name',
                      type: 'text' as const,
                      properties: [
                        { text: '{{nextExerciseName}}' },
                        { fontSize: 12 },
                        { color: '#FFFFFF' },
                        { fontWeight: 'medium' },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        data: {
          status: 'EM ANDAMENTO',
          workoutTime: '25min',
          currentExerciseName: currentExercise.name,
          currentExerciseSpecs: `${currentExercise.sets}x${currentExercise.reps} • ${currentExercise.muscle}`,
          currentExerciseIcon: currentExercise.icon === 'barbell' ? 'dumbbell.fill' : 'figure.walk',
          progressText: `${completedExercises}/${totalExercises} exercícios`,
          progressValue: progressPercentage / 100,
          progressFilled: completedExercises,
          nextExerciseName: nextExercise ? nextExercise.name : 'Treino finalizado!',
          // Progress dots data
          ...this.exercises.reduce(
            (acc, exercise, index) => {
              const status = exerciseProgress[index];
              acc[`dot${index}Icon`] = status.icon;
              acc[`dot${index}Color`] = status.color;
              return acc;
            },
            {} as Record<string, string>,
          ),
        },
        behavior: {
          systemActionForegroundColor: '#FF6B35',
          widgetUrl: 'gymapp://workout/current',
          keyLineTint: '#FF6B35',
        },
      };

      const result = await LiveActivities.startActivity(activityData as any);
      this.liveActivitiesService.setCurrentActivityId(result.activityId);
      this.liveActivitiesService.showToast('Treino iniciado! 💪');
    } catch (error) {
      console.error('Error starting gym workout:', error);
      this.liveActivitiesService.showToast('Erro ao iniciar treino', 'danger');
    }
  }

  async nextExercise() {
    if (this.currentExerciseIndex < this.exercises.length - 1) {
      this.currentExerciseIndex++;

      const currentExercise = this.exercises[this.currentExerciseIndex];
      const nextExercise = this.exercises[this.currentExerciseIndex + 1];
      const completedExercises = this.currentExerciseIndex;
      const totalExercises = this.exercises.length;
      const progressPercentage = (completedExercises / totalExercises) * 100;

      // Update progress dots
      const updateData: Record<string, any> = {
        currentExerciseName: currentExercise.name,
        currentExerciseSpecs: `${currentExercise.sets}x${currentExercise.reps} • ${currentExercise.muscle}`,
        currentExerciseIcon: currentExercise.icon === 'barbell' ? 'dumbbell.fill' : 'figure.walk',
        progressText: `${completedExercises}/${totalExercises} exercícios`,
        progressValue: progressPercentage / 100,
        progressFilled: completedExercises,
        nextExerciseName: nextExercise ? nextExercise.name : 'Treino finalizado!',
      };

      // Update exercise dots
      this.exercises.forEach((_, index) => {
        let icon = 'circle';
        let color = '#8E8E93';

        if (index < this.currentExerciseIndex) {
          icon = 'checkmark.circle.fill';
          color = '#34C759';
        } else if (index === this.currentExerciseIndex) {
          icon = 'flame.fill';
          color = '#FF9500';
        }

        updateData[`dot${index}Icon`] = icon;
        updateData[`dot${index}Color`] = color;
      });

      await this.liveActivitiesService.updateActivity(
        updateData,
        'Próximo Exercício',
        `Agora: ${currentExercise.name}`,
      );
    }
  }

  async completeWorkout() {
    // Mark all exercises as completed
    const updateData: Record<string, any> = {
      status: 'CONCLUÍDO',
      currentExerciseName: 'Treino Finalizado! 🎉',
      currentExerciseSpecs: 'Parabéns pelo treino completo!',
      currentExerciseIcon: 'trophy.fill',
      progressText: `${this.exercises.length}/${this.exercises.length} exercícios`,
      progressValue: 1.0,
      progressFilled: this.exercises.length,
      nextExerciseName: 'Descanso merecido! 😴',
    };

    // Mark all dots as completed
    this.exercises.forEach((_, index) => {
      updateData[`dot${index}Icon`] = 'checkmark.circle.fill';
      updateData[`dot${index}Color`] = '#34C759';
    });

    await this.liveActivitiesService.updateActivity(
      updateData,
      'Treino Finalizado! 🏆',
      'Parabéns! Você completou todos os exercícios.',
    );
  }

  async endWorkout() {
    await this.liveActivitiesService.endActivity({
      status: 'FINALIZADO',
      progressValue: 1.0,
    });
    this.currentExerciseIndex = 0; // Reset for next workout
  }
}
