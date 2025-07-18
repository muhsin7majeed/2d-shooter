import { Sprite } from 'pixi.js';
import { JetTypeInterface, MissileType } from './common';
import { DefensePowerUpType } from './powerup';

export interface PlayerJetTypeInterface extends JetTypeInterface {
  name: 'player_jet_1';
  acceleration: number;
}

export interface PlayerMissileType extends MissileType {
  name: 'missile_1' | 'missile_2' | 'missile_3';
}

export interface RenderedPlayerMissile {
  sprite: Sprite;
  data: PlayerMissileType;
}

export interface RenderedPowerUp {
  sprite: Sprite;
  type: PlayerMissileType | DefensePowerUpType;
}
