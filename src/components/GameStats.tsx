import { useScoreAtomValue } from '../atoms/scoreAtom';
import { useGameStateAtom } from '../atoms/gameStateAtom';
import { usePlayerHealthAtomValue } from '../atoms/playerAtom';

const GameStats = () => {
  const score = useScoreAtomValue();
  const [gameState, setGameState] = useGameStateAtom();
  const health = usePlayerHealthAtomValue();

  const handlePause = () => {
    if (gameState === 'paused') {
      setGameState('playing');
    } else {
      setGameState('paused');
    }
  };

  return (
    <div className="game-stats">
      <div className="play-pause-btn">
        {gameState === 'playing' && <button onClick={handlePause}>Pause</button>}
        {gameState === 'paused' && <button onClick={handlePause}>Play</button>}
      </div>

      <div className="score-container">
        <i className="nes-icon trophy" />
        <span>{score}</span>
      </div>

      <div className="health-container">
        <i className="nes-icon heart" />
        <span>{health}</span>
      </div>
    </div>
  );
};

export default GameStats;
