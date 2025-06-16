import { useScoreAtomValue } from '../atoms/scoreAtom';

const GameStats = () => {
  const score = useScoreAtomValue();

  return (
    <div className="game-stats">
      <div className="game-stats-score">Score: {score}</div>
    </div>
  );
};

export default GameStats;
