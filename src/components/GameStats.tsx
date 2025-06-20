import { useScoreAtomValue } from '../atoms/scoreAtom';
import { useGameStateAtom } from '../atoms/gameStateAtom';

const GameStats = () => {
  const score = useScoreAtomValue();
  const [gameState, setGameState] = useGameStateAtom();

  const handlePause = () => {
    if (gameState === 'paused') {
      setGameState('playing');
    } else {
      setGameState('paused');
    }
  };

  return (
    <div className="game-stats">
      <div className="content">
        {gameState === 'playing' && <button onClick={handlePause}>Pause</button>}
        {gameState === 'paused' && <button onClick={handlePause}>Play</button>}

        <div className="game-stats-score">Score: {score}</div>
      </div>
    </div>
  );
};

export default GameStats;
