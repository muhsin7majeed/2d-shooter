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
      <div className="score-container">
        <i className="nes-icon trophy" />
        <span>{score}</span>
      </div>

      <div className="play-pause-btn">
        {gameState === 'playing' && (
          <button className="nes-btn" onClick={handlePause}>
            Pause
          </button>
        )}
        {gameState === 'paused' && (
          <button className="nes-btn" onClick={handlePause}>
            Play
          </button>
        )}
      </div>

      <div className="health-container">
        <i className="nes-icon heart" />
        <span>{health}</span>
      </div>
    </div>
  );
};

export default GameStats;
