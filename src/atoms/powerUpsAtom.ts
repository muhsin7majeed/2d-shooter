import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { RenderedPowerUp } from '../types/player';

const renderedPowerUpsAtom = atom<RenderedPowerUp[]>([]);

export const useRenderedPowerUpsAtom = () => useAtom(renderedPowerUpsAtom);
export const useRenderedPowerUpsAtomValue = () => useAtomValue(renderedPowerUpsAtom);
export const useSetRenderedPowerUpsAtom = () => useSetAtom(renderedPowerUpsAtom);
