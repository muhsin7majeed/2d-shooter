import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import useControls from '../hooks/useControls';
import { SCREEN_PADDING } from '../config';
import { useCurrentPlayerMissileAtomValue, useSetRenderedPlayerMissilesAtom } from '../atoms/missileAtom';
import { useSetPlayerRef } from '../atoms/playerAtom';
import { sound } from '@pixi/sound';
import { useEffectsVolumeAtomValue } from '../atoms/gameplayAtom';

const JET_SPEED = 5;
const ACCELERATION = 0.2;
const FRICTION = 0.1;
const TOUCH_PADDING = 100;

const PlayerSprite = () => {
  const jetSpriteRef = useRef<Sprite>(null);
  const missileContainerRef = useRef<Container>(null);

  const { app } = useApplication();
  const { left, right, touchX, touchY, up, down } = useControls();

  const [isFiring] = useState(true);
  const [lastFireTime, setLastFireTime] = useState(0);
  const setRenderedPlayerMissiles = useSetRenderedPlayerMissilesAtom();
  const setPlayerRef = useSetPlayerRef();
  const currentPlayerMissile = useCurrentPlayerMissileAtomValue();
  const effectsVolume = useEffectsVolumeAtomValue();

  const velocityXRef = useRef(0);
  const velocityYRef = useRef(0);

  useEffect(() => {
    if (jetSpriteRef.current) {
      setPlayerRef(jetSpriteRef.current);
    }
  }, [setPlayerRef]);

  const controlJet = () => {
    if (!jetSpriteRef.current) return;

    const sprite = jetSpriteRef.current;

    // Apply input to change velocity
    if (left) {
      velocityXRef.current = Math.max(velocityXRef.current - ACCELERATION, -JET_SPEED);
    } else if (right) {
      velocityXRef.current = Math.min(velocityXRef.current + ACCELERATION, JET_SPEED);
    } else {
      // Apply friction when no input
      if (velocityXRef.current > 0) {
        velocityXRef.current = Math.max(velocityXRef.current - FRICTION, 0);
      } else if (velocityXRef.current < 0) {
        velocityXRef.current = Math.min(velocityXRef.current + FRICTION, 0);
      }
    }

    if (up) {
      velocityYRef.current = Math.max(velocityYRef.current - ACCELERATION, -JET_SPEED);
    } else if (down) {
      velocityYRef.current = Math.min(velocityYRef.current + ACCELERATION, JET_SPEED);
    } else {
      // Apply friction when no input
      if (velocityYRef.current > 0) {
        velocityYRef.current = Math.max(velocityYRef.current - FRICTION, 0);
      } else if (velocityYRef.current < 0) {
        velocityYRef.current = Math.min(velocityYRef.current + FRICTION, 0);
      }
    }

    // Apply movement
    sprite.x += velocityXRef.current;
    sprite.y += velocityYRef.current;

    // Touch input overrides velocity
    if (touchX) {
      sprite.x = touchX;
      velocityXRef.current = 0; // cancel momentum if touch is used
    }

    if (touchY) {
      sprite.y = touchY - TOUCH_PADDING;
      velocityYRef.current = 0; // cancel momentum if touch is used
    }

    // Clamp to screen
    const halfWidth = sprite.width / 2;
    const halfHeight = sprite.height / 2;

    sprite.x = Math.max(halfWidth + SCREEN_PADDING, Math.min(app.screen.width - halfWidth - SCREEN_PADDING, sprite.x));
    sprite.y = Math.max(
      halfHeight + SCREEN_PADDING,
      Math.min(app.screen.height - halfHeight - SCREEN_PADDING, sprite.y),
    );
  };

  const fireMissile = () => {
    if (!jetSpriteRef.current || !missileContainerRef.current) return;

    // Create the missile sprite
    const missile = new Sprite(Assets.get(currentPlayerMissile.name));
    missile.anchor.set(0.5);
    missile.scale.set(currentPlayerMissile.scale);
    missile.x = jetSpriteRef.current.x;
    missile.y = jetSpriteRef.current.y;

    // Add the missile sprite to the missile container
    missileContainerRef.current?.addChild(missile);

    if (effectsVolume) {
      // Play the missile sound
      sound.play(`${currentPlayerMissile.name}_audio`, {
        volume: effectsVolume,
      });
    }

    // Add the missile to the missiles atom
    setRenderedPlayerMissiles((prev) => [
      ...prev,
      {
        sprite: missile,
        data: currentPlayerMissile,
      },
    ]);
  };

  useTick((ticker) => {
    if (!jetSpriteRef.current) return;

    controlJet();

    if (isFiring) {
      // Auto fire every FIRE_INTERVAL ms
      if (ticker.lastTime - lastFireTime > currentPlayerMissile.fireInterval) {
        fireMissile();
        setLastFireTime(ticker.lastTime);
      }
    }

    setRenderedPlayerMissiles((prev) =>
      prev.filter((missile) => {
        // 1. Move the missile down
        missile.sprite.y -= missile.data.speed;

        // 2. Remove the missile if it goes off the screen
        if (missile.sprite.y < -20) {
          // Remove off-screen bullet
          missileContainerRef.current?.removeChild(missile.sprite);
          return false;
        }
        return true;
      }),
    );
  });

  return (
    <>
      <pixiSprite
        ref={jetSpriteRef}
        texture={Assets.get('player_jet_1')}
        anchor={0.5}
        x={app.screen.width / 2}
        y={app.screen.height - (app.screen.height * 10) / 100}
      />

      <pixiContainer ref={missileContainerRef} />
    </>
  );
};

export default PlayerSprite;
