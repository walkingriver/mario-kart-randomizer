export interface SlotPerformanceProfile {
  /** Reduced DOM/effects for WebKit and reduced-motion users. */
  lite: boolean;
  reelCopies: number;
  centerCopy: number;
  maxFullSpins: number;
  spinDurationMs: number;
  /** Animate via CSS transition instead of per-frame JS (better on WebKit). */
  useCssTransition: boolean;
}

export function isSafari(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const ua = navigator.userAgent;
  return (
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPR|Opera/i.test(ua)
  );
}

export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia !== 'undefined' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function getSlotPerformanceProfile(): SlotPerformanceProfile {
  const lite = isSafari() || prefersReducedMotion();
  return {
    lite,
    reelCopies: lite ? 7 : 10,
    centerCopy: lite ? 3 : 4,
    maxFullSpins: lite ? 2 : 4,
    spinDurationMs: lite ? 5800 : 4400,
    useCssTransition: lite,
  };
}

export function getBrowserPerformanceClasses(): string[] {
  const classes: string[] = [];
  if (isSafari()) {
    classes.push('is-safari');
  }
  if (prefersReducedMotion()) {
    classes.push('prefers-reduced-motion');
  }
  if (getSlotPerformanceProfile().lite) {
    classes.push('perf-lite');
  }
  return classes;
}
