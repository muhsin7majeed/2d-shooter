import { useEffect, useState } from 'react';

const useControls = () => {
  const [keys, setKeys] = useState({
    left: false,
    right: false,
    touchX: 0,
    up: false,
    down: false,
    touchY: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setKeys((prev) => ({ ...prev, left: true }));
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setKeys((prev) => ({ ...prev, right: true }));
      }
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        setKeys((prev) => ({ ...prev, up: true }));
      }
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        setKeys((prev) => ({ ...prev, down: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
        setKeys((prev) => ({ ...prev, left: false }));
      }
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
        setKeys((prev) => ({ ...prev, right: false }));
      }
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
        setKeys((prev) => ({ ...prev, up: false }));
      }
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
        setKeys((prev) => ({ ...prev, down: false }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      setKeys((prev) => ({ ...prev, touchX: e.touches[0].clientX }));
      setKeys((prev) => ({ ...prev, touchY: e.touches[0].clientY }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return keys;
};

export default useControls;
