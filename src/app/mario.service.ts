import { Injectable } from '@angular/core';
import { Character } from './character';
import { MkItem } from './mk-item';
import { Vehicle } from './vehicle';
import { GameVersion } from './game-version.enum';
import { isInGame } from './game-version.util';
import {
  CHARACTERS,
  GLIDERS,
  VEHICLES,
  WHEELS,
} from './data/mario-catalog';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class MarioService {
  constructor(private settingsService: SettingsService) {}

  getAllCharacters(): Character[] {
    return this.forGame(CHARACTERS);
  }

  getAllVehicles(): Vehicle[] {
    return this.forGame(VEHICLES);
  }

  getAllWheels(): MkItem[] {
    return this.forGame(WHEELS);
  }

  getAllGliders(): MkItem[] {
    return this.forGame(GLIDERS);
  }

  getGameVersion(): GameVersion {
    return this.settingsService.loadSettings().gameVersion;
  }

  private forGame<T extends { games: GameVersion }>(items: T[]): T[] {
    const version = this.getGameVersion();
    return items.filter((item) => isInGame(item.games, version));
  }
}
