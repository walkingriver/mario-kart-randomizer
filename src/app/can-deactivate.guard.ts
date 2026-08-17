import { CanDeactivateFn } from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate(): boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanDeactivateComponent> = (
  component
) => (component.canDeactivate ? component.canDeactivate() : true);
