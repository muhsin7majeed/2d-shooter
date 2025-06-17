import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Sprite } from 'pixi.js';

const missilesAtom = atom<Sprite[]>([]);

export const useSetMissilesAtom = () => useSetAtom(missilesAtom);
export const useMissilesAtom = () => useAtom(missilesAtom);
export const useMissileAtomValue = () => useAtomValue(missilesAtom);

export type MissileType = 'missile_2' | 'missile_3';

const currentMissileAtom = atom<MissileType | 'missile_1'>('missile_1');

export const useSetCurrentMissileAtom = () => useSetAtom(currentMissileAtom);
export const useCurrentMissileAtom = () => useAtom(currentMissileAtom);
export const useCurrentMissileAtomValue = () => useAtomValue(currentMissileAtom);
