import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Sprite } from 'pixi.js';
import { EnemyTypeInterface } from '../data/enemies';

export interface Enemy {
  sprite: Sprite;
  data: EnemyTypeInterface;
}

export const enemiesAtom = atom<Enemy[]>([]);

export const useSetEnemiesAtom = () => useSetAtom(enemiesAtom);

export const useEnemiesAtom = () => useAtom(enemiesAtom);

export const useEnemiesAtomValue = () => useAtomValue(enemiesAtom);
