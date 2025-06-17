import { useSetGameState } from '../atoms/gameStateAtom';
import { useHighScoreAtomValue, useScoreAtomValue } from '../atoms/scoreAtom';

const GameOver = () => {
  const score = useScoreAtomValue();
  const highScore = useHighScoreAtomValue();
  const setGameState = useSetGameState();

  const handleReset = () => {
    setGameState('menu');
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
