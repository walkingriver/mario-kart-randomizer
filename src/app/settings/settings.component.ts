import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterSize } from '../character-size.enum';
import { GameVersion } from '../game-version.enum';
import { VehicleType } from '../vehicle-type.enum';
import { SettingsService } from '../settings.service';
import { CanDeactivateComponent } from '../can-deactivate.guard';
import { EnumPipe } from '../enum.pipe';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [EnumPipe],
})
export class SettingsComponent
  implements OnInit, OnDestroy, CanDeactivateComponent
{
  public CharacterSize = CharacterSize;
  public VehicleType = VehicleType;

  private settings = SettingsService.defaultSettings;

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settings = this.settingsService.loadSettings();
  }

  ngOnDestroy(): void {
    this.settingsService.saveSettings(this.settings);
  }

  canDeactivate(): boolean {
    return this.isValidCharacters && this.isValidVehicles;
  }

  get isValidCharacters(): boolean {
    const required =
      CharacterSize.Small | CharacterSize.Medium | CharacterSize.Large;
    return this.isCharacterEnabled(required);
  }

  isCharacterEnabled(size: CharacterSize): boolean {
    return !!(this.settings.allowedCharacters & size);
  }

  enableCharacter(size: CharacterSize, value: boolean): void {
    if (value) {
      this.settings.allowedCharacters |= size;
    } else {
      this.settings.allowedCharacters &= ~size;
    }
  }

  get isValidVehicles(): boolean {
    return !!(this.settings.allowedVehicles & this.requiredVehicleTypes);
  }

  get requiredVehicleTypes(): VehicleType {
    return this.isMk7
      ? VehicleType.Kart | VehicleType.Bike
      : VehicleType.Kart | VehicleType.Bike | VehicleType.ATV;
  }

  get isMk7(): boolean {
    return this.settings.gameVersion === GameVersion.MK7;
  }

  isVehicleEnabled(vehicle: VehicleType): boolean {
    return !!(this.settings.allowedVehicles & vehicle);
  }

  enableVehicle(vehicle: VehicleType, value: boolean): void {
    if (value) {
      this.settings.allowedVehicles |= vehicle;
    } else {
      this.settings.allowedVehicles &= ~vehicle;
    }
  }

  isDuplicatesEnabled(): boolean {
    return this.settings.allowDuplicates;
  }

  enableDuplicates(value: boolean): void {
    this.settings.allowDuplicates = value;
  }
}
