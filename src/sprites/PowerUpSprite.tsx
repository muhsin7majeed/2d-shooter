import { useRef, useState } from 'react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useApplication, useTick } from '@pixi/react';
import { MISSILE_TYPES, PADDING } from '../config';

const SPAWN_INTERVAL = 2000;

const PowerUpSprite = () => {
  const powerUpContainerRef = useRef<Container>(null);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const { app } = useApplication();

  const spawnRandomPowerUp = () => {
    const randomMissileType = MISSILE_TYPES[Math.floor(Math.random() * MISSILE_TYPES.length)];

    const powerUp = new Sprite(Assets.get(randomMissileType));
    powerUp.anchor.set(0.5);
    powerUp.x = Math.random() * (app.screen.width - PADDING * 2) + PADDING;
    powerUp.y = -PADDING;
    powerUpContainerRef.current?.addChild(powerUp);
  };

  useTick((ticker) => {
    if (ticker.lastTime - lastSpawnTime > SPAWN_INTERVAL) {
      spawnRandomPowerUp();
      setLastSpawnTime(ticker.lastTime);
    }
  });
  return <pixiContainer ref={powerUpContainerRef} />;
};

export default PowerUpSprite;
