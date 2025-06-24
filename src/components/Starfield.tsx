import { useApplication, useTick } from '@pixi/react';
import { Application, Container, Graphics } from 'pixi.js';
import { useEffect, useRef } from 'react';

const getRandomStars = (app: Application) => {
  const stars: Graphics[] = [];

  for (let i = 0; i < 100; i++) {
    const star = new Graphics();

    // white or yellow
    const color = Math.random() > 0.5 ? 0xffffff : 0xffff00;

    star.circle(0, 0, Math.random() * 1.5 + 0.5);
    star.fill(color);
    star.alpha = Math.random() * 0.5;

    star.x = Math.random() * app.screen.width;
    star.y = Math.random() * app.screen.height;
    stars.push(star);
  }

  return stars;
};

const SPEED = 1;

const Starfield = () => {
  const { app } = useApplication();
  const starfieldContainerRef = useRef<Container>(null);
  const starsRef = useRef<Graphics[]>([]);

  useEffect(() => {
    if (!app) return;

    const stars = getRandomStars(app);
    starsRef.current = stars;

    for (const star of stars) {
      starfieldContainerRef.current?.addChild(star);
    }
  }, [app]);

  useTick(() => {
    const stars = starsRef.current;
    for (const star of stars) {
      star.y += SPEED;

      if (star.y > app.screen.height) {
        star.y = 0;
        star.x = Math.random() * app.screen.width;
      }
    }
  });

  return <pixiContainer ref={starfieldContainerRef}></pixiContainer>;
};

export default Starfield;
