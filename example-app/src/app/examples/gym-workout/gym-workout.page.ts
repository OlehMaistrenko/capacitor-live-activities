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

      const activityData: LiveActivitiesOptions = {
        layout: {
          type: 'container',
          properties: [
            { direction: 'vertical' },
            { spacing: 12 },
            { padding: 16 },
            { backgroundColor: '#1C1C1E' },
            { cornerRadius: 16 },
          ],
          children: [
            // Header with gym icon and workout status
            {
              type: 'container',
              properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'figure.strengthtraining.traditional' },
                    { color: '#FF6B35' },
                    { width: 28 },
                    { height: 28 },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 2 }],
                  children: [
                    {
                      type: 'text',
                      properties: [
                        { text: 'Treino de Força' },
                        { fontSize: 16 },
                        { fontWeight: 'semibold' },
                        { color: '#FFFFFF' },
                      ],
                    },
                    {
                      type: 'text',
                      properties: [{ text: '{{status}}' }, { fontSize: 12 }, { color: '#FF9500' }],
                    },
                  ],
                },
                {
                  type: 'container',
                  properties: [
                    { direction: 'horizontal' },
                    { spacing: 4 },
                    { padding: 6 },
                    { backgroundColor: '#FF9500' },
                    { cornerRadius: 8 },
                  ],
                  children: [
                    {
                      type: 'image',
                      properties: [{ systemName: 'timer' }, { color: '#FFFFFF' }, { width: 12 }, { height: 12 }],
                    },
                    {
                      type: 'text',
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
              type: 'container',
              properties: [
                { direction: 'vertical' },
                { spacing: 8 },
                { padding: 12 },
                { backgroundColor: '#2C2C2E' },
                { cornerRadius: 12 },
              ],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: 'EXERCÍCIO ATUAL' },
                    { fontSize: 10 },
                    { color: '#8E8E93' },
                    { fontWeight: 'medium' },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 12 }, { insideAlignment: 'center' }],
                  children: [
                    {
                      type: 'image',
                      properties: [
                        { systemName: '{{currentExerciseIcon}}' },
                        { color: '#FF9500' },
                        { width: 24 },
                        { height: 24 },
                      ],
                    },
                    {
                      type: 'container',
                      properties: [{ direction: 'vertical' }, { spacing: 2 }],
                      children: [
                        {
                          type: 'text',
                          properties: [
                            { text: '{{currentExerciseName}}' },
                            { fontSize: 16 },
                            { fontWeight: 'semibold' },
                            { color: '#FFFFFF' },
                          ],
                        },
                        {
                          type: 'text',
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
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 8 }],
              children: [
                {
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 8 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: 'Progresso do Treino' }, { fontSize: 12 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
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
                  type: 'segmented-progress',
                  properties: [
                    { segments: 6 },
                    { filled: '{{progressFilled}}' as any },
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
                  type: 'container',
                  properties: [{ direction: 'horizontal' }, { spacing: 6 }],
                  children: this.exercises.slice(0, 6).map((_, index) => ({
                    type: 'image',
                    properties: [
                      { systemName: `{{dot${index}Icon}}` },
                      { color: `{{dot${index}Color}}` as any },
                      { width: 12 },
                      { height: 12 },
                    ],
                  })),
                },
              ],
            },

            // Next Exercise Preview
            {
              type: 'container',
              properties: [
                { direction: 'horizontal' },
                { spacing: 8 },
                { padding: 8 },
                { backgroundColor: '#1C1C1E' },
                { cornerRadius: 8 },
                { insideAlignment: 'center' },
              ],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'arrow.right.circle' },
                    { color: '#8E8E93' },
                    { width: 16 },
                    { height: 16 },
                  ],
                },
                {
                  type: 'container',
                  properties: [{ direction: 'vertical' }, { spacing: 1 }],
                  children: [
                    {
                      type: 'text',
                      properties: [{ text: 'Próximo:' }, { fontSize: 10 }, { color: '#8E8E93' }],
                    },
                    {
                      type: 'text',
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
        dynamicIslandLayout: {
          expanded: {
            leading: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 2 }],
              children: [
                {
                  type: 'image',
                  properties: [
                    { systemName: 'figure.strengthtraining.traditional' },
                    { color: '#FF6B35' },
                    { width: 20 },
                    { height: 20 },
                  ],
                },
                {
                  type: 'text',
                  properties: [{ text: 'Treino' }, { fontSize: 9 }, { color: '#8E8E93' }],
                },
              ],
            },
            trailing: {
              type: 'container',
              properties: [{ direction: 'vertical' }, { spacing: 2 }, { insideAlignment: 'trailing' }],
              children: [
                {
                  type: 'text',
                  properties: [
                    { text: '{{workoutTime}}' },
                    { fontSize: 14 },
                    { fontWeight: 'bold' },
                    { color: '#FFFFFF' },
                  ],
                },
                {
                  type: 'text',
                  properties: [
                    { text: '{{progressText}}' },
                    { fontSize: 9 },
                    { color: '#FF9500' },
                    { fontWeight: 'medium' },
                  ],
                },
              ],
            },
            center: {
              type: 'text',
              properties: [
                { text: '{{currentExerciseName}}' },
                { fontSize: 11 },
                { fontWeight: 'medium' },
                { color: '#FFFFFF' },
              ],
            },
            bottom: {
              type: 'segmented-progress',
              properties: [
                { segments: 6 },
                { filled: '{{progressFilled}}' as any },
                { spacing: 3 },
                { height: 4 },
                { cornerRadius: 2 },
                { filledColor: '#FF9500' },
                { unfilledColor: '#2C2C2E' },
                { strokeWidth: 0 },
              ],
            },
          },
          compactLeading: {
            type: 'image',
            properties: [
              { systemName: 'figure.strengthtraining.traditional' },
              { color: '#FF6B35' },
              { width: 16 },
              { height: 16 },
            ],
          },
          compactTrailing: {
            type: 'container',
            properties: [{ direction: 'horizontal' }, { spacing: 3 }],
            children: [
              {
                type: 'text',
                properties: [
                  { text: '{{workoutTime}}' },
                  { fontSize: 12 },
                  { fontWeight: 'semibold' },
                  { color: '#FFFFFF' },
                ],
              },
              {
                type: 'image',
                properties: [{ systemName: 'flame.fill' }, { color: '#FF9500' }, { width: 10 }, { height: 10 }],
              },
            ],
          },
          minimal: {
            type: 'image',
            properties: [{ systemName: 'flame.fill' }, { color: '#FF9500' }, { width: 12 }, { height: 12 }],
          },
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

      const result = await LiveActivities.startActivity(activityData);
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
