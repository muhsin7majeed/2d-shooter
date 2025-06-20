import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { MISSILE_TYPES } from '../data/missiles';
import { PlayerMissileType, RenderedPlayerMissile } from '../types/player';

const renderedPlayerMissileAtoms = atom<RenderedPlayerMissile[]>([]);

export const useRenderedPlayerMissilesAtom = () => useAtom(renderedPlayerMissileAtoms);
export const useRenderedPlayerMissilesAtomValue = () => useAtomValue(renderedPlayerMissileAtoms);
export const useSetRenderedPlayerMissilesAtom = () => useSetAtom(renderedPlayerMissileAtoms);

const currentPlayerMissileAtom = atom<PlayerMissileType>(MISSILE_TYPES.Player[0]);

export const useCurrentPlayerMissileAtom = () => useAtom(currentPlayerMissileAtom);
export const useCurrentPlayerMissileAtomValue = () => useAtomValue(currentPlayerMissileAtom);
export const useSetCurrentPlayerMissileAtom = () => useSetAtom(currentPlayerMissileAtom);
