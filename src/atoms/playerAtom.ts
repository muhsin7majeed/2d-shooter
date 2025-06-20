import { atom, useSetAtom, useAtom, useAtomValue } from 'jotai';
import { Sprite } from 'pixi.js';

export const playerRefAtom = atom<Sprite | null>(null);

export const usePlayerAtom = () => {
  return useAtom(playerRefAtom);
};

export const usePlayerRef = () => {
  return useAtomValue(playerRefAtom);
};

export const useSetPlayerRef = () => {
  return useSetAtom(playerRefAtom);
};

const playerHealthAtom = atom(100);

export const usePlayerHealth = () => {
  return useAtomValue(playerHealthAtom);
};

export const useSetPlayerHealth = () => {
  return useSetAtom(playerHealthAtom);
};

const currentPlayerJetAtom = atom<{ sprite: Sprite; data: { score: number } } | null>(null);

export const useCurrentPlayerJetAtomValue = () => {
  return useAtomValue(currentPlayerJetAtom);
};

export const useSetCurrentPlayerJetAtom = () => {
  return useSetAtom(currentPlayerJetAtom);
};
