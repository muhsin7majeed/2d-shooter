import { EnemyMissileType } from './missile';

export interface JetTypeInterface {
  speed: number;
  scale: number;
}

export interface PlayerJetTypeInterface extends JetTypeInterface {
  name: 'player_jet_1';
}

export interface EnemyJetTypeInterface extends JetTypeInterface {
  name: 'enemy_1' | 'enemy_2' | 'enemy_3';
  spawnInterval: number;
  spawnAfterScore: number;
  missile?: EnemyMissileType;
}
