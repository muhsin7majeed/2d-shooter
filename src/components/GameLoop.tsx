import { useTick } from '@pixi/react';
import { useEnemiesAtom } from '../atoms/enemiesAtom';
import { useMissilesAtom } from '../atoms/missileAtom';
import useHitCheck from '../hooks/useHitCheck';
import { useScoreAtomValue, useSetHighScoreAtom, useSetScoreAtom } from '../atoms/scoreAtom';
import { usePlayerRef } from '../atoms/playerAtom';
import { useSetGameState } from '../atoms/gameStateAtom';

const GameLoop = () => {
  const [missiles, setMissiles] = useMissilesAtom();
  const [enemies, setEnemies] = useEnemiesAtom();
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
      }
    });
  });

  return null;
};

export default GameLoop;
