import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Sprite } from 'pixi.js';

export const missilesAtom = atom<Sprite[]>([]);

export const useSetMissilesAtom = () => useSetAtom(missilesAtom);

export const useMissilesAtom = () => useAtom(missilesAtom);

export const useMissileAtomValue = () => useAtomValue(missilesAtom);
