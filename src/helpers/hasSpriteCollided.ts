import { Sprite } from 'pixi.js';

const hasSpriteCollided = (sprite1: Sprite, sprite2: Sprite) => {
  if (!sprite1 || !sprite2) return false;

  const ab = sprite1.getBounds();
  const bb = sprite2.getBounds();

  const collided =
    ab.x < bb.x + bb.width && ab.x + ab.width > bb.x && ab.y < bb.y + bb.height && ab.y + ab.height > bb.y;

  return collided;
};

export default hasSpriteCollided;
