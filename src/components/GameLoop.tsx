import { useTick } from '@pixi/react';
import { useRenderedEnemiesAtom, useRenderedEnemyMissilesAtom } from '../atoms/enemiesAtom';
import { useRenderedPlayerMissilesAtom, useSetCurrentPlayerMissileAtom } from '../atoms/missileAtom';
import { useScoreAtomValue, useSetHighScoreAtom, useSetScoreAtom } from '../atoms/scoreAtom';
import { usePlayerRef } from '../atoms/playerAtom';
import { useSetGameState } from '../atoms/gameStateAtom';
import { Container, Sprite } from 'pixi.js';
import { Assets } from 'pixi.js';
import { useRef } from 'react';
import hasSpriteCollided from '../helpers/hasSpriteCollided';
import { useRenderedPowerUpsAtom } from '../atoms/powerUpsAtom';
import useSound from '../hooks/useSound';
import { RenderedEnemy } from '../types/enemy';

const GameLoop = () => {
  const playerRef = usePlayerRef();
  const enemyHitContainerRef = useRef<Container>(null);
  const playerHitContainerRef = useRef<Container>(null);

  const score = useScoreAtomValue();
  const setScore = useSetScoreAtom();
  const setGameState = useSetGameState();
  const setHighScore = useSetHighScoreAtom();
  const setCurrentPlayerMissile = useSetCurrentPlayerMissileAtom();
  const { playSound } = useSound();

  const [renderedEnemyMissiles, setRenderedEnemyMissiles] = useRenderedEnemyMissilesAtom();
  const [renderedPowerUps, setRenderedPowerUps] = useRenderedPowerUpsAtom();
  const [renderedEnemies, setRenderedEnemies] = useRenderedEnemiesAtom();
  const [renderedPlayerMissiles, setRenderedPlayerMissiles] = useRenderedPlayerMissilesAtom();

  const updateHighScore = (currentScore: number) => {
    setHighScore((prev) => {
      return prev < currentScore ? currentScore : prev;
    });
  };

  const renderHitEffect = (assetName: string, x: number, y: number, scale: number = 2) => {
    const enemyHit = new Sprite(Assets.get(assetName));

    enemyHit.anchor.set(0.5);
    enemyHit.x = x;
    enemyHit.y = y;
    enemyHit.scale.set(scale);

    enemyHitContainerRef.current?.addChild(enemyHit);

    // Remove the hit effect after 300ms
    setTimeout(() => {
      enemyHit.parent?.removeChild(enemyHit);
    }, 300);
  };

  const handlePlayerMissileHitEnemy = (enemy: RenderedEnemy) => {
    renderedPlayerMissiles.forEach((missile) => {
      if (hasSpriteCollided(missile.sprite, enemy.sprite)) {
        playSound('enemy_hit_audio');

        // Remove the missile
        missile.sprite.parent?.removeChild(missile.sprite);

        // Remove the enemy
        enemy.sprite.parent?.removeChild(enemy.sprite);

        // Update the atoms to remove the collided objects
        setRenderedPlayerMissiles((prev) => prev.filter((m) => m !== missile));
        setRenderedEnemies((prev) => prev.filter((e) => e !== enemy));

        // Update the score
        setScore((prev) => prev + 1);

        // Add the enemy hit sprite
        renderHitEffect('enemy_hit', enemy.sprite.x, enemy.sprite.y);
      }
    });
  };

  const handlePlayerHitEnemy = (enemy: RenderedEnemy) => {
    if (playerRef && hasSpriteCollided(playerRef, enemy.sprite)) {
      playSound('enemy_hit_audio');

      // Remove the enemy
      enemy.sprite.parent?.removeChild(enemy.sprite);
      // Update the atoms to remove the collided objects
      setRenderedEnemies((prev) => prev.filter((e) => e !== enemy));

      // Add the player hit sprite
      renderHitEffect('player_hit', playerRef.x, playerRef.y, 4);

      // Update the high score
      updateHighScore(score);

      // Update the game state
      setGameState('gameover');
    }
  };

  const handleEnemyMissileHitPlayer = () => {
    renderedEnemyMissiles.forEach((missile) => {
      if (playerRef && hasSpriteCollided(missile.sprite, playerRef)) {
        playSound('enemy_hit_audio');

        // Remove the missile
        missile.sprite.parent?.removeChild(missile.sprite);
        setRenderedEnemyMissiles((prev) => prev.filter((m) => m !== missile));

        // Show hit effect
        renderHitEffect('player_hit', playerRef.x, playerRef.y, 4);

        // Update the high score
        updateHighScore(score);

        // Update the game state
        setGameState('gameover');
      }
    });
  };

  const handlePlayerHitPowerUp = () => {
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
