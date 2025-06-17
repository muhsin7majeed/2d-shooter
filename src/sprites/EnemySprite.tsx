import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useRef, useState } from 'react';
import { PADDING } from '../config';
import { useSetEnemiesAtom } from '../atoms/enemiesAtom';

const SPAWN_INTERVAL = 2000;
const ENEMY_SPEED = 2;

const EnemySprite = () => {
  const enemyContainerRef = useRef<Container>(null);
  const setEnemies = useSetEnemiesAtom();

  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const { app } = useApplication();

  const spawnRandomEnemy = () => {
    const enemy = new Sprite(Assets.get('enemy_1'));
    enemy.anchor.set(0.5);
    enemy.scale.set(1.5);
    enemy.rotation = Math.PI;
    enemy.x = Math.random() * (app.screen.width - PADDING * 2) + PADDING;
    enemy.y = -PADDING;
    enemyContainerRef.current?.addChild(enemy);
    setEnemies((prev) => [...prev, enemy]);
  };

  useTick((ticker) => {
    if (ticker.lastTime - lastSpawnTime > SPAWN_INTERVAL) {
      spawnRandomEnemy();
      setLastSpawnTime(ticker.lastTime);
    }

    setEnemies((prev) =>
      prev.filter((enemy) => {
        enemy.y += ENEMY_SPEED;
        if (enemy.y > app.screen.height) {
          // Remove off-screen enemy
          enemyContainerRef.current?.removeChild(enemy);
          return false;
        }
        return true;
      }),
    );
  });

  return (
    <>
      <pixiContainer ref={enemyContainerRef} />
    </>
  );
};

export default EnemySprite;
