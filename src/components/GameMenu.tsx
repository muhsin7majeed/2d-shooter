import { sound } from '@pixi/sound';
import { useMusicVolumeAtomValue } from '../atoms/gameplayAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { MUSIC_TRACKS } from '../data/gameplay';
import VolumeControls from './VolumeControls';
import { useCurrentPlayerJetAtomValue, useSetPlayerHealthAtom } from '../atoms/playerAtom';
import StarfieldBackground from './StarfieldWrapper';
import GameCredits from './GameCredits';

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

        <button
          type="button"
          className="nes-btn"
          onClick={() => {
            (document.getElementById('dialog-credits') as HTMLDialogElement)?.showModal();
          }}
        >
          Credits
        </button>
      </div>

      <section>
        <dialog className="nes-dialog" id="dialog-default">
          <h1>Settings</h1>
          <hr />

          <VolumeControls />
          <menu className="dialog-menu">
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

      <section>
        <dialog className="nes-dialog" id="dialog-credits">
          <GameCredits />

          <menu>
            <button
              className="nes-btn"
              onClick={() => {
                (document.getElementById('dialog-credits') as HTMLDialogElement)?.close();
              }}
            >
              Close
            </button>
          </menu>
        </dialog>
      </section>

      <section className="social-links">
        <a href="https://github.com/muhsin7majeed/worlds-on-fire" target="_blank" rel="noopener noreferrer">
          <i className="nes-icon github" />
        </a>
      </section>
    </StarfieldBackground>
  );
};

export default GameMenu;
