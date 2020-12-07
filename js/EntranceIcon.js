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
    this.prevCenters = [];
    this.nextCenterX = 0;
    this.nextCenterY = 0;
  }

  move() {
    if (!this.currentPathSegement) {
      this.currentPathSegement = this.pathCoordinates.pop();
    }
    const [centerX, centerY] = this.currentPathSegement;

    this.nextCenterX = centerX;
    this.nextCenterY = centerY;

    if (
      this.centerX === this.nextCenterX &&
      this.centerY === this.nextCenterY
    ) {
      this.prevCenters.push([this.centerX, this.centerY]);
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

  drawFootprints(ctx) {
    const numOfprevCenters = this.prevCenters.length;
    const lastSecondFootprint = this.prevCenters[numOfprevCenters - 2];

    if (lastSecondFootprint) {
      const [centerX, centerY] = lastSecondFootprint;

      ctx.beginPath();
      ctx.arc(centerX, centerY, this.iconSize / 7, 0, 2 * Math.PI);
      ctx.fillStyle = '#c675ff';
      ctx.fill();
    }

    for (let i = 0; i < numOfprevCenters - 3; i++) {
      const [centerX, centerY] = this.prevCenters[i];
      ctx.beginPath();
      ctx.arc(centerX, centerY, this.iconSize / 7, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(254, 162, 70, 0.06)';
      ctx.fill();
    }
  }
}

export default EntranceIcon;
