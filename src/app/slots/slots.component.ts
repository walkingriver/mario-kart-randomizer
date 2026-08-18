import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MarioService } from '../mario.service';
import { MkItem } from '../mk-item';
import { KartSettings } from '../kart-settings';
import {
  GAME_VERSION_LABELS,
  GAME_VERSION_OPTIONS,
  GameVersion,
} from '../game-version.enum';
import { SettingsService } from '../settings.service';
import { VehicleType } from '../vehicle-type.enum';
import { Character } from '../character';
import { Vehicle } from '../vehicle';
import { ContainerComponent } from '../container/container.component';
import { getSlotPerformanceProfile } from '../browser-capabilities';

@Component({
  selector: 'app-slots',
  imports: [ContainerComponent, FormsModule],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
  standalone: true,
})
export class SlotsComponent implements OnInit, OnDestroy {
  public characters: Character[];
  public vehicles: Vehicle[];
  public wheels: MkItem[];
  public gliders: MkItem[];

  public players = [
    { name: 'Player 1', color: 'warning' },
    { name: 'Player 2', color: 'primary' },
    { name: 'Player 3', color: 'danger' },
    { name: 'Player 4', color: 'success' },
  ];

  public gameVersionOptions = GAME_VERSION_OPTIONS;
  public gameVersionLabels = GAME_VERSION_LABELS;
  public boardKey = 0;

  @ViewChildren('character')
  private characterSpinners!: QueryList<ContainerComponent>;
  @ViewChildren('vehicle')
  private vehicleSpinners!: QueryList<ContainerComponent>;
  @ViewChildren('wheel')
  private wheelSpinners!: QueryList<ContainerComponent>;
  @ViewChildren('glider')
  private gliderSpinners!: QueryList<ContainerComponent>;

  private settings!: KartSettings;
  private navigationSub?: Subscription;
  private readonly perf = getSlotPerformanceProfile();

  constructor(
    private mario: MarioService,
    private settingsService: SettingsService,
    private router: Router
  ) {
    this.characters = [];
    this.vehicles = [];
    this.wheels = [];
    this.gliders = [];
    this.reloadCatalog();
  }

  ngOnInit(): void {
    this.navigationSub = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        filter((event) => event.urlAfterRedirects.includes('/slots'))
      )
      .subscribe(() => this.reloadCatalog());
  }

  ngOnDestroy(): void {
    this.navigationSub?.unsubscribe();
  }

  private reloadCatalog(): void {
    this.settings = this.settingsService.loadSettings();
    this.characters = this.mario.getAllCharacters();
    this.vehicles = this.mario.getAllVehicles();
    this.wheels = this.mario.getAllWheels();
    this.gliders = this.mario.getAllGliders();
  }

  get selectedGameVersion(): GameVersion {
    return this.settings.gameVersion;
  }

  onGameChange(version: GameVersion): void {
    if (version === this.settings.gameVersion) {
      return;
    }

    this.settings = { ...this.settings, gameVersion: version };
    if (version === GameVersion.MK7) {
      this.settings.allowedVehicles &= ~VehicleType.ATV;
    }
    this.settingsService.saveSettings(this.settings);
    this.reloadCatalog();
    this.boardKey++;
  }

  async shuffleItems(player?: number): Promise<void> {
    const shuffleCount = player !== undefined && player > -1 ? 1 : this.players.length;

    const characters = this.randomizeCharacters(shuffleCount);
    const vehicles = this.randomizeVehicles(shuffleCount);
    const wheels = this.randomizeWheels(shuffleCount);
    const gliders = this.randomizeGliders(shuffleCount);

    if (shuffleCount === 1 && player !== undefined) {
      const charSpinner = this.characterSpinners.find((_, i) => i === player);
      const vehicleSpinner = this.vehicleSpinners.find((_, i) => i === player);
      const wheelSpinner = this.wheelSpinners.find((_, i) => i === player);
      const gliderSpinner = this.gliderSpinners.find((_, i) => i === player);
      if (!charSpinner || !vehicleSpinner || !wheelSpinner || !gliderSpinner) {
        return;
      }
      const row = [
        () => charSpinner.spin(characters[0].name),
        () => vehicleSpinner.spin(vehicles[0].name),
        () => wheelSpinner.spin(wheels[0].name),
        () => gliderSpinner.spin(gliders[0].name),
      ];
      await this.runSpins(row);
      return;
    }

    const row = flatten(
      this.characterSpinners.map((spinner, i) => () =>
        spinner.spin(characters[i].name)
      ),
      this.vehicleSpinners.map((spinner, i) => () =>
        spinner.spin(vehicles[i].name)
      ),
      this.wheelSpinners.map((spinner, i) => () => spinner.spin(wheels[i].name)),
      this.gliderSpinners.map((spinner, i) => () => spinner.spin(gliders[i].name))
    );
    await this.runSpins(row);
  }

  private async runSpins(
    spins: Array<() => Promise<number>>
  ): Promise<void> {
    if (this.perf.staggerMs <= 0) {
      await Promise.all(spins.map((spin) => spin()));
      return;
    }

    for (let i = 0; i < spins.length; i++) {
      await spins[i]();
      if (i < spins.length - 1) {
        await delay(this.perf.staggerMs);
      }
    }
  }

  async shuffleCharacter(spinner: ContainerComponent): Promise<void> {
    const characters = this.randomizeCharacters(1);
    await spinner.spin(characters[0].name);
  }

  async shuffleVehicle(spinner: ContainerComponent): Promise<void> {
    const vehicles = this.randomizeVehicles(1);
    await spinner.spin(vehicles[0].name);
  }

  async shuffleWheel(spinner: ContainerComponent): Promise<void> {
    const wheels = this.randomizeWheels(1);
    await spinner.spin(wheels[0].name);
  }

  async shuffleGlider(spinner: ContainerComponent): Promise<void> {
    const gliders = this.randomizeGliders(1);
    await spinner.spin(gliders[0].name);
  }

  randomizeCharacters(count: number): MkItem[] {
    const characters = this.characters.filter(
      (c) => (c.size & this.settings.allowedCharacters) === c.size
    );
    return this.randomize(characters, count);
  }

  randomizeVehicles(count: number): MkItem[] {
    const vehicles = this.vehicles.filter(
      (v) => (v.type & this.settings.allowedVehicles) === v.type
    );
    return this.randomize(vehicles, count);
  }

  randomizeWheels(count: number): MkItem[] {
    return this.randomize(this.wheels, count);
  }

  randomizeGliders(count: number): MkItem[] {
    return this.randomize(this.gliders, count);
  }

  randomize(list: MkItem[], count: number): MkItem[] {
    if (!list.length) {
      return [];
    }
    return this.settings.allowDuplicates
      ? randomList(list, count)
      : shuffle(list).slice(0, count);
  }
}

function flatten<T>(...arr: T[][]): T[] {
  return arr.reduce((previous, current) => previous.concat(current));
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}

function randomList<T>(arr: T[], count: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(Math.random() * arr.length);
    result.push(arr[r]);
  }
  return result;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
