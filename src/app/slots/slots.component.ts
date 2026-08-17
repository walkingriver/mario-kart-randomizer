import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MarioService } from '../mario.service';
import { MkItem } from '../mk-item';
import { KartSettings } from '../kart-settings';
import { SettingsService } from '../settings.service';
import { Character } from '../character';
import { Vehicle } from '../vehicle';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-slots',
  imports: [ContainerComponent],
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
  standalone: true,
})
export class SlotsComponent implements OnInit {
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

  @ViewChildren('character')
  private characterSpinners!: QueryList<ContainerComponent>;
  @ViewChildren('vehicle')
  private vehicleSpinners!: QueryList<ContainerComponent>;
  @ViewChildren('wheel')
  private wheelSpinners!: QueryList<ContainerComponent>;
  @ViewChildren('glider')
  private gliderSpinners!: QueryList<ContainerComponent>;

  private settings!: KartSettings;

  constructor(
    mario: MarioService,
    private settingsService: SettingsService
  ) {
    this.characters = mario.getAllCharacters();
    this.vehicles = mario.getAllVehicles();
    this.wheels = mario.getAllWheels();
    this.gliders = mario.getAllGliders();
  }

  ngOnInit(): void {
    this.settings = this.settingsService.loadSettings();
  }

  async shuffleItems(player?: number): Promise<void> {
    const shuffleCount = player !== undefined && player > -1 ? 1 : this.players.length;

    const characters = this.randomizeCharacters(shuffleCount);
    const vehicles = this.randomizeVehicles(shuffleCount);
    const wheels = this.randomizeWheels(shuffleCount);
    const gliders = this.randomizeGliders(shuffleCount);

    let promises: Promise<number>[];
    if (shuffleCount === 1 && player !== undefined) {
      const charSpinner = this.characterSpinners.find((_, i) => i === player);
      const vehicleSpinner = this.vehicleSpinners.find((_, i) => i === player);
      const wheelSpinner = this.wheelSpinners.find((_, i) => i === player);
      const gliderSpinner = this.gliderSpinners.find((_, i) => i === player);
      if (!charSpinner || !vehicleSpinner || !wheelSpinner || !gliderSpinner) {
        return;
      }
      promises = [
        charSpinner.spin(characters[0].name),
        vehicleSpinner.spin(vehicles[0].name),
        wheelSpinner.spin(wheels[0].name),
        gliderSpinner.spin(gliders[0].name),
      ];
    } else {
      promises = flatten(
        this.characterSpinners.map((spinner, i) =>
          spinner.spin(characters[i].name)
        ),
        this.vehicleSpinners.map((spinner, i) =>
          spinner.spin(vehicles[i].name)
        ),
        this.wheelSpinners.map((spinner, i) => spinner.spin(wheels[i].name)),
        this.gliderSpinners.map((spinner, i) => spinner.spin(gliders[i].name))
      );
    }

    await Promise.all(promises);
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
