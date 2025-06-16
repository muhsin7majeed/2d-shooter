import { useHighScoreAtomValue, useScoreAtomValue } from '../atoms/scoreAtom';

const GameOver = () => {
  const score = useScoreAtomValue();
  const highScore = useHighScoreAtomValue();

  return (
    <div className="game-over">
      <div className="game-over-title">Game Over</div>
      <div className="game-over-score">Score: {score}</div>
      <div className="game-over-high-score">High Score: {highScore}</div>
    </div>
  );
};

export default GameOver;
