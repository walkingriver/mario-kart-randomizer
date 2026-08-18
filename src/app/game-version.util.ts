import { GameVersion } from './game-version.enum';

export const MK7 = GameVersion.MK7;
export const MK8 = GameVersion.MK8;
export const MK8D = GameVersion.MK8D;
export const MK78 = MK7 | MK8;
export const MK8_DELUXE = MK8 | MK8D;
export const ALL_GAMES = MK7 | MK8 | MK8D;

export function isInGame(itemGames: GameVersion, selected: GameVersion): boolean {
  return (itemGames & selected) !== 0;
}
