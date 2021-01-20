import { loadTargetNodeSprites } from '../utils';
import { SPRITE_SIZE } from '../constants/size';
class TargetNode {
  constructor(sprites, spriteSize) {
    this.centerX = 0;
    this.centerY = 0;
    this.spriteNormal = sprites[0];
    this.spriteWhite = sprites[1];
    this.spriteSize = spriteSize;
    this.scale = 0.1;
  }

  setPosition({ exitCell }) {
    this.centerX = exitCell.centerX;
    this.centerY = exitCell.centerY;
  }

  setScale() {
    if (this.scale < 0.5) {
      this.scale += 0.1;
    } else if (this.scale < 1 && this.scale >= 0.5) {
      this.scale += 0.06;
    } else {
      this.scale = 1;
    }
  }

  resetScale() {
    this.scale = 0.1;
  }

  draw(ctx, spriteOption, animated = false) {
    ctx.translate(this.centerX, this.centerY);
    if (animated) {
      ctx.scale(this.scale, this.scale);
    }
    ctx.drawImage(
      this[spriteOption],
      -Math.floor(this.spriteSize / 2),
      -Math.floor(this.spriteSize / 2),
      this.spriteSize,
      this.spriteSize
    );
    ctx.translate(-this.centerX, -this.centerY);
    // Reset current transformation matrix to the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

const targetNodeSprites = loadTargetNodeSprites('normal', 'white');
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);
export default targetNode;
