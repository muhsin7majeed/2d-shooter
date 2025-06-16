import { useTick } from '@pixi/react';
import { useEnemiesAtom } from '../atoms/enemiesAtom';
import { useMissilesAtom } from '../atoms/missileAtom';
import useHitCheck from '../hooks/useHitCheck';
import { useSetScoreAtom } from '../atoms/scoreAtom';

const GameLoop = () => {
  const [missiles, setMissiles] = useMissilesAtom();
  const [enemies, setEnemies] = useEnemiesAtom();
  const setScore = useSetScoreAtom();

  const hitCheck = useHitCheck();

  useTick(() => {
    missiles.forEach((missile) => {
      enemies.forEach((enemy) => {
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
    });
  });

  return null;
};

export default GameLoop;
