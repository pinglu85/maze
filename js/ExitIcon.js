class ExitIcon {
  constructor(centerX, centerY, imgs, iconSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.imgNormal = imgs[0];
    this.imgWhite = imgs[1];
    this.iconSize = iconSize;
  }

  draw(ctx, imgOption = 'imgNormal') {
    ctx.translate(this.centerX, this.centerY);
    ctx.drawImage(
      this[imgOption],
      -Math.floor(this.iconSize / 2),
      -Math.floor(this.iconSize / 2),
      this.iconSize,
      this.iconSize
    );
    ctx.translate(-this.centerX, -this.centerY);
  }
}

export default ExitIcon;
