import { atom, useSetAtom, useAtom, useAtomValue } from 'jotai';
import { Sprite } from 'pixi.js';
import { PlayerJetTypeInterface } from '../types/player';
import { PLAYER_JETS } from '../data/player';

export const playerRefAtom = atom<Sprite | null>(null);

export const usePlayerRefAtom = () => useAtom(playerRefAtom);
export const usePlayerRefAtomValue = () => useAtomValue(playerRefAtom);
export const useSetPlayerRefAtom = () => useSetAtom(playerRefAtom);

const playerHealthAtom = atom(PLAYER_JETS[0].health);

export const usePlayerHealthAtom = () => useAtom(playerHealthAtom);
export const usePlayerHealthAtomValue = () => useAtomValue(playerHealthAtom);
export const useSetPlayerHealthAtom = () => useSetAtom(playerHealthAtom);

const currentPlayerJetAtom = atom<PlayerJetTypeInterface>(PLAYER_JETS[0]);

export const useCurrentPlayerJetAtom = () => useAtom(currentPlayerJetAtom);
export const useCurrentPlayerJetAtomValue = () => useAtomValue(currentPlayerJetAtom);
export const useSetCurrentPlayerJetAtom = () => useSetAtom(currentPlayerJetAtom);
