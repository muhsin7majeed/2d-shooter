import { useEffectsVolumeAtom, useMusicVolumeAtom } from '../atoms/gameplayAtom';

const VolumeControls = () => {
  const [effectsVolume, setEffectsVolume] = useEffectsVolumeAtom();
  const [musicVolume, setMusicVolume] = useMusicVolumeAtom();

  const handleEffectsVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEffectsVolume(Number(e.target.value));
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicVolume(Number(e.target.value));
  };

  return (
    <div className="volume-controls">
      <div>
        <label htmlFor="effects_volume">Effects Volume</label>
        <input
          type="range"
          id="effects_volume"
          min="0"
          max="1"
          step="0.1"
          value={effectsVolume}
          onChange={handleEffectsVolumeChange}
        />
      </div>

      <div>
        <label htmlFor="music_volume">Music Volume</label>
        <input
          type="range"
          id="music_volume"
          min="0"
          max="1"
          step="0.1"
          value={musicVolume}
          onChange={handleMusicVolumeChange}
        />
      </div>
    </div>
  );
};

export default VolumeControls;
