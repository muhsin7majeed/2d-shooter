import { Application, extend } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useState } from 'react';
import JetSprite from './sprites/Jet';
import GameLoading from './components/GameLoading';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import { useGameStateValue } from './atoms/useGameState';

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Sprite,
});

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);

  const gameState = useGameStateValue();

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Assets.load([
          {
            alias: 'jet',
            src: '/assets/jet.png',
          },
          {
            alias: 'missile_1',
            src: '/assets/missile_1.png',
          },
        ]);

        setAssetsLoaded(true);
      } catch (error) {
        setLoadingError(error instanceof Error ? error : new Error('Failed to load assets'));
      }
    };

    loadAssets();
  }, []);

  if (loadingError) {
    return <div>Error loading assets: {loadingError.message}</div>;
  }

  if (!assetsLoaded) {
    return <GameLoading />;
  }

  if (gameState === 'menu') {
    return <GameMenu />;
  }

  if (gameState === 'gameover') {
    return <GameOver />;
  }

  return (
    <>
      {/* We'll wrap our components with an <Application> component to provide the Pixi.js Application context */}
      <Application background={'#1099bb'} resizeTo={window}>
        <JetSprite />
      </Application>
    </>
  );
}
