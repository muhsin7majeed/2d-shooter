import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Sprite } from 'pixi.js';

export const enemiesAtom = atom<Sprite[]>([]);

export const useSetEnemiesAtom = () => useSetAtom(enemiesAtom);

export const useEnemiesAtom = () => useAtom(enemiesAtom);

export const useEnemiesAtomValue = () => useAtomValue(enemiesAtom);
