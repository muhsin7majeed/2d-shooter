import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RenderedEnemy } from '../types/enemy';

export const renderedEnemiesAtom = atom<RenderedEnemy[]>([]);

export const useSetRenderedEnemiesAtom = () => useSetAtom(renderedEnemiesAtom);

export const useEnemiesAtom = () => useAtom(renderedEnemiesAtom);

export const useEnemiesAtomValue = () => useAtomValue(renderedEnemiesAtom);
