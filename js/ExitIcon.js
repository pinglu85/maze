class ExitIcon {
  constructor(x, y, img, iconSize) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.iconSize = iconSize;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.iconSize, this.iconSize);
  }
}

export default ExitIcon;
