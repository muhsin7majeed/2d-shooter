import { useApplication, useTick } from '@pixi/react';
import { GROUND_OBJECTS } from '../data/world';
import { Assets, Container, Sprite } from 'pixi.js';
import { SCREEN_PADDING } from '../config';
import { useRef, useState } from 'react';

const GROUND_SPAWN_INTERVAL = 5000;

const Ground = () => {
  const { app } = useApplication();
  const groundContainerRef = useRef<Container>(null);
  const [lastSpawnTime, setLastSpawnTime] = useState(0);

  const screenHeight = app.screen.height;
  const screenWidth = app.screen.width;

  const spawnRandomGroundObject = () => {
    const groundObject = GROUND_OBJECTS[Math.floor(Math.random() * GROUND_OBJECTS.length)];
    const groundSprite = new Sprite(Assets.get(groundObject));

    groundSprite.x = Math.random() * (screenWidth - SCREEN_PADDING * 2) + SCREEN_PADDING;
    groundSprite.y = -SCREEN_PADDING;
    groundSprite.scale.set(2);

    groundContainerRef.current?.addChild(groundSprite);
  };

  useTick((ticker) => {
    if (ticker.lastTime - lastSpawnTime > GROUND_SPAWN_INTERVAL) {
      spawnRandomGroundObject();
      setLastSpawnTime(ticker.lastTime);
    }

    groundContainerRef.current?.children.forEach((object) => {
      object.y += 1;

      if (object.y > screenHeight) {
        object.parent?.removeChild(object);
      }
    });
  });

  return <pixiContainer ref={groundContainerRef}></pixiContainer>;
};

export default Ground;
