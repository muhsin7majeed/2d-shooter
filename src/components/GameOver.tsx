import { useSetRenderedEnemiesAtom, useSetRenderedEnemyMissilesAtom } from '../atoms/enemiesAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { useSetCurrentPlayerMissileAtom, useSetRenderedPlayerMissilesAtom } from '../atoms/missileAtom';
import { useHighScoreAtomValue, useScoreAtomValue, useSetScoreAtom } from '../atoms/scoreAtom';
import { sound } from '@pixi/sound';
import { MISSILE_TYPES } from '../data/missiles';
import { useSetCurrentPlayerJetAtom, useSetPlayerHealthAtom } from '../atoms/playerAtom';
import { PLAYER_JETS } from '../data/player';
import { useSetRenderedPowerUpsAtom } from '../atoms/powerUpsAtom';

const GameOver = () => {
  const score = useScoreAtomValue();
  const highScore = useHighScoreAtomValue();

  const setGameState = useSetGameState();
  const setRenderedPlayerMissiles = useSetRenderedPlayerMissilesAtom();
  const setRenderedEnemies = useSetRenderedEnemiesAtom();
  const setScore = useSetScoreAtom();
  const setCurrentPlayerMissileAtom = useSetCurrentPlayerMissileAtom();
  const setRenderedEnemyMissiles = useSetRenderedEnemyMissilesAtom();
  const setPlayerHealth = useSetPlayerHealthAtom();
  const setCurrentPlayerJet = useSetCurrentPlayerJetAtom();
  const setRenderedPowerUps = useSetRenderedPowerUpsAtom();

  const resetRenderedEntities = () => {
    setRenderedPlayerMissiles([]);
    setRenderedEnemies([]);
    setRenderedEnemyMissiles([]);
    setRenderedPowerUps([]);
  };

  const resetPlayer = () => {
    setPlayerHealth(PLAYER_JETS[0].health);
    setCurrentPlayerJet(PLAYER_JETS[0]);
    setCurrentPlayerMissileAtom(MISSILE_TYPES.Player[0]);
  };

  const handleReset = () => {
    resetRenderedEntities();
    resetPlayer();

    setScore(0);
    setGameState('menu');

    sound.stopAll();
  };

  return (
    <div className="game-over">
      <div className="game-over-title">Game Over!</div>
      <div className="game-over-score">Score: {score}</div>
      <div className="game-over-high-score">High Score: {highScore}</div>

      <button className="nes-btn" onClick={handleReset}>
        Menu
      </button>
    </div>
  );
};

export default GameOver;
