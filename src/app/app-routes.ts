import { Routes } from '@angular/router';
import { canDeactivateGuard } from './can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'slots',
    loadComponent: () =>
      import('./slots/slots.component').then((m) => m.SlotsComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.component').then((m) => m.SettingsComponent),
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: 'attribution',
    loadComponent: () =>
      import('./attribution/attribution.component').then(
        (m) => m.AttributionComponent
      ),
  },
];
