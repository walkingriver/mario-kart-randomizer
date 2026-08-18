import { CharacterSize } from './character-size.enum';
import { GameVersion } from './game-version.enum';
import { VehicleType } from './vehicle-type.enum';

export interface KartSettings {
  gameVersion: GameVersion;
  allowedCharacters: CharacterSize;
  allowedVehicles: VehicleType;
  allowDuplicates: boolean;
}
