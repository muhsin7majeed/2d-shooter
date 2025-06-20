import { useTick } from '@pixi/react';
import { useRenderedEnemiesAtom, useRenderedEnemyMissilesAtom } from '../atoms/enemiesAtom';
import { useRenderedPlayerMissilesAtom, useSetCurrentPlayerMissileAtom } from '../atoms/missileAtom';
import { useScoreAtomValue, useSetHighScoreAtom, useSetScoreAtom } from '../atoms/scoreAtom';
import { useCurrentPlayerJetAtomValue, usePlayerHealthAtom, usePlayerRefAtomValue } from '../atoms/playerAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { Container, Sprite } from 'pixi.js';
import { Assets } from 'pixi.js';
import { useRef } from 'react';
import hasSpriteCollided from '../helpers/hasSpriteCollided';
import { useRenderedPowerUpsAtom } from '../atoms/powerUpsAtom';
import useSound from '../hooks/useSound';
import { RenderedEnemy } from '../types/enemy';

const GameLoop = () => {
  const playerRef = usePlayerRefAtomValue();
  const enemyHitContainerRef = useRef<Container>(null);
  const playerHitContainerRef = useRef<Container>(null);

  const score = useScoreAtomValue();
  const setScore = useSetScoreAtom();
  const setGameState = useSetGameState();
  const setHighScore = useSetHighScoreAtom();
  const setCurrentPlayerMissile = useSetCurrentPlayerMissileAtom();
  const currentPlayerJet = useCurrentPlayerJetAtomValue();
  const { playSound } = useSound();

  const [playerHealth, setPlayerHealth] = usePlayerHealthAtom();
  const [renderedEnemyMissiles, setRenderedEnemyMissiles] = useRenderedEnemyMissilesAtom();
  const [renderedPowerUps, setRenderedPowerUps] = useRenderedPowerUpsAtom();
  const [renderedEnemies, setRenderedEnemies] = useRenderedEnemiesAtom();
  const [renderedPlayerMissiles, setRenderedPlayerMissiles] = useRenderedPlayerMissilesAtom();

  const updateHighScore = (currentScore: number) => {
    setHighScore((prev) => {
      return prev < currentScore ? currentScore : prev;
    });
  };

  const renderHitEffect = (assetName: string, x: number, y: number, scale: number = 2, duration: number = 300) => {
    const enemyHit = new Sprite(Assets.get(assetName));

    enemyHit.anchor.set(0.5);
    enemyHit.x = x;
    enemyHit.y = y;
    enemyHit.scale.set(scale);

    enemyHitContainerRef.current?.addChild(enemyHit);

    // Remove the hit effect after 300ms
    setTimeout(() => {
      enemyHit.parent?.removeChild(enemyHit);
    }, duration);
  };

  const handlePlayerHealthAndGameOver = (enemyDamage: number) => {
    if (!playerRef) return;

    // Calculate the damage
    const damage = (currentPlayerJet.health * enemyDamage) / 100;

    // Check if the player health is greater than the damage
    if (playerHealth > damage) {
      playSound('player_hit_audio');

      // Add the player hit sprite
      renderHitEffect('player_hit', playerRef.x, playerRef.y, 2, 200);

      // Update the player health
      setPlayerHealth((prev) => prev - damage);
    } else {
      playSound('enemy_destroyed_audio'); // TODO: change to player destroyed audio

      // Update the player health
      setPlayerHealth(0);

      // Add the player hit sprite
      renderHitEffect('player_destroyed', playerRef.x, playerRef.y, 4);

      // Update the high score
      updateHighScore(score);

      // Update the game state
      setGameState('gameover');
    }
  };

  const handlePlayerMissileHitEnemy = (enemy: RenderedEnemy) => {
    renderedPlayerMissiles.forEach((missile) => {
      if (hasSpriteCollided(missile.sprite, enemy.sprite)) {
        // Remove the missile
        missile.sprite.parent?.removeChild(missile.sprite);

        // Update the atoms to remove the collided objects
        setRenderedPlayerMissiles((prev) => prev.filter((m) => m !== missile));

        // Check if the enemy health is greater than the missile damage
        if (enemy.data.health > missile.data.damage) {
          playSound('player_hit_audio');

          renderHitEffect('player_hit', enemy.sprite.x, enemy.sprite.y, 2, 200);

          // Update the enemy health
          setRenderedEnemies((prev) => {
            return prev.map((e) => {
              const damage = (e.data.health * missile.data.damage) / 100;

              return e === enemy
                ? {
                    ...e,
                    data: {
                      ...e.data,
                      health: e.data.health - damage,
                    },
                  }
                : e;
            });
          });
        } else {
          playSound('enemy_destroyed_audio');

          // Remove the missile
          missile.sprite.parent?.removeChild(missile.sprite);

          // Remove the enemy
          enemy.sprite.parent?.removeChild(enemy.sprite);

          setRenderedEnemies((prev) => prev.filter((e) => e !== enemy));

          // Update the score
          setScore((prev) => prev + 1);

          // Add the enemy hit sprite
          renderHitEffect('enemy_hit', enemy.sprite.x, enemy.sprite.y);
        }
      }
    });
  };

  const handlePlayerHitEnemy = (enemy: RenderedEnemy) => {
    if (playerRef && hasSpriteCollided(playerRef, enemy.sprite)) {
      playSound('enemy_destroyed_audio');

      // Remove the enemy
      enemy.sprite.parent?.removeChild(enemy.sprite);

      // Remove collided enemy from the rendered enemies array
      setRenderedEnemies((prev) => prev.filter((e) => e !== enemy));

      // Handle player health and game over
      handlePlayerHealthAndGameOver(enemy.data.damage);
    }
  };

  const handleEnemyMissileHitPlayer = () => {
    renderedEnemyMissiles.forEach((missile) => {
      if (playerRef && hasSpriteCollided(missile.sprite, playerRef)) {
        // Remove the missile
        missile.sprite.parent?.removeChild(missile.sprite);
        setRenderedEnemyMissiles((prev) => prev.filter((m) => m !== missile));

        // Handle player health and game over
        handlePlayerHealthAndGameOver(missile.data.damage);
      }
    });
  };

  const handlePlayerHitPowerUp = () => {
    renderedPowerUps.forEach((powerUp) => {
      if (playerRef && hasSpriteCollided(playerRef, powerUp.sprite)) {
        // Remove the powerup
        powerUp.sprite.parent?.removeChild(powerUp.sprite);

        // Update the atoms to remove the collided objects
        setRenderedPowerUps((prev) => prev.filter((p) => p !== powerUp));

        // Update the current missile atom
        setCurrentPlayerMissile(powerUp.type);
      }
    });
  };

  useTick(() => {
    renderedEnemies.forEach((enemy) => {
      // check if the player missile is colliding with the enemy
      handlePlayerMissileHitEnemy(enemy);

      // check if the player is colliding with the enemy
      handlePlayerHitEnemy(enemy);
    });

    // check if the enemy missile is colliding with the player
    handleEnemyMissileHitPlayer();

    //  Player powerup hit check
    handlePlayerHitPowerUp();
  });

  return (
    <>
      <pixiContainer ref={enemyHitContainerRef} />
      <pixiContainer ref={playerHitContainerRef} />
    </>
  );
};

export default GameLoop;
