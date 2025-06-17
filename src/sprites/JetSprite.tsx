import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import useControls from '../hooks/useControls';
import { PADDING } from '../config';
import { useCurrentMissileAtomValue, useSetMissilesAtom, useSetMissileContainerRefAtom } from '../atoms/missileAtom';
import { useSetPlayerRef } from '../atoms/playerAtom';

const JET_SPEED = 3;
const ACCELERATION = 0.5;
const FRICTION = 0.1;

const JetSprite = () => {
  const jetSpriteRef = useRef<Sprite>(null);
  const missileContainerRef = useRef<Container>(null);

  const { app } = useApplication();
  const { left, right, touchX } = useControls();

  const [isFiring] = useState(true);
  const [lastFireTime, setLastFireTime] = useState(0);
  const setMissileContainerRef = useSetMissileContainerRefAtom();
  const setMissiles = useSetMissilesAtom();
  const setPlayerRef = useSetPlayerRef();
  const currentMissile = useCurrentMissileAtomValue();

  const velocityXRef = useRef(0);

  useEffect(() => {
    if (jetSpriteRef.current) {
      setPlayerRef(jetSpriteRef.current);
    }
  }, [setPlayerRef]);

  useEffect(() => {
    if (missileContainerRef) {
      setMissileContainerRef(missileContainerRef.current);
    }
  }, [setMissileContainerRef]);

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

    // Apply movement
    sprite.x += velocityXRef.current;

    // Touch input overrides velocity
    if (touchX) {
      sprite.x = touchX;
      velocityXRef.current = 0; // cancel momentum if touch is used
    }

    // Clamp to screen
    const halfWidth = sprite.width / 2;
    sprite.x = Math.max(halfWidth + PADDING, Math.min(app.screen.width - halfWidth - PADDING, sprite.x));
  };

  const fireMissile = () => {
    if (!jetSpriteRef.current || !missileContainerRef.current) return;

    // 1. Create the missile sprite
    const missile = new Sprite(Assets.get(currentMissile.texture));
    missile.anchor.set(0.5);
    missile.scale.set(currentMissile.scale);
    missile.x = jetSpriteRef.current.x;
    missile.y = jetSpriteRef.current.y;

    // 2. Add the missile sprite to the missile container
    missileContainerRef.current?.addChild(missile);

    // 3. Add the missile to the missiles atom
    setMissiles((prev) => [
      ...prev,
      {
        sprite: missile,
        data: currentMissile,
      },
    ]);
  };

  useTick((ticker) => {
    if (!jetSpriteRef.current) return;

    controlJet();

    if (isFiring) {
      // Auto fire every FIRE_INTERVAL ms
      if (ticker.lastTime - lastFireTime > currentMissile.fireInterval) {
        fireMissile();
        setLastFireTime(ticker.lastTime);
      }
    }

    setMissiles((prev) =>
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
        texture={Assets.get('jet')}
        anchor={0.5}
        x={app.screen.width / 2}
        y={app.screen.height - 100}
      />

      <pixiContainer ref={missileContainerRef} />
    </>
  );
};

export default JetSprite;
