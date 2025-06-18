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
import { sound } from '@pixi/sound';
import { useEffectsVolumeAtomValue } from '../atoms/gameplayAtom';

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
  const effectsVolume = useEffectsVolumeAtomValue();

  useTick(() => {
    enemies.forEach((enemy) => {
      missiles.forEach((missile) => {
        if (hitCheck(missile.sprite, enemy.sprite)) {
          if (effectsVolume) {
            // Play the enemy hit sound
            sound.play('enemy_hit_audio', {
              volume: effectsVolume,
            });
          }

          // Remove the missile
          missile.sprite.parent?.removeChild(missile.sprite);
          // Remove the enemy
          enemy.sprite.parent?.removeChild(enemy.sprite);
          // Update the atoms to remove the collided objects
          setMissiles((prev) => prev.filter((m) => m !== missile));
          setEnemies((prev) => prev.filter((e) => e !== enemy));

          setScore((prev) => prev + 1);

          // Add the enemy hit sprite
          const enemyHit = new Sprite(Assets.get('enemy_hit'));
          enemyHit.anchor.set(0.5);
          enemyHit.x = enemy.sprite.x;
          enemyHit.y = enemy.sprite.y;
          enemyHit.scale.set(2);
          enemyHitContainerRef.current?.addChild(enemyHit);

          // Remove the enemy hit sprite
          setTimeout(() => {
            enemyHit.parent?.removeChild(enemyHit);
          }, 300);
        }
      });

      if (playerRef && hitCheck(playerRef, enemy.sprite)) {
        if (effectsVolume) {
          // Play the enemy hit sound
          sound.play('enemy_hit_audio', {
            volume: effectsVolume,
          });
        }

        // Handle collision
        // 1. Remove the enemy
        enemy.sprite.parent?.removeChild(enemy.sprite);
        // 2. Update the atoms to remove the collided objects
        setEnemies((prev) => prev.filter((e) => e !== enemy));
        setGameState('gameover');
        setHighScore((prev) => {
          console.log(prev, score);

          return prev < score ? score : prev;
        });

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
