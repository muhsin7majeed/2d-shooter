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
