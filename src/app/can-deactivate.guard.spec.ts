import { TestBed } from '@angular/core/testing';
import { canDeactivateGuard } from './can-deactivate.guard';
import { CanDeactivateComponent } from './can-deactivate.guard';

describe('canDeactivateGuard', () => {
  it('should allow navigation when component has no canDeactivate', () => {
    const result = TestBed.runInInjectionContext(() =>
      canDeactivateGuard({} as CanDeactivateComponent, {} as never, {} as never, {} as never)
    );
    expect(result).toBe(true);
  });

  it('should delegate to component canDeactivate', () => {
    const component: CanDeactivateComponent = {
      canDeactivate: () => false,
    };
    const result = TestBed.runInInjectionContext(() =>
      canDeactivateGuard(component, {} as never, {} as never, {} as never)
    );
    expect(result).toBe(false);
  });
});
