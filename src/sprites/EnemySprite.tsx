import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useRef, useState } from 'react';
import { PADDING } from '../config';
import { useSetEnemiesAtom } from '../atoms/enemiesAtom';
import { useScoreAtomValue } from '../atoms/scoreAtom';
import { getEnemyBasedOnScore } from '../helpers/getEnemyBasedOnScore';

const EnemySprite = () => {
  const enemyContainerRef = useRef<Container>(null);
  const setEnemies = useSetEnemiesAtom();
  const score = useScoreAtomValue();

  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const { app } = useApplication();

  const spawnRandomEnemy = () => {
    const enemyType = getEnemyBasedOnScore(score);

    const enemy = new Sprite(Assets.get(enemyType.texture));
    enemy.anchor.set(0.5);
    enemy.scale.set(enemyType.scale);
    enemy.rotation = Math.PI;
    enemy.x = Math.random() * (app.screen.width - PADDING * 2) + PADDING;
    enemy.y = -PADDING;
    enemyContainerRef.current?.addChild(enemy);

    setEnemies((prev) => [...prev, { sprite: enemy, data: enemyType }]);
  };

  useTick((ticker) => {
    const enemyType = getEnemyBasedOnScore(score);

    if (ticker.lastTime - lastSpawnTime > enemyType.spawnInterval) {
      spawnRandomEnemy();
      setLastSpawnTime(ticker.lastTime);
    }

    setEnemies((prev) =>
      prev.filter((enemy) => {
        enemy.sprite.y += enemy.data.speed;
        if (enemy.sprite.y > app.screen.height) {
          // Remove off-screen enemy
          enemy.sprite.parent?.removeChild(enemy.sprite);
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
