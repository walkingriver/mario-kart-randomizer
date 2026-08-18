export enum GameVersion {
  MK7 = 1,
  MK8 = 2,
  MK8D = 4,
}

export const GAME_VERSION_LABELS: Record<GameVersion, string> = {
  [GameVersion.MK7]: 'Mario Kart 7',
  [GameVersion.MK8]: 'Mario Kart 8',
  [GameVersion.MK8D]: 'Mario Kart 8 Deluxe',
};

export const GAME_VERSION_OPTIONS: GameVersion[] = [
  GameVersion.MK7,
  GameVersion.MK8,
  GameVersion.MK8D,
];
