import { useTick } from '@pixi/react';
import {
  useRenderedEnemiesAtom,
  useEnemyMissileContainerRefAtomValue,
  useRenderedEnemyMissilesAtom,
} from '../atoms/enemiesAtom';
import { useRenderedPlayerMissilesAtom, useSetCurrentPlayerMissileAtom } from '../atoms/missileAtom';
import { useScoreAtomValue, useSetHighScoreAtom, useSetScoreAtom } from '../atoms/scoreAtom';
import { usePlayerRef } from '../atoms/playerAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { Container, Sprite } from 'pixi.js';
import { Assets } from 'pixi.js';
import { useRef } from 'react';
import { sound } from '@pixi/sound';
import { useEffectsVolumeAtomValue } from '../atoms/gameplayAtom';
import hasSpriteCollided from '../helpers/hasSpriteCollided';
import { useRenderedPowerUpsAtom } from '../atoms/powerUpsAtom';

const GameLoop = () => {
  const playerRef = usePlayerRef();
  const enemyHitContainerRef = useRef<Container>(null);
  const playerHitContainerRef = useRef<Container>(null);
  const enemyMissileContainerRef = useEnemyMissileContainerRefAtomValue();

  const score = useScoreAtomValue();
  const effectsVolume = useEffectsVolumeAtomValue();

  const setScore = useSetScoreAtom();
  const setGameState = useSetGameState();
  const setHighScore = useSetHighScoreAtom();
  const setCurrentPlayerMissile = useSetCurrentPlayerMissileAtom();

  const [renderedEnemyMissiles, setRenderedEnemyMissiles] = useRenderedEnemyMissilesAtom();
  const [renderedPowerUps, setRenderedPowerUps] = useRenderedPowerUpsAtom();
  const [renderedEnemies, setRenderedEnemies] = useRenderedEnemiesAtom();
  const [renderedPlayerMissiles, setRenderedPlayerMissiles] = useRenderedPlayerMissilesAtom();

  useTick(() => {
    renderedEnemies.forEach((enemy) => {
      // check if the player missile is colliding with the enemy
      renderedPlayerMissiles.forEach((missile) => {
        if (hasSpriteCollided(missile.sprite, enemy.sprite)) {
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
          setRenderedPlayerMissiles((prev) => prev.filter((m) => m !== missile));
          setRenderedEnemies((prev) => prev.filter((e) => e !== enemy));

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

      // check if the player is colliding with the enemy
      if (playerRef && hasSpriteCollided(playerRef, enemy.sprite)) {
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
        setRenderedEnemies((prev) => prev.filter((e) => e !== enemy));

        // 3. Add the player hit sprite
        const playerHit = new Sprite(Assets.get('player_hit'));
        playerHit.anchor.set(0.5);
        playerHit.x = playerRef.x;
        playerHit.y = playerRef.y;
        playerHit.scale.set(4);
        playerHitContainerRef.current?.addChild(playerHit);

        setGameState('gameover');
        setHighScore((prev) => {
          return prev < score ? score : prev;
        });

        // 4. Remove the player hit sprite after 1 second
        setTimeout(() => {
          playerHit.parent?.removeChild(playerHit);
        }, 300);
      }
    });

    // check if the enemy missile is colliding with the player
    renderedEnemyMissiles.forEach((missile) => {
      if (playerRef && hasSpriteCollided(missile.sprite, playerRef)) {
        if (effectsVolume) {
          // Play the enemy hit sound
          sound.play('enemy_hit_audio', {
            volume: effectsVolume,
          });
        }

        // Remove the missile
        missile.sprite.parent?.removeChild(missile.sprite);
        setRenderedEnemyMissiles((prev) => prev.filter((m) => m !== missile));

        // Show hit effect
        const playerHit = new Sprite(Assets.get('player_hit'));
        playerHit.anchor.set(0.5);
        playerHit.x = playerRef.x;
        playerHit.y = playerRef.y;
        playerHit.scale.set(4);

        enemyMissileContainerRef?.addChild(playerHit);

        setGameState('gameover');
        setHighScore((prev) => {
          return prev < score ? score : prev;
        });

        // Remove the player hit sprite after 1 second
        setTimeout(() => {
          playerHit.parent?.removeChild(playerHit);
        }, 300);
      }
    });

    //  Player powerup hit check
    renderedPowerUps.forEach((powerUp) => {
      if (playerRef && hasSpriteCollided(playerRef, powerUp.sprite)) {
        // Handle collision
        // 1. Remove the powerup
        powerUp.sprite.parent?.removeChild(powerUp.sprite);
        // 2. Update the atoms to remove the collided objects
        setRenderedPowerUps((prev) => prev.filter((p) => p !== powerUp));

        // 3. Update the current missile atom
        setCurrentPlayerMissile(powerUp.type);
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
