import { useScoreAtomValue } from '../atoms/scoreAtom';
import { useGameStateAtom } from '../atoms/gameStateAtom';
import { usePlayerHealth } from '../atoms/playerAtom';

const GameStats = () => {
  const score = useScoreAtomValue();
  const [gameState, setGameState] = useGameStateAtom();
  const health = usePlayerHealth();

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
        <div className="game-stats-score">Health: {health}</div>
      </div>
    </div>
  );
};

export default GameStats;
