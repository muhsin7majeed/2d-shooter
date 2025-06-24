import { PlayerMissileType } from '../types/player';
import { DefensePowerUpType } from '../types/powerup';
import { MISSILE_TYPES } from './missiles';

export const POWERUP_TYPES: {
  Offense: {
    name: 'offense';
    options: PlayerMissileType[];
  };
  Defense: {
    name: 'defense';
    options: DefensePowerUpType[];
  };
} = {
  Offense: {
    name: 'offense',
    options: MISSILE_TYPES.Player.filter((missile) => missile.name !== MISSILE_TYPES.Player[0].name),
  },
  Defense: {
    name: 'defense',
    options: [
      {
        name: 'health',
        health: 15,
        spawnInterval: 1000,
        speed: 2,
        scale: 1,
      },
      {
        name: 'shield',
        shield: 100,
        spawnInterval: 1000,
        speed: 2,
        scale: 1,
      },
    ],
  },
} as const;
