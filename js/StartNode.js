import { getOppositeDir } from './utils/index.js';

const TO_RADIANS = Math.PI / 180;

class StartNode {
  constructor(sprites, spriteSize) {
    this.centerX = 0;
    this.centerY = 0;
    this.facingDir = '';
    this.exitDir = '';
    this.spriteSize = spriteSize;
    this.sprites = sprites;
    this.spriteIndex = 0;
    this.pathCoordinates = [];
    this.currentPathSegment = null;
    this.prevCellCenters = [];
    this.nextCellCenterX = 0;
    this.nextCellCenterY = 0;
    this.atExit = false;
    this.previousTime = 0;
  }

  reset(grid) {
    this.centerX = grid.entranceCell.centerX;
    this.centerY = grid.entranceCell.centerY;
    this.facingDir = getOppositeDir(grid.entranceDir);
    this.exitDir = grid.exitDir;
    this.spriteIndex = 0;
    this.prevCellCenters = [];
    this.nextCellCenterX = 0;
    this.nextCellCenterY = 0;
    this.atExit = false;
    this.previousTime = 0;
  }

  move() {
    if (!this.currentPathSegment) {
      this.currentPathSegment = this.pathCoordinates.pop();
    }
    const [centerX, centerY] = this.currentPathSegment;

    this.nextCellCenterX = centerX;
    this.nextCellCenterY = centerY;

    if (
      this.centerX === this.nextCellCenterX &&
      this.centerY === this.nextCellCenterY
    ) {
      this.prevCellCenters.push([this.centerX, this.centerY]);
      this.currentPathSegment = this.pathCoordinates.pop();
      if (!this.currentPathSegment) {
        this.facingDir = this.exitDir;
        this.atExit = true;
      }
      return;
    }

    if (this.centerX === this.nextCellCenterX) {
      if (this.centerY < this.nextCellCenterY) {
        this.facingDir = 'south';
      } else {
        this.facingDir = 'north';
      }
    }

    if (this.centerY === this.nextCellCenterY) {
      if (this.centerX < this.nextCellCenterX) {
        this.facingDir = 'west';
      } else {
        this.facingDir = 'east';
      }
    }

    switch (this.facingDir) {
      case 'north':
        this.centerY--;
        break;
      case 'west':
        this.centerX++;
        break;
      case 'south':
        this.centerY++;
        break;
      case 'east':
        this.centerX--;
        break;
      default:
      // do nothing
    }
  }

  draw(ctx) {
    let angleInRad = 0;
    switch (this.facingDir) {
      case 'north':
        angleInRad = 0;
        break;
      case 'west':
        angleInRad = 90 * TO_RADIANS;
        break;
      case 'south':
        angleInRad = 180 * TO_RADIANS;
        break;
      case 'east':
        angleInRad = 270 * TO_RADIANS;
        break;
      default:
      // do nothing;
    }

    ctx.translate(this.centerX, this.centerY);
    ctx.rotate(angleInRad);
    ctx.drawImage(
      this.sprites[this.spriteIndex],
      -Math.floor(this.spriteSize / 2),
      -Math.floor(this.spriteSize / 2),
      this.spriteSize,
      this.spriteSize
    );
    ctx.rotate(-angleInRad);
    ctx.translate(-this.centerX, -this.centerY);

    const now = Date.now();
    if (now - this.previousTime > 30) {
      this.spriteIndex =
        this.spriteIndex === this.sprites.length - 1 ? 0 : this.spriteIndex + 1;
      this.previousTime = now;
    }
  }

  drawFootprints(ctx, { newFootprint, oldFootprint }) {
    let numOfPrevCellCenters = this.prevCellCenters.length;
    const [lastPrevCellCenterX, lastPrevCellCenterY] = this.prevCellCenters[
      numOfPrevCellCenters - 1
    ];

    if (
      lastPrevCellCenterX === this.centerX &&
      lastPrevCellCenterY === this.centerY
    ) {
      numOfPrevCellCenters--;
    }

    let opacityCoefficient = 0;
    for (let i = numOfPrevCellCenters - 1; i >= 0; i--) {
      const [centerX, centerY] = this.prevCellCenters[i];
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.spriteSize / 7, 0, 2 * Math.PI);
      ctx.fillStyle = newFootprint;
      ctx.fill();
      ctx.globalAlpha = 0.05 * opacityCoefficient;
      ctx.fillStyle = oldFootprint;
      ctx.fill();
      ctx.globalAlpha = 1;
      opacityCoefficient++;
    }
  }
}

export default StartNode;
