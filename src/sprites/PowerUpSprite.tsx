import { useRef, useState } from 'react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useApplication, useTick } from '@pixi/react';
import { SCREEN_PADDING } from '../config';
import useHitCheck from '../hooks/useHitCheck';
import { usePlayerRef } from '../atoms/playerAtom';
import { useSetCurrentPlayerMissileAtom } from '../atoms/missileAtom';
import { MISSILE_TYPES } from '../data/missiles';
import { PlayerMissileType } from '../types/missile';

const SPAWN_INTERVAL = 10000;
const FALL_SPEED = 2;

const PowerUpSprite = () => {
  const powerUpContainerRef = useRef<Container>(null);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const [powerUps, setPowerUps] = useState<{ sprite: Sprite; type: PlayerMissileType }[]>([]);
  const { app } = useApplication();
  const playerRef = usePlayerRef();
  const hitCheck = useHitCheck();
  const setCurrentPlayerMissile = useSetCurrentPlayerMissileAtom();

  const spawnRandomPowerUp = () => {
    const randomMissileType = MISSILE_TYPES.Player.filter((type) => type.name !== 'missile_1')[
      Math.floor(Math.random() * MISSILE_TYPES.Player.length)
    ];

    if (randomMissileType) {
      const powerUp = new Sprite(Assets.get(randomMissileType.name));

      powerUp.anchor.set(0.5);
      powerUp.scale.set(3);
      powerUp.x = Math.random() * (app.screen.width - SCREEN_PADDING * 2) + SCREEN_PADDING;
      powerUp.y = -SCREEN_PADDING;

      powerUpContainerRef.current?.addChild(powerUp);
      setPowerUps((prev) => [...prev, { sprite: powerUp, type: randomMissileType }]);
    }
  };

  useTick((ticker) => {
    if (ticker.lastTime - lastSpawnTime > SPAWN_INTERVAL) {
      spawnRandomPowerUp();
      setLastSpawnTime(ticker.lastTime);
    }

    //  Player powerup hit check
    powerUps.forEach((powerUp) => {
      if (playerRef && hitCheck(playerRef, powerUp.sprite)) {
        console.log('hit', powerUp.type.name);

        // Handle collision
        // 1. Remove the powerup
        powerUp.sprite.parent?.removeChild(powerUp.sprite);
        // 2. Update the atoms to remove the collided objects
        setPowerUps((prev) => prev.filter((p) => p !== powerUp));

        // 3. Update the current missile atom
        setCurrentPlayerMissile(powerUp.type);
      }
    });

    setPowerUps((prev) =>
      prev.filter((powerUp) => {
        // Move the powerup down
        powerUp.sprite.y += FALL_SPEED;

        // Remove the powerup if it goes off the screen
        if (powerUp.sprite.y > app.screen.height + SCREEN_PADDING) {
          powerUpContainerRef.current?.removeChild(powerUp.sprite);
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
