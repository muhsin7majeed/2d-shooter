import { Sprite } from 'pixi.js';
import { JetTypeInterface, MissileType } from './common';

export interface RenderedEnemy {
  sprite: Sprite;
  data: EnemyJetTypeInterface;
}

export interface RenderedEnemyMissile {
  sprite: Sprite;
  data: {
    velocityX: number;
    velocityY: number;
    damage: number;
  };
}

export interface EnemyJetTypeInterface extends JetTypeInterface {
  name: 'enemy_1' | 'enemy_2' | 'enemy_3';
  spawnInterval: number;
  spawnAfterScore: number;
  missile?: EnemyMissileType;
  damage: number;
}

export interface EnemyMissileType extends MissileType {
  name: 'enemy_1_missile_1';
}
