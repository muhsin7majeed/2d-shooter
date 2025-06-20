import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { SCREEN_PADDING } from '../config';
import {
  useSetEnemyMissileContainerRefAtom,
  useSetRenderedEnemiesAtom,
  useSetRenderedEnemyMissilesAtom,
} from '../atoms/enemiesAtom';
import { useScoreAtomValue } from '../atoms/scoreAtom';
import { getEnemyBasedOnScore } from '../helpers/getEnemyBasedOnScore';
import { usePlayerRef } from '../atoms/playerAtom';
import { RenderedEnemy } from '../types/enemy';

const EnemySprite = () => {
  const enemyContainerRef = useRef<Container>(null);
  const setRenderedEnemies = useSetRenderedEnemiesAtom();
  const score = useScoreAtomValue();
  const setRenderedEnemyMissiles = useSetRenderedEnemyMissilesAtom();
  const enemyMissileContainerRef = useRef<Container>(null);
  const playerRef = usePlayerRef();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const [lastMissileSpawnTime, setLastMissileSpawnTime] = useState(0);
  const { app } = useApplication();

  const setEnemyMissileContainerRef = useSetEnemyMissileContainerRefAtom();

  useEffect(() => {
    if (enemyMissileContainerRef.current) {
      setEnemyMissileContainerRef(enemyMissileContainerRef.current);
    }
  }, [setEnemyMissileContainerRef, enemyMissileContainerRef]);

  const fireMissile = (enemy: RenderedEnemy) => {
    if (!enemy.data.missile || !playerRef) return;

    const missile = new Sprite(Assets.get(enemy.data.missile.name));

    missile.anchor.set(0.5);
    missile.x = enemy.sprite.x;
    missile.y = enemy.sprite.y;
    missile.scale.set(enemy.data.missile.scale);
    missile.tint = 0xffa500;

    enemyMissileContainerRef.current?.addChild(missile);

    const deltaXToTarget = playerRef.x - enemy.sprite.x;
    const deltaYToTarget = playerRef.y - enemy.sprite.y;
    const length = Math.sqrt(deltaXToTarget * deltaXToTarget + deltaYToTarget * deltaYToTarget);

    setRenderedEnemyMissiles((prev) => [
      ...prev,
      {
        sprite: missile,
        data: {
          velocityX: (deltaXToTarget / length) * enemy.data.missile!.speed,
          velocityY: (deltaYToTarget / length) * enemy.data.missile!.speed,
        },
      },
    ]);
  };

  const spawnRandomEnemy = () => {
    const enemyType = getEnemyBasedOnScore(score);

    const enemy = new Sprite(Assets.get(enemyType.name));
    enemy.anchor.set(0.5);
    enemy.scale.set(enemyType.scale);
    enemy.rotation = Math.PI;
    enemy.x = Math.random() * (app.screen.width - SCREEN_PADDING * 2) + SCREEN_PADDING;
    enemy.y = -SCREEN_PADDING;
    enemyContainerRef.current?.addChild(enemy);

    setRenderedEnemies((prev) => [...prev, { sprite: enemy, data: enemyType }]);
  };

  useTick((ticker) => {
    const enemyType = getEnemyBasedOnScore(score);

    if (ticker.lastTime - lastSpawnTime > enemyType.spawnInterval) {
      spawnRandomEnemy();
      setLastSpawnTime(ticker.lastTime);
    }

    setRenderedEnemies((prev) =>
      prev.filter((enemy) => {
        enemy.sprite.y += enemy.data.speed;

        // Fire missile
        if (enemyType.missile && ticker.lastTime - lastMissileSpawnTime > enemyType.missile.fireInterval) {
          fireMissile({ sprite: enemy.sprite, data: enemyType });
          setLastMissileSpawnTime(ticker.lastTime);
        }

        if (enemy.sprite.y > app.screen.height) {
          // Remove off-screen enemy
          enemy.sprite.parent?.removeChild(enemy.sprite);
          return false;
        }
        return true;
      }),
    );

    // Remove off-screen missiles
    setRenderedEnemyMissiles((prev) =>
      prev.filter((missile) => {
        // move the missile towards the player
        missile.sprite.x += missile.data.velocityX;
        missile.sprite.y += missile.data.velocityY;

        if (missile.sprite.y > app.screen.height) {
          missile.sprite.parent?.removeChild(missile.sprite);

          return false;
        }

        return true;
      }),
    );
  });

  return (
    <>
      <pixiContainer ref={enemyContainerRef} />
      <pixiContainer ref={enemyMissileContainerRef} />
    </>
  );
};

export default EnemySprite;
