import { Sprite } from 'pixi.js';
import { EnemyJetTypeInterface } from './jet';

export interface RenderedEnemy {
  sprite: Sprite;
  data: EnemyJetTypeInterface;
}
