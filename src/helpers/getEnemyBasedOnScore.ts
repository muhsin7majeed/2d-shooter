import { ENEMY_TYPES } from '../data/enemies';

export const getEnemyBasedOnScore = (score: number) => {
  for (let i = ENEMY_TYPES.length - 1; i >= 0; i--) {
    if (score >= ENEMY_TYPES[i].spawnAfterScore) {
      return ENEMY_TYPES[i];
    }
  }
  return ENEMY_TYPES[0];
};
