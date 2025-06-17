import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Container, Sprite } from 'pixi.js';
import { MISSILE_TYPES, MissileTypeInterface } from '../data/missiles';

export interface Missile {
  sprite: Sprite;
  data: MissileTypeInterface;
}

const missilesAtom = atom<Missile[]>([]);

export const useSetMissilesAtom = () => useSetAtom(missilesAtom);
export const useMissilesAtom = () => useAtom(missilesAtom);
export const useMissileAtomValue = () => useAtomValue(missilesAtom);

const currentMissileAtom = atom<MissileTypeInterface>(MISSILE_TYPES[0]);

export const useSetCurrentMissileAtom = () => useSetAtom(currentMissileAtom);
export const useCurrentMissileAtom = () => useAtom(currentMissileAtom);
export const useCurrentMissileAtomValue = () => useAtomValue(currentMissileAtom);

const missileContainerRefAtom = atom<Container | null>(null);

export const useSetMissileContainerRefAtom = () => useSetAtom(missileContainerRefAtom);
export const useMissileContainerRefAtom = () => useAtom(missileContainerRefAtom);
export const useMissileContainerRefAtomValue = () => useAtomValue(missileContainerRefAtom);
