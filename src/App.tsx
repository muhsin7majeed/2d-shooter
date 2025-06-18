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
import { useSetCurrentMissileAtom, useSetMissilesAtom } from './atoms/missileAtom';
import { useSetEnemiesAtom } from './atoms/enemiesAtom';
import { useSetScoreAtom } from './atoms/scoreAtom';
import PowerUpSprite from './sprites/PowerUpSprite';
import { MISSILE_TYPES } from './data/missiles';
import { ENEMY_TYPES } from './data/enemies';
import { GROUND_OBJECTS } from './data/world';

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
  const setCurrentMissileAtom = useSetCurrentMissileAtom();

  useEffect(() => {
    if (gameState === 'gameover') {
      setMissiles([]);
      setEnemies([]);
      setScore(0);
      setCurrentMissileAtom(MISSILE_TYPES[0]);
    }
  }, [gameState, setCurrentMissileAtom, setEnemies, setMissiles, setScore]);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Assets.load([
          {
            alias: 'jet',
            src: './assets/jet.png',
          },
          {
            alias: 'enemy_hit',
            src: './assets/hitmarks/enemy_hit.png',
          },
          {
            alias: 'player_hit',
            src: './assets/hitmarks/player_hit.png',
          },

          ...GROUND_OBJECTS.map((ground) => ({
            alias: ground,
            src: `./assets/ground/${ground}.png`,
          })),

          ...MISSILE_TYPES.map((missile) => ({
            alias: missile.label,
            src: `./assets/missiles/${missile.texture}.png`,
          })),

          ...ENEMY_TYPES.map((enemy) => ({
            alias: enemy.label,
            src: `./assets/enemies/${enemy.texture}.png`,
          })),
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

      <Application background={'#1099bb'} resizeTo={window} ref={appRef}>
        {/* <Ground /> */}
        <DevTools />
        <JetSprite />
        <EnemySprite />
        <PowerUpSprite />
        <GameLoop />
      </Application>
    </>
  );
}
