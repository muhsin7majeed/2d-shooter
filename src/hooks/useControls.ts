import { useEffect, useState } from "react";

const useControls = () => {
  const [keys, setKeys] = useState({
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        setKeys((prev) => ({ ...prev, left: true }));
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        setKeys((prev) => ({ ...prev, right: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        setKeys((prev) => ({ ...prev, left: false }));
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        setKeys((prev) => ({ ...prev, right: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
};

export default useControls;
