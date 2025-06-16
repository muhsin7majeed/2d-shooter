import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import useControls from '../hooks/useControls';
import { PADDING } from '../config';
import { useSetMissilesAtom } from '../atoms/missileAtom';
import { useSetPlayerRef } from '../atoms/playerAtom';

const JET_SPEED = 3;
const MISSILE_SPEED = 2;
const FIRE_INTERVAL = 500; // ms

const JetSprite = () => {
  const jetSpriteRef = useRef<Sprite>(null);
  const { app } = useApplication();
  const { left, right, touchX } = useControls();

  const [isFiring] = useState(true);
  const [lastFireTime, setLastFireTime] = useState(0);
  const missileContainerRef = useRef<Container>(null);
  const setMissiles = useSetMissilesAtom();
  const setPlayerRef = useSetPlayerRef();

  useEffect(() => {
    if (jetSpriteRef.current) {
      setPlayerRef(jetSpriteRef.current);
    }
  }, [setPlayerRef]);

  const controlJet = () => {
    if (!jetSpriteRef.current) return;

    if (left) {
      jetSpriteRef.current.x -= JET_SPEED;
    }

    if (right) {
      jetSpriteRef.current.x += JET_SPEED;
    }

    if (touchX) {
      jetSpriteRef.current.x = touchX;
    }

    const halfWidth = jetSpriteRef.current.width / 2;

    // Keep the jet within the screen boundaries
    jetSpriteRef.current.x = Math.max(
      halfWidth + PADDING,
      Math.min(app.screen.width - halfWidth - PADDING, jetSpriteRef.current.x),
    );
  };

  const fireMissile = () => {
    if (!jetSpriteRef.current || !missileContainerRef.current) return;

    const missile = new Sprite(Assets.get('missile_1'));
    missile.anchor.set(0.5);
    missile.x = jetSpriteRef.current.x;
    missile.y = jetSpriteRef.current.y;

    missileContainerRef.current?.addChild(missile);
    setMissiles((prev) => [...prev, missile]);
  };

  useTick((ticker) => {
    if (!jetSpriteRef.current) return;

    controlJet();

    if (isFiring) {
      // Auto fire every FIRE_INTERVAL ms
      if (ticker.lastTime - lastFireTime > FIRE_INTERVAL) {
        fireMissile();
        setLastFireTime(ticker.lastTime);
      }
    }

    setMissiles((prev) =>
      prev.filter((missile) => {
        missile.y -= MISSILE_SPEED;
        if (missile.y < -20) {
          // Remove off-screen bullet
          missileContainerRef.current?.removeChild(missile);
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
