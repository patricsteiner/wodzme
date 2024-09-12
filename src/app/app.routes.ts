import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'wods',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/wods/wods.component').then((m) => m.WodsComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/wods/wod/wod.component').then((m) => m.WodComponent),
      },
    ],
  },
];
