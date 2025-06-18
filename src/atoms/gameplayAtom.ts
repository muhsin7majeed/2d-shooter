import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const effectsVolume = atomWithStorage('effects_volume', 1);

export const useEffectsVolumeAtom = () => {
  return useAtom(effectsVolume);
};

export const useEffectsVolumeAtomValue = () => {
  return useAtomValue(effectsVolume);
};

export const useSetEffectsVolumeAtom = () => {
  return useSetAtom(effectsVolume);
};

const musicVolume = atomWithStorage('music_volume', 1);

export const useMusicVolumeAtom = () => {
  return useAtom(musicVolume);
};

export const useMusicVolumeAtomValue = () => {
  return useAtomValue(musicVolume);
};

export const useSetMusicVolumeAtom = () => {
  return useSetAtom(musicVolume);
};
