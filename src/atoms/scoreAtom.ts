import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// Regular score atom
export const scoreAtom = atom(0);

export const useScoreAtom = () => useAtom(scoreAtom);
export const useSetScoreAtom = () => useSetAtom(scoreAtom);
export const useScoreAtomValue = () => useAtomValue(scoreAtom);

// High score atom
export const highScoreAtom = atomWithStorage('highScore', 0);

export const useHighScoreAtom = () => useAtom(highScoreAtom);
export const useSetHighScoreAtom = () => useSetAtom(highScoreAtom);
export const useHighScoreAtomValue = () => useAtomValue(highScoreAtom);
