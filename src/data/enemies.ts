export interface EnemyTypeInterface {
  label: 'enemy_1' | 'enemy_2' | 'enemy_3';
  texture: string;
  speed: number;
  scale: number;
  spawnInterval: number;
  spawnAfterScore: number;
}

export const ENEMY_TYPES: EnemyTypeInterface[] = [
  {
    label: 'enemy_1',
    texture: 'enemy_1',
    speed: 2,
    scale: 2,
    spawnInterval: 2000,
    spawnAfterScore: 0,
  },
  {
    label: 'enemy_2',
    texture: 'enemy_2',
    speed: 3,
    scale: 2.5,
    spawnInterval: 1000,
    spawnAfterScore: 10,
  },
  {
    label: 'enemy_3',
    texture: 'enemy_3',
    speed: 5,
    scale: 3,
    spawnInterval: 500,
    spawnAfterScore: 20,
  },
];
