export interface MissileTypeInterface {
  label: 'missile_1' | 'missile_2' | 'missile_3';
  texture: string;
  speed: number;
  damage: number;
  scale: number;
  fireInterval: number;
}

export const MISSILE_TYPES: MissileTypeInterface[] = [
  {
    label: 'missile_1',
    texture: 'missile_1',
    speed: 2,
    damage: 1,
    scale: 1,
    fireInterval: 500,
  },
  {
    label: 'missile_2',
    texture: 'missile_2',
    speed: 10,
    damage: 2,
    scale: 1.2,
    fireInterval: 100,
  },
  {
    label: 'missile_3',
    texture: 'missile_3',
    speed: 6,
    damage: 3,
    scale: 1.5,
    fireInterval: 300,
  },
];
