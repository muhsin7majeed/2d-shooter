import { useRef, useState } from 'react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useApplication, useTick } from '@pixi/react';
import { SCREEN_PADDING } from '../config';
import { useSetRenderedPowerUpsAtom } from '../atoms/powerUpsAtom';
import { useCurrentPlayerJetAtomValue, usePlayerHealthAtomValue } from '../atoms/playerAtom';
import { POWERUP_TYPES } from '../data/powerups';

const OFFENSE_SPAWN_INTERVAL = 10000;
const DEFENSE_SPAWN_INTERVAL = 15000;
const FALL_SPEED = 2;

const PowerUpSprite = () => {
  const powerUpContainerRef = useRef<Container>(null);
  const [lastDefenseSpawnTime, setLastDefenseSpawnTime] = useState(0);
  const [lastOffenseSpawnTime, setLastOffenseSpawnTime] = useState(0);
  const { app } = useApplication();
  const setRenderedPowerUps = useSetRenderedPowerUpsAtom();
  const playerHealth = usePlayerHealthAtomValue();
  const currentPlayerJet = useCurrentPlayerJetAtomValue();

  const spawnRandomDefensePowerUp = () => {
    const randomPowerUpType = POWERUP_TYPES.Defense.options[0];

    if (randomPowerUpType) {
      const powerup = new Sprite(Assets.get(randomPowerUpType.name));

      powerup.anchor.set(0.5);
      powerup.scale.set(3);
      powerup.x = Math.random() * (app.screen.width - SCREEN_PADDING * 2) + SCREEN_PADDING;
      powerup.y = -SCREEN_PADDING;

      powerUpContainerRef.current?.addChild(powerup);
      setRenderedPowerUps((prev) => [...prev, { sprite: powerup, type: randomPowerUpType }]);
    }
  };

  const spawnRandomOffensePowerUp = () => {
    const randomMissileType =
      POWERUP_TYPES.Offense.options[Math.floor(Math.random() * POWERUP_TYPES.Offense.options.length)];

    if (randomMissileType) {
      const powerUp = new Sprite(Assets.get(randomMissileType.name));

      powerUp.anchor.set(0.5);
      powerUp.scale.set(3);
      powerUp.x = Math.random() * (app.screen.width - SCREEN_PADDING * 2) + SCREEN_PADDING;
      powerUp.y = -SCREEN_PADDING;

      powerUpContainerRef.current?.addChild(powerUp);
      setRenderedPowerUps((prev) => [...prev, { sprite: powerUp, type: randomMissileType }]);
    }
  };

  useTick((ticker) => {
    if (ticker.lastTime - lastDefenseSpawnTime > DEFENSE_SPAWN_INTERVAL && playerHealth < currentPlayerJet.health) {
      spawnRandomDefensePowerUp();
      setLastDefenseSpawnTime(ticker.lastTime);
    }

    if (ticker.lastTime - lastOffenseSpawnTime > OFFENSE_SPAWN_INTERVAL) {
      spawnRandomOffensePowerUp();
      setLastOffenseSpawnTime(ticker.lastTime);
    }

    setRenderedPowerUps((prev) =>
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
