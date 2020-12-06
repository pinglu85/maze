const TO_RADIANS = Math.PI / 180;

class EntranceIcon {
  constructor(centerX, centerY, facingDir, img, iconSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.facingDir = facingDir;
    this.img = img;
    this.iconSize = iconSize;
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
      this.img,
      -this.iconSize / 2,
      -this.iconSize / 2,
      this.iconSize,
      this.iconSize
    );
    ctx.rotate(-angleInRad);
    ctx.translate(-this.centerX, -this.centerY);
  }
}

export default EntranceIcon;
