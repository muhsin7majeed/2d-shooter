import { EnemyMissileType } from '../types/enemy';
import { PlayerMissileType } from '../types/player';

export const MISSILE_TYPES: {
  Player: PlayerMissileType[];
  Enemy: EnemyMissileType[];
} = {
  Player: [
    {
      name: 'missile_1',
      speed: 2,
      damage: 100,
      scale: 1,
      fireInterval: 500,
    },
    {
      name: 'missile_2',
      speed: 7,
      damage: 150,
      scale: 1.2,
      fireInterval: 300,
    },
    {
      name: 'missile_3',
      speed: 5,
      damage: 200,
      scale: 1.5,
      fireInterval: 400,
    },
  ],
  Enemy: [
    {
      name: 'enemy_1_missile_1',
      speed: 0.5,
      damage: 15,
      scale: 1,
      fireInterval: 2000,
    },
    {
      name: 'enemy_1_missile_1',
      speed: 0.5,
      damage: 20,
      scale: 1,
      fireInterval: 1000,
    },
  ],
} as const;
