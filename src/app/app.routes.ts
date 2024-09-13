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
    path: 'wod-editor',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/wod-editor/wod-editor.component').then((m) => m.WodEditorComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/wod-editor/wod-editor.component').then((m) => m.WodEditorComponent),
      },
    ],
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
      {
        path: ':id/scores',
        loadComponent: () => import('./pages/wods/wod/scores/scores.component').then((m) => m.ScoresComponent),
      },
    ],
  },
];
