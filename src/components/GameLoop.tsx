import { useTick } from '@pixi/react';
import { useEnemiesAtom } from '../atoms/enemiesAtom';
import { useMissilesAtom } from '../atoms/missileAtom';
import useHitCheck from '../hooks/useHitCheck';
import { useScoreAtomValue, useSetHighScoreAtom, useSetScoreAtom } from '../atoms/scoreAtom';
import { usePlayerRef } from '../atoms/playerAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { Container, Sprite } from 'pixi.js';
import { Assets } from 'pixi.js';
import { useRef } from 'react';

const GameLoop = () => {
  const [missiles, setMissiles] = useMissilesAtom();
  const [enemies, setEnemies] = useEnemiesAtom();

  const enemyHitContainerRef = useRef<Container>(null);
  const playerHitContainerRef = useRef<Container>(null);

  const playerRef = usePlayerRef();
  const setScore = useSetScoreAtom();
  const hitCheck = useHitCheck();
  const setGameState = useSetGameState();
  const setHighScore = useSetHighScoreAtom();
  const score = useScoreAtomValue();

  useTick(() => {
    enemies.forEach((enemy) => {
      missiles.forEach((missile) => {
        if (hitCheck(missile, enemy)) {
          // Handle collision
          // 1. Remove the missile
          missile.parent?.removeChild(missile);
          // 2. Remove the enemy
          enemy.parent?.removeChild(enemy);
          // 3. Update the atoms to remove the collided objects
          setMissiles((prev) => prev.filter((m) => m !== missile));
          setEnemies((prev) => prev.filter((e) => e !== enemy));

          setScore((prev) => prev + 1);

          // 4. Add the enemy hit sprite
          const enemyHit = new Sprite(Assets.get('enemy_hit'));
          enemyHit.anchor.set(0.5);
          enemyHit.x = enemy.x;
          enemyHit.y = enemy.y;
          enemyHit.scale.set(2);
          enemyHitContainerRef.current?.addChild(enemyHit);

          // 5. Remove the enemy hit sprite after 1 second
          setTimeout(() => {
            enemyHit.parent?.removeChild(enemyHit);
          }, 300);
        }
      });

      if (playerRef && hitCheck(playerRef, enemy)) {
        // Handle collision
        // 1. Remove the enemy
        enemy.parent?.removeChild(enemy);
        // 2. Update the atoms to remove the collided objects
        setEnemies((prev) => prev.filter((e) => e !== enemy));
        setGameState('gameover');
        setHighScore((prev) => (prev < score ? score : prev));

        // 3. Add the player hit sprite
        const playerHit = new Sprite(Assets.get('player_hit'));
        playerHit.anchor.set(0.5);
        playerHit.x = playerRef.x;
        playerHit.y = playerRef.y;
        playerHit.scale.set(4);
        playerHitContainerRef.current?.addChild(playerHit);

        // 4. Remove the player hit sprite after 1 second
        setTimeout(() => {
          playerHit.parent?.removeChild(playerHit);
        }, 300);
      }
    });
  });

  return (
    <>
      <pixiContainer ref={enemyHitContainerRef} />
      <pixiContainer ref={playerHitContainerRef} />
    </>
  );
};

export default GameLoop;
