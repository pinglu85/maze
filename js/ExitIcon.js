class ExitIcon {
  constructor(centerX, centerY, img, imgWhite, iconSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.img = img;
    this.imgWhite = imgWhite;
    this.iconSize = iconSize;
  }

  draw(ctx, isImgWhite = false) {
    const img = isImgWhite ? this.imgWhite : this.img;
    ctx.translate(this.centerX, this.centerY);
    ctx.drawImage(
      img,
      -Math.floor(this.iconSize / 2),
      -Math.floor(this.iconSize / 2),
      this.iconSize,
      this.iconSize
    );
    ctx.translate(-this.centerX, -this.centerY);
  }
}

export default ExitIcon;
