import { useRef, useState } from 'react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useApplication, useTick } from '@pixi/react';
import { MISSILE_TYPES, PADDING } from '../config';
import { MissileType, useSetCurrentMissileAtom } from '../atoms/missileAtom';
import useHitCheck from '../hooks/useHitCheck';
import { usePlayerRef } from '../atoms/playerAtom';

const SPAWN_INTERVAL = 2000;
const FALL_SPEED = 2;

const PowerUpSprite = () => {
  const powerUpContainerRef = useRef<Container>(null);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const [powerUps, setPowerUps] = useState<Sprite[]>([]);
  const { app } = useApplication();
  const playerRef = usePlayerRef();
  const setCurrentMissileAtom = useSetCurrentMissileAtom();
  const hitCheck = useHitCheck();

  const spawnRandomPowerUp = () => {
    const randomMissileType = MISSILE_TYPES[Math.floor(Math.random() * MISSILE_TYPES.length)];

    const powerUp = new Sprite(Assets.get(randomMissileType));
    powerUp.anchor.set(0.5);
    powerUp.scale.set(3);
    // powerUp.rotation = Math.PI;
    powerUp.x = Math.random() * (app.screen.width - PADDING * 2) + PADDING;
    powerUp.y = -PADDING;
    powerUpContainerRef.current?.addChild(powerUp);
    setPowerUps((prev) => [...prev, powerUp]);
  };

  useTick((ticker) => {
    if (ticker.lastTime - lastSpawnTime > SPAWN_INTERVAL) {
      spawnRandomPowerUp();
      setLastSpawnTime(ticker.lastTime);
    }

    //  Player powerup hit check
    powerUps.forEach((powerUp) => {
      if (playerRef && hitCheck(playerRef, powerUp)) {
        console.log('hit');
        // Handle collision
        // 1. Remove the powerup
        powerUp.parent?.removeChild(powerUp);
        // 2. Update the atoms to remove the collided objects
        setPowerUps((prev) => prev.filter((p) => p !== powerUp));
        setCurrentMissileAtom(powerUp.texture.label as MissileType);
      }
    });

    setPowerUps((prev) =>
      prev.filter((powerUp) => {
        powerUp.y += FALL_SPEED;
        if (powerUp.y > app.screen.height + PADDING) {
          powerUpContainerRef.current?.removeChild(powerUp);
          return false;
        }
        return true;
      }),
    );
  });

  return (
    <>
      <pixiContainer ref={powerUpContainerRef} />
    </>
  );
};

export default PowerUpSprite;
