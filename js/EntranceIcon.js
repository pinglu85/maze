const TO_RADIANS = Math.PI / 180;

class EntranceIcon {
  constructor(centerX, centerY, facingDir, img, iconSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.facingDir = facingDir;
    this.img = img;
    this.iconSize = iconSize;
    this.pathCoordinates = null;
    this.currentPathSegement = null;
    this.atExit = false;
    this.prevCenterX = 0;
    this.prevCenterY = 0;
    this.nextCenterX = 0;
    this.nextCenterY = 0;
  }

  move() {
    if (!this.currentPathSegement) {
      this.currentPathSegement = this.pathCoordinates.pop();
    }
    const {
      coordinates: { middle }
    } = this.currentPathSegement;

    this.nextCenterX = middle.x;
    this.nextCenterY = middle.y;

    if (
      this.centerX === this.nextCenterX &&
      this.centerY === this.nextCenterY
    ) {
      this.prevCenterX = this.centerX;
      this.prevCenterY = this.centerY;
      this.currentPathSegement = this.pathCoordinates.pop();
      if (!this.currentPathSegement) {
        this.atExit = true;
      }
      return;
    }

    if (this.centerX === this.nextCenterX) {
      if (this.centerY < this.nextCenterY) {
        this.facingDir = 'south';
      } else {
        this.facingDir = 'north';
      }
    }

    if (this.centerY === this.nextCenterY) {
      if (this.centerX < this.nextCenterX) {
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
    ctx.clearRect(
      -Math.floor(this.iconSize / 2),
      -Math.floor(this.iconSize / 2),
      this.iconSize,
      this.iconSize
    );
    ctx.rotate(angleInRad);
    ctx.drawImage(
      this.img,
      -Math.floor(this.iconSize / 2),
      -Math.floor(this.iconSize / 2),
      this.iconSize,
      this.iconSize
    );
    ctx.rotate(-angleInRad);
    ctx.translate(-this.centerX, -this.centerY);
  }

  drawDot(ctx, color) {
    const differenceX = this.centerX - this.prevCenterX;
    const differenceY = this.centerY - this.prevCenterY;
    const distancePrevAndCurrCenter = Math.sqrt(
      differenceX * differenceX + differenceY * differenceY
    );
    if (distancePrevAndCurrCenter === this.iconSize) {
      ctx.beginPath();
      ctx.arc(
        this.prevCenterX,
        this.prevCenterY,
        this.iconSize / 5,
        0,
        2 * Math.PI
      );
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
}

export default EntranceIcon;
