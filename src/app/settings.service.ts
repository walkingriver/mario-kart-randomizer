import { Injectable } from '@angular/core';
import { CharacterSize } from './character-size.enum';
import { GameVersion } from './game-version.enum';
import { VehicleType } from './vehicle-type.enum';
import { KartSettings } from './kart-settings';

const STORAGE_KEY = 'kart-settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public static defaultSettings: KartSettings = {
    gameVersion: GameVersion.MK8D,
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
      const parsed = JSON.parse(raw) as Partial<KartSettings>;
      return this.normalize({
        ...SettingsService.defaultSettings,
        ...parsed,
      });
    } catch {
      return { ...SettingsService.defaultSettings };
    }
  }

  saveSettings(settings: KartSettings): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.normalize(settings)));
  }

  private normalize(settings: KartSettings): KartSettings {
    const normalized = { ...settings };
    normalized.gameVersion = this.coerceGameVersion(normalized.gameVersion);
    if (normalized.gameVersion === GameVersion.MK7) {
      normalized.allowedVehicles &= ~VehicleType.ATV;
    }
    return normalized;
  }

  private coerceGameVersion(value: unknown): GameVersion {
    const version = Number(value);
    if (
      version === GameVersion.MK7 ||
      version === GameVersion.MK8 ||
      version === GameVersion.MK8D
    ) {
      return version;
    }
    return GameVersion.MK8D;
  }
}
