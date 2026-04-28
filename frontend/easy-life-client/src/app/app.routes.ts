import { Routes } from '@angular/router';

export const routes: Routes = [
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

  // Fallback
  {
    path: '**',
    redirectTo: '',
  },
];
