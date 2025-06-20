import { sound } from '@pixi/sound';
import { useEffectsVolumeAtomValue } from '../atoms/gameplayAtom';

const useSound = () => {
  const effectsVolume = useEffectsVolumeAtomValue();

  const playSound = (soundName: string) => {
    if (effectsVolume) {
      sound.play(soundName, {
        volume: effectsVolume,
      });
    }
  };

  return { playSound };
};

export default useSound;
