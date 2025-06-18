import { sound } from '@pixi/sound';
import { useEffectsVolumeAtom, useMusicVolumeAtom } from '../atoms/gameplayAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { MUSIC_TRACKS } from '../data/gameplay';

const GameMenu = () => {
  const setGameState = useSetGameState();
  const [effectsVolume, setEffectsVolume] = useEffectsVolumeAtom();
  const [musicVolume, setMusicVolume] = useMusicVolumeAtom();

  const startGame = () => {
    setGameState('playing');

    if (musicVolume) {
      sound.play(MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)].id, {
        loop: true,
        volume: musicVolume,
      });
    }
  };

  const handleEffectsVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEffectsVolume(Number(e.target.value));
  };

  const handleMusicVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicVolume(Number(e.target.value));
  };

  return (
    <div className="game-menu">
      <h1>World's On Fire</h1>
      <button onClick={startGame}>Start Game</button>

      <div className="controls">
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
    </div>
  );
};

export default GameMenu;
