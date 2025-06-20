import { Sprite } from 'pixi.js';

export interface MissileType {
  speed: number;
  damage: number;
  scale: number;
  fireInterval: number;
}

export interface EnemyMissileType extends MissileType {
  name: 'enemy_1_missile_1';
}

export interface PlayerMissileType extends MissileType {
  name: 'missile_1' | 'missile_2' | 'missile_3';
}

export interface RenderedPlayerMissile {
  sprite: Sprite;
  data: PlayerMissileType;
}
