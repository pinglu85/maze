class ExitIcon {
  constructor(centerX, centerY, img, iconSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.img = img;
    this.iconSize = iconSize;
  }

  draw(ctx) {
    ctx.translate(this.centerX, this.centerY);
    ctx.drawImage(
      this.img,
      -Math.floor(this.iconSize / 2),
      -Math.floor(this.iconSize / 2),
      this.iconSize,
      this.iconSize
    );
    ctx.translate(-this.centerX, -this.centerY);
  }
}

export default ExitIcon;
