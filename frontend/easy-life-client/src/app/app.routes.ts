import { Routes } from '@angular/router';

export const routes: Routes = [
  // public routes
  {
    path: '',
    loadComponent: () => import('./pages/public/welcome/welcome').then((m) => m.WelcomeComponent),
    title: 'Easy Life - Make it easy',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/public/register/register').then((m) => m.RegisterComponent),
    title: 'Register - Easy Life',
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/public/pricing/pricing').then((m) => m.PricingComponent),
    title: 'Pricing - Easy Life',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/public/about/about').then((m) => m.AboutComponent),
    title: 'About - Easy Life',
  },
  {
    path: 'support',
    loadComponent: () => import('./pages/public/support/support').then((m) => m.SupportComponent),
    title: 'Support - Easy Life',
  },

  {
    path: 'workspace/:username',
    loadComponent: () =>
      import('./layouts/workspace-layout/workspace-layout').then((m) => m.WorkspaceLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'tasks',
        loadComponent: () => import('./pages/workspace/tasks/tasks').then((m) => m.TasksComponent),
        title: 'Tasks - Easy Life',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/workspace/categories/categories').then((m) => m.CategoriesComponent),
        title: 'Categories - Easy Life',
      },
      {
        path: 'goals',
        loadComponent: () => import('./pages/workspace/goals/goals').then((m) => m.GoalsComponent),
        title: 'Goals - Easy Life',
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./pages/workspace/calendar-event/calendar-event').then(
            (m) => m.CalendarComponent,
          ),
        title: 'Calendar - Easy Life',
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./pages/workspace/documents/documents').then((m) => m.DocumentsComponent),
        title: 'Documents - Easy Life',
      },
      {
        path: 'my-week',
        loadComponent: () =>
          import('./pages/workspace/weekplan/weekplan').then((m) => m.WeekplanComponent),
        title: 'My Week - Easy Life',
      },
      {
        path: 'journal',
        loadComponent: () =>
          import('./pages/workspace/journal/journal').then((m) => m.JournalComponent),
        title: 'Journal - Easy Life',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/workspace/profile/profile').then((m) => m.ProfileComponent),
        title: 'Profile - Easy Life',
      },
    ],
  },

  // fallback
  {
    path: '**',
    redirectTo: '',
  },
];
