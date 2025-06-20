import { useSetRenderedEnemiesAtom } from '../atoms/enemiesAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { useSetCurrentPlayerMissileAtom, useSetRenderedPlayerMissilesAtom } from '../atoms/missileAtom';
import { useHighScoreAtomValue, useScoreAtomValue, useSetScoreAtom } from '../atoms/scoreAtom';
import { sound } from '@pixi/sound';
import { MISSILE_TYPES } from '../data/missiles';

const GameOver = () => {
  const score = useScoreAtomValue();
  const highScore = useHighScoreAtomValue();

  const setGameState = useSetGameState();
  const setRenderedPlayerMissiles = useSetRenderedPlayerMissilesAtom();
  const setRenderedEnemies = useSetRenderedEnemiesAtom();
  const setScore = useSetScoreAtom();
  const setCurrentPlayerMissileAtom = useSetCurrentPlayerMissileAtom();

  const handleReset = () => {
    setRenderedPlayerMissiles([]);
    setRenderedEnemies([]);
    setScore(0);
    setCurrentPlayerMissileAtom(MISSILE_TYPES.Player[0]);
    setGameState('menu');

    sound.stopAll();
  };

  return (
    <div className="game-over">
      <div className="game-over-title">Game Over</div>
      <div className="game-over-score">Score: {score}</div>
      <div className="game-over-high-score">High Score: {highScore}</div>

      <button onClick={handleReset}>Menu</button>
    </div>
  );
};

export default GameOver;
