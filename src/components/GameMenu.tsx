import { useSetGameState } from '../atoms/useGameState';

const GameMenu = () => {
  const setGameState = useSetGameState();

  const startGame = () => {
    setGameState('playing');
  };

  return (
    <div className="game-menu">
      <h1>World's On Fire</h1>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default GameMenu;
