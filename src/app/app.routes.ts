// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reloj/reloj/dashboard/dashboard').then(m => m.DashboardComponent)
  }
];

