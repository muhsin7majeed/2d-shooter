import { Application, extend, ApplicationRef } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import JetSprite from './sprites/PlayerSprite';
import GameLoading from './components/GameLoading';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import { useGameStateValue } from './atoms/gameStateAtom';
import EnemySprite from './sprites/EnemySprite';
import GameLoop from './components/GameLoop';
import GameStats from './components/GameStats';
import DevTools from './components/DevTools';
import PowerUpSprite from './sprites/PowerUpSprite';
import { MISSILE_TYPES } from './data/missiles';
import { ENEMY_TYPES } from './data/enemies';
import { MUSIC_TRACKS } from './data/gameplay';
import { PLAYER_JETS } from './data/player';
import { POWERUP_TYPES } from './data/powerups';

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

  useEffect(() => {
    const loadAssets = async () => {
      try {
        await Assets.load([
          {
            alias: 'enemy_destroyed_audio',
            src: './assets/audio/enemy_destroyed.ogg',
          },
          {
            alias: 'player_hit_audio',
            src: './assets/audio/player_hit.ogg',
          },
          {
            alias: 'enemy_hit',
            src: './assets/hitmarks/enemy_hit.png',
          },
          {
            alias: 'player_hit',
            src: './assets/hitmarks/player_hit.png',
          },
          {
            alias: 'player_destroyed',
            src: './assets/hitmarks/player_destroyed.png',
          },

          ...POWERUP_TYPES.Defense.options.map((powerup) => ({
            alias: powerup.name,
            src: `./assets/powerups/${powerup.name}.png`,
          })),

          ...MUSIC_TRACKS.map((track) => ({
            alias: track.id,
            src: `./assets/audio/${track.label}.mp3`,
          })),

          ...MISSILE_TYPES.Player.map((missile) => ({
            alias: `${missile.name}_audio`,
            src: `./assets/audio/${missile.name}.ogg`,
          })),

          ...PLAYER_JETS.map((jet) => ({
            alias: jet.name,
            src: `./assets/player_jets/${jet.name}.png`,
          })),

          // ...GROUND_OBJECTS.map((ground) => ({
          //   alias: ground,
          //   src: `./assets/ground/${ground}.png`,
          // })),

          ...MISSILE_TYPES.Player.map((missile) => ({
            alias: missile.name,
            src: `./assets/missiles/${missile.name}.png`,
          })),

          ...ENEMY_TYPES.map((enemy) => ({
            alias: enemy.name,
            src: `./assets/enemies/${enemy.name}.png`,
          })),

          ...ENEMY_TYPES.filter((enemy) => enemy.missile).map((enemy) => ({
            alias: enemy.missile!.name,
            src: `./assets/missiles/${enemy.missile!.name}.png`,
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
    <div className="game-container">
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
    </div>
  );
}
