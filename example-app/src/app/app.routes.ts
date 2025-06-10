import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'text-examples',
    pathMatch: 'full',
  },
  {
    path: 'text-examples',
    loadComponent: () => import('./examples/text-examples/text-examples.page').then((m) => m.TextExamplesPage),
  },
  {
    path: 'image-examples',
    loadComponent: () => import('./examples/image-examples/image-examples.page').then((m) => m.ImageExamplesPage),
  },
  {
    path: 'timer-examples',
    loadComponent: () => import('./examples/timer-examples/timer-examples.page').then((m) => m.TimerExamplesPage),
  },
  {
    path: 'progress-examples',
    loadComponent: () =>
      import('./examples/progress-examples/progress-examples.page').then((m) => m.ProgressExamplesPage),
  },
  {
    path: 'segmented-progress-examples',
    loadComponent: () =>
      import('./examples/segmented-progress-examples/segmented-progress-examples.page').then(
        (m) => m.SegmentedProgressExamplesPage,
      ),
  },
  {
    path: 'chart-examples',
    loadComponent: () => import('./examples/chart-examples/chart-examples.page').then((m) => m.ChartExamplesPage),
  },
  {
    path: 'container-examples',
    loadComponent: () =>
      import('./examples/container-examples/container-examples.page').then((m) => m.ContainerExamplesPage),
  },
  {
    path: 'football-scoreboard',
    loadComponent: () =>
      import('./examples/football-scoreboard/football-scoreboard.page').then((m) => m.FootballScoreboardPage),
  },
  {
    path: 'food-order',
    loadComponent: () => import('./examples/food-order/food-order.page').then((m) => m.FoodOrderPage),
  },
  {
    path: 'gym-workout',
    loadComponent: () => import('./examples/gym-workout/gym-workout.page').then((m) => m.GymWorkoutPage),
  },
  {
    path: 'crypto-tracker',
    loadComponent: () => import('./examples/crypto-tracker/crypto-tracker.page').then((m) => m.CryptoTrackerPage),
  },
];
