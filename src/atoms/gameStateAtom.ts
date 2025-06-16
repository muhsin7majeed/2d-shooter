import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

type GameState = 'menu' | 'playing' | 'gameover' | 'paused';

const gameStateAtom = atom<GameState>('menu');

export const useGameStateAtom = () => {
  return useAtom(gameStateAtom);
};

export const useGameStateValue = () => {
  const gameState = useAtomValue(gameStateAtom);

  return gameState;
};

export const useSetGameState = () => {
  const setGameState = useSetAtom(gameStateAtom);

  return setGameState;
};
