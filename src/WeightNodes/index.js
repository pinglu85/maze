import { loadWeightSprite } from '../utils';
import { SPRITE_SIZE } from '../constants/size';

class WeightNodes {
  #sprite;
  #spriteSize;
  #content;
  #lastWeightNodeId;

  constructor(sprite, spriteSize) {
    this.#sprite = sprite;
    this.#spriteSize = spriteSize;
    this.#content = new Map();
    this.#lastWeightNodeId = '';
  }

  addWeightNode(centerX, centerY) {
    const weightNodeId = this.#generateId(centerX, centerY);
    this.#content.set(weightNodeId, [centerX, centerY]);
    this.#lastWeightNodeId = weightNodeId;
  }

  deleteWeightNode(centerX, centerY) {
    const weightNodeId = this.#generateId(centerX, centerY);
    this.#content.delete(weightNodeId);
    this.#lastWeightNodeId = '';
  }

  clear() {
    this.#content.clear();
    this.#lastWeightNodeId = '';
  }

  draw(ctx, scale = 1) {
    for (const [key, weightNode] of this.#content.entries()) {
      const [centerX, centerY] = weightNode;
      if (key === this.#lastWeightNodeId) {
        this.#drawWeightNode(ctx, centerX, centerY, scale);
      } else {
        this.#drawWeightNode(ctx, centerX, centerY);
      }
    }
  }

  #drawWeightNode(ctx, centerX, centerY, scale = 0) {
    ctx.translate(centerX, centerY);
    if (scale !== 0) {
      ctx.scale(scale, scale);
    }
    ctx.drawImage(
      this.#sprite,
      -Math.floor(this.#spriteSize / 2),
      -Math.floor(this.#spriteSize / 2),
      this.#spriteSize,
      this.#spriteSize
    );
    ctx.translate(-centerX, -centerY);

    if (scale !== 0) {
      // Reset current transformation matrix to the identity matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  #generateId(centerX, centerY) {
    return `centerX${centerX}centerY${centerY}`;
  }
}

const sprite = loadWeightSprite();
const weightNodes = new WeightNodes(sprite, SPRITE_SIZE);
export default weightNodes;
