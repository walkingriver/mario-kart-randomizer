import { GameVersion } from './game-version.enum';

export interface MkItem {
  name: string;
  image: string;
  games: GameVersion;
}
