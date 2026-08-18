import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  afterNextRender,
  signal,
} from '@angular/core';
import { getSlotPerformanceProfile } from '../browser-capabilities';
import { MkItem } from '../mk-item';

const PERF = getSlotPerformanceProfile();
const MIN_FULL_SPINS = 2;

@Component({
  selector: 'mk-container',
  standalone: true,
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnChanges {
  @Input() public items: MkItem[] = [];

  @ViewChild('container', { static: true })
  private container!: ElementRef<HTMLElement>;

  @ViewChild('reel', { static: true })
  private reel!: ElementRef<HTMLElement>;

  public reelItems: MkItem[] = [];
  public spinning = signal(false);

  private static spinAudio = new Audio('assets/sounds/item-box.mp3');

  private readonly reelCopies = PERF.reelCopies;
  private readonly centerCopy = PERF.centerCopy;
  private readonly maxFullSpins = PERF.maxFullSpins;
  private readonly defaultSpinDuration = PERF.spinDurationMs;
  private readonly useCssTransition = PERF.useCssTransition;

  private itemHeight = 0;
  private absoluteIndex = 0;
  private animating = false;
  private animationFrame = 0;

  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => this.scheduleLayoutSync());
  }

  ngOnInit(): void {
    this.rebuildReel();
    this.scheduleLayoutSync();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.rebuildReel();
      this.scheduleLayoutSync();
    }
  }

  private scheduleLayoutSync(): void {
    requestAnimationFrame(() => {
      this.syncItemHeight();
      if (this.items.length > 0) {
        this.setAbsoluteIndex(this.centeredIndex(this.randomItemIndex()), false);
      }
      this.cdr.markForCheck();
    });
  }

  getImage(item: MkItem): string {
    return `assets/images/${item.image}`;
  }

  spin(name: string, duration = this.defaultSpinDuration): Promise<number> {
    if (!this.items.length || this.animating) {
      return Promise.resolve(this.currentItemIndex());
    }

    return this.ensureLayout().then(() => {
      if (this.itemHeight <= 0) {
        return this.currentItemIndex();
      }

      let targetIndex = this.getItemByName(name);
      if (targetIndex < 0) {
        targetIndex = this.randomItemIndex();
      }

      const fullSpins = this.pickFullSpins();
      const currentMod = this.mod(this.absoluteIndex, this.items.length);
      let stepsToTarget = this.mod(targetIndex - currentMod, this.items.length);
      if (stepsToTarget === 0) {
        stepsToTarget = this.items.length;
      }

      let endAbsolute =
        this.absoluteIndex + fullSpins * this.items.length + stepsToTarget;
      const maxAbsolute = this.reelItems.length - 1;
      if (endAbsolute > maxAbsolute) {
        endAbsolute = maxAbsolute;
      }

      const startY = this.indexToTranslate(this.absoluteIndex);
      const endY = this.indexToTranslate(endAbsolute);
      const spinDuration = duration + Math.floor(Math.random() * 800) - 400;

      this.spinning.set(true);
      ContainerComponent.spinAudio.currentTime = 0;
      void ContainerComponent.spinAudio.play();

      const animate = this.useCssTransition
        ? this.animateWithCssTransition(endY, spinDuration)
        : this.animateTo(startY, endY, spinDuration);

      return animate.then(() => {
        this.absoluteIndex = endAbsolute;
        this.normalizePosition(targetIndex);
        this.spinning.set(false);
        return targetIndex;
      });
    });
  }

  private rebuildReel(): void {
    this.reelItems = [];
    for (let copy = 0; copy < this.reelCopies; copy++) {
      this.reelItems.push(...this.items);
    }
  }

  private pickFullSpins(): number {
    const n = this.items.length;
    if (n === 0) {
      return MIN_FULL_SPINS;
    }

    const maxRunway = this.reelItems.length - 1 - this.absoluteIndex;
    const allowed = Math.floor(maxRunway / n) - 1;
    const desired =
      MIN_FULL_SPINS +
      Math.floor(Math.random() * (this.maxFullSpins - MIN_FULL_SPINS + 1));
    return Math.max(1, Math.min(desired, allowed));
  }

  private syncItemHeight(): void {
    const root = this.container.nativeElement;
    const firstItem = root.querySelector(
      '.mk-reel-item'
    ) as HTMLElement | null;
    const windowEl = root.querySelector('.mk-slot-window') as HTMLElement | null;
    const measured =
      firstItem?.offsetHeight || windowEl?.clientHeight || root.clientHeight;

    if (measured > 0 && measured !== this.itemHeight) {
      this.itemHeight = measured;
      root.style.setProperty('--slot-item-height', `${measured}px`);
    }
  }

  private ensureLayout(): Promise<void> {
    return new Promise((resolve) => {
      let attempts = 0;
      const tryMeasure = () => {
        this.syncItemHeight();
        if (this.itemHeight > 0 || attempts >= 10) {
          resolve();
          return;
        }
        attempts++;
        requestAnimationFrame(tryMeasure);
      };
      tryMeasure();
    });
  }

  private centeredIndex(itemIndex: number): number {
    return this.centerCopy * this.items.length + itemIndex;
  }

  private randomItemIndex(): number {
    return Math.floor(Math.random() * this.items.length);
  }

  private currentItemIndex(): number {
    return this.mod(this.absoluteIndex, this.items.length);
  }

  private getItemByName(name: string): number {
    return this.items.findIndex((item) => item.name === name);
  }

  private mod(value: number, divisor: number): number {
    return ((value % divisor) + divisor) % divisor;
  }

  private indexToTranslate(index: number): number {
    return -index * this.itemHeight;
  }

  private applyTransform(y: number): void {
    this.reel.nativeElement.style.transform = `translate3d(0, ${y}px, 0)`;
  }

  private setAbsoluteIndex(index: number, _animate: boolean): void {
    if (this.itemHeight <= 0) {
      return;
    }

    this.absoluteIndex = index;
    this.applyTransform(this.indexToTranslate(index));
  }

  private normalizePosition(targetIndex: number): void {
    const normalizedIndex = this.centeredIndex(targetIndex);
    this.absoluteIndex = normalizedIndex;
    this.applyTransform(this.indexToTranslate(normalizedIndex));
  }

  private animateWithCssTransition(
    endY: number,
    duration: number
  ): Promise<void> {
    this.animating = true;
    cancelAnimationFrame(this.animationFrame);

    const el = this.reel.nativeElement;
    el.style.transition = 'none';

    return new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) {
          return;
        }
        settled = true;
        el.removeEventListener('transitionend', finish);
        window.clearTimeout(fallback);
        el.style.transition = '';
        this.animating = false;
        resolve();
      };

      el.addEventListener('transitionend', finish);
      const fallback = window.setTimeout(finish, duration + 120);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = `transform ${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`;
          this.applyTransform(endY);
        });
      });
    });
  }

  private animateTo(
    startY: number,
    endY: number,
    duration: number
  ): Promise<void> {
    this.animating = true;
    cancelAnimationFrame(this.animationFrame);

    return new Promise((resolve) => {
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutQuart(t);
        const currentY = startY + (endY - startY) * eased;

        this.applyTransform(currentY);

        if (t < 1) {
          this.animationFrame = requestAnimationFrame(step);
          return;
        }

        this.applyTransform(endY);
        this.animating = false;
        resolve();
      };

      this.animationFrame = requestAnimationFrame(step);
    });
  }
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}
