import { Injectable } from '@angular/core';
import { KartSettings } from './kart-settings';
import { CharacterSize } from './character-size.enum';
import { VehicleType } from './vehicle-type.enum';

const STORAGE_KEY = 'kart-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public static defaultSettings: KartSettings = {
    allowedCharacters:
      CharacterSize.Small |
      CharacterSize.Medium |
      CharacterSize.Large |
      CharacterSize.Mii,
    allowedVehicles: VehicleType.Kart | VehicleType.Bike | VehicleType.ATV,
    allowDuplicates: true,
  };

  loadSettings(): KartSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...SettingsService.defaultSettings };
      }
      return {
        ...SettingsService.defaultSettings,
        ...JSON.parse(raw),
      };
    } catch {
      return { ...SettingsService.defaultSettings };
    }
  }

  saveSettings(settings: KartSettings): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }
}
