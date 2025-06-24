import { sound } from '@pixi/sound';
import { useMusicVolumeAtomValue } from '../atoms/gameplayAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { MUSIC_TRACKS } from '../data/gameplay';
import VolumeControls from './VolumeControls';
import { useCurrentPlayerJetAtomValue, useSetPlayerHealthAtom } from '../atoms/playerAtom';
import StarfieldBackground from './StarfieldWrapper';

const GameMenu = () => {
  const setGameState = useSetGameState();
  const setPlayerHealth = useSetPlayerHealthAtom();
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
    <StarfieldBackground contentClassName="game-menu">
      <img className="game-menu-logo" src="./assets/player_jets/player_jet_1.png" alt="logo" />

      <h1>World's On Fire</h1>

      <div className="game-menu-buttons">
        <button className="nes-btn is-success" onClick={startGame}>
          Start Game
        </button>

        <button
          type="button"
          className="nes-btn"
          onClick={() => {
            (document.getElementById('dialog-default') as HTMLDialogElement)?.showModal();
          }}
        >
          Settings
        </button>
      </div>

      <section>
        <dialog className="nes-dialog" id="dialog-default">
          <menu className="dialog-menu">
            <VolumeControls />

            <button
              className="nes-btn"
              onClick={() => {
                (document.getElementById('dialog-default') as HTMLDialogElement)?.close();
              }}
            >
              Close
            </button>
          </menu>
        </dialog>
      </section>
    </StarfieldBackground>
  );
};

export default GameMenu;
