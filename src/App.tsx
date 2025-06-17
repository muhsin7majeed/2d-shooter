import { Application, extend, ApplicationRef } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import JetSprite from './sprites/JetSprite';
import GameLoading from './components/GameLoading';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import { useGameStateValue } from './atoms/gameStateAtom';
import EnemySprite from './sprites/EnemySprite';
import GameLoop from './components/GameLoop';
import GameStats from './components/GameStats';
import DevTools from './components/DevTools';
import { useSetMissilesAtom } from './atoms/missileAtom';
import { useSetEnemiesAtom } from './atoms/enemiesAtom';
import { useSetScoreAtom } from './atoms/scoreAtom';
import PowerUpSprite from './sprites/PowerUpSprite';

// extend tells @pixi/react what Pixi.js components are availables
extend({
  Container,
  Sprite,
});

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<Error | null>(null);
  const appRef = useRef<ApplicationRef>(null);
  const gameState = useGameStateValue();

  const setMissiles = useSetMissilesAtom();
  const setEnemies = useSetEnemiesAtom();
  const setScore = useSetScoreAtom();

  useEffect(() => {
    if (gameState === 'gameover') {
      setMissiles([]);
      setEnemies([]);
      setScore(0);
    }
  }, [gameState, setEnemies, setMissiles, setScore]);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Assets.load([
          {
            alias: 'jet',
            src: './assets/jet.png',
          },
          {
            alias: 'missile_1',
            src: './assets/missile_1.png',
          },
          {
            alias: 'missile_2',
            src: './assets/missile_2.png',
          },
          {
            alias: 'missile_3',
            src: './assets/missile_3.png',
          },
          {
            alias: 'enemy_1',
            src: './assets/enemy_1.png',
          },
          {
            alias: 'enemy_hit',
            src: './assets/enemy_hit.png',
          },
          {
            alias: 'player_hit',
            src: './assets/player_hit.png',
          },
        ]);

        setAssetsLoaded(true);
      } catch (error) {
        setLoadingError(error instanceof Error ? error : new Error('Failed to load assets'));
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (appRef.current) {
      if (gameState === 'playing') {
        appRef.current.getApplication()?.start();
      } else {
        appRef.current.getApplication()?.stop();
      }
    }
  }, [gameState]);

  if (loadingError) {
    return <div>Error loading assets: {loadingError.message}</div>;
  }

  if (!assetsLoaded) {
    return <GameLoading />;
  }

  if (gameState === 'menu') {
    return <GameMenu />;
  }

  return (
    <>
      <GameStats />

      {gameState === 'gameover' && <GameOver />}

      {/* We'll wrap our components with an <Application> component to provide the Pixi.js Application context */}
      <Application background={'#1099bb'} resizeTo={window} ref={appRef}>
        <DevTools />
        <JetSprite />
        <EnemySprite />
        <GameLoop />
        <PowerUpSprite />
      </Application>
    </>
  );
}
