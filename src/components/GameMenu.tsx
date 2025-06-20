import { sound } from '@pixi/sound';
import { useMusicVolumeAtomValue } from '../atoms/gameplayAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { MUSIC_TRACKS } from '../data/gameplay';
import VolumeControls from './VolumeControls';
import { useCurrentPlayerJetAtomValue, useSetPlayerHealth } from '../atoms/playerAtom';

const GameMenu = () => {
  const setGameState = useSetGameState();
  const setPlayerHealth = useSetPlayerHealth();
  const musicVolume = useMusicVolumeAtomValue();
  const currentPlayerJet = useCurrentPlayerJetAtomValue();

  const startGame = () => {
    setPlayerHealth(currentPlayerJet.health);
    setGameState('playing');

    if (musicVolume) {
      sound.play(MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)].id, {
        loop: true,
        volume: musicVolume,
      });
    }
  };

  return (
    <div className="game-menu">
      <h1>World's On Fire</h1>
      <button onClick={startGame}>Start Game</button>

      <VolumeControls />
    </div>
  );
};

export default GameMenu;
