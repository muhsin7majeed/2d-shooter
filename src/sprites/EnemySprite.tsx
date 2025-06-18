import { useApplication, useTick } from '@pixi/react';
import { Assets, Container, Sprite } from 'pixi.js';
import { useRef, useState } from 'react';
import { PADDING } from '../config';
import { Enemy, useSetEnemiesAtom } from '../atoms/enemiesAtom';
import { useScoreAtomValue, useSetHighScoreAtom } from '../atoms/scoreAtom';
import { getEnemyBasedOnScore } from '../helpers/getEnemyBasedOnScore';
import { usePlayerRef } from '../atoms/playerAtom';
import useHitCheck from '../hooks/useHitCheck';
import { sound } from '@pixi/sound';
import { useEffectsVolumeAtomValue } from '../atoms/gameplayAtom';
import { useSetGameState } from '../atoms/gameStateAtom';

interface EnemyMissile {
  sprite: Sprite;
  data: {
    velocityX: number;
    velocityY: number;
  };
}

const EnemySprite = () => {
  const enemyContainerRef = useRef<Container>(null);
  const setEnemies = useSetEnemiesAtom();
  const score = useScoreAtomValue();
  const [enemyMissiles, setEnemyMissiles] = useState<EnemyMissile[]>([]);
  const enemyMissileContainerRef = useRef<Container>(null);
  const playerRef = usePlayerRef();
  const hitCheck = useHitCheck();
  const setGameState = useSetGameState();
  const setHighScore = useSetHighScoreAtom();
  const effectsVolume = useEffectsVolumeAtomValue();
  const [lastSpawnTime, setLastSpawnTime] = useState(0);
  const [lastMissileSpawnTime, setLastMissileSpawnTime] = useState(0);
  const { app } = useApplication();

  const fireMissile = (enemy: Enemy) => {
    if (!enemy.data.missile || !playerRef) return;

    const missile = new Sprite(Assets.get(enemy.data.missile.texture));

    missile.anchor.set(0.5);
    missile.x = enemy.sprite.x;
    missile.y = enemy.sprite.y;
    missile.scale.set(enemy.data.missile.scale);
    missile.tint = 0xffa500;

    enemyMissileContainerRef.current?.addChild(missile);

    const deltaXToTarget = playerRef.x - enemy.sprite.x;
    const deltaYToTarget = playerRef.y - enemy.sprite.y;
    const length = Math.sqrt(deltaXToTarget * deltaXToTarget + deltaYToTarget * deltaYToTarget);

    setEnemyMissiles((prev) => [
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
    enemyMissiles.forEach((missile) => {
      // move the missile towards the player
      missile.sprite.x += missile.data.velocityX;
      missile.sprite.y += missile.data.velocityY;

      // check if the missile is colliding with the player
      if (playerRef && hitCheck(missile.sprite, playerRef)) {
        if (effectsVolume) {
          // Play the enemy hit sound
          sound.play('enemy_hit_audio', {
            volume: effectsVolume,
          });
        }

        // Remove the missile
        missile.sprite.parent?.removeChild(missile.sprite);
        setEnemyMissiles((prev) => prev.filter((m) => m !== missile));

        // Show hit effect
        const playerHit = new Sprite(Assets.get('player_hit'));
        playerHit.anchor.set(0.5);
        playerHit.x = playerRef.x;
        playerHit.y = playerRef.y;
        playerHit.scale.set(4);
        enemyMissileContainerRef.current?.addChild(playerHit);

        setGameState('gameover');
        setHighScore((prev) => {
          return prev < score ? score : prev;
        });

        // Remove the player hit sprite after 1 second
        setTimeout(() => {
          playerHit.parent?.removeChild(playerHit);
        }, 300);
      }

      if (missile.sprite.y > app.screen.height) {
        missile.sprite.parent?.removeChild(missile.sprite);
      }
    });
  });

  return (
    <>
      <pixiContainer ref={enemyContainerRef} />
      <pixiContainer ref={enemyMissileContainerRef} />
    </>
  );
};

export default EnemySprite;
