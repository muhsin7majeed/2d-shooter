import { EnemyJetTypeInterface } from '../types/enemy';
import { MISSILE_TYPES } from './missiles';

export const ENEMY_TYPES: EnemyJetTypeInterface[] = [
  {
    name: 'enemy_1',
    speed: 2,
    scale: 2,
    spawnInterval: 2000,
    spawnAfterScore: 0,
    damage: 15,
    health: 100,
  },
  {
    name: 'enemy_2',
    speed: 2.5,
    scale: 2.5,
    spawnInterval: 1000,
    spawnAfterScore: 10,
    missile: MISSILE_TYPES.Enemy[0],
    damage: 20,
    health: 300,
  },
  {
    name: 'enemy_3',
    speed: 3,
    scale: 2.5,
    spawnInterval: 500,
    spawnAfterScore: 20,
    missile: MISSILE_TYPES.Enemy[1],
    damage: 25,
    health: 400,
  },
] as const;
