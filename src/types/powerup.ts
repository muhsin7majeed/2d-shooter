export interface DefensePowerUpType {
  name: 'health' | 'shield';
  health?: number;
  shield?: number;
  spawnInterval: number;
  speed: number;
  scale: number;
}
