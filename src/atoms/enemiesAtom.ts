import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RenderedEnemy, RenderedEnemyMissile } from '../types/enemy';
import { Container } from 'pixi.js';

const renderedEnemiesAtom = atom<RenderedEnemy[]>([]);

export const useSetRenderedEnemiesAtom = () => useSetAtom(renderedEnemiesAtom);
export const useRenderedEnemiesAtom = () => useAtom(renderedEnemiesAtom);
export const useRenderedEnemiesAtomValue = () => useAtomValue(renderedEnemiesAtom);

const renderedEnemyMissilesAtom = atom<RenderedEnemyMissile[]>([]);

export const useSetRenderedEnemyMissilesAtom = () => useSetAtom(renderedEnemyMissilesAtom);
export const useRenderedEnemyMissilesAtom = () => useAtom(renderedEnemyMissilesAtom);
export const useRenderedEnemyMissilesAtomValue = () => useAtomValue(renderedEnemyMissilesAtom);

const enemyMissileContainerRefAtom = atom<Container | null>(null);

export const useEnemyMissileContainerRefAtom = () => useAtom(enemyMissileContainerRefAtom);
export const useEnemyMissileContainerRefAtomValue = () => useAtomValue(enemyMissileContainerRefAtom);
export const useSetEnemyMissileContainerRefAtom = () => useSetAtom(enemyMissileContainerRefAtom);
