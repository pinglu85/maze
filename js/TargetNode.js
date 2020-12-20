class TargetNode {
  constructor(sprites, spriteSize) {
    this.centerX = 0;
    this.centerY = 0;
    this.spriteNormal = sprites[0];
    this.spriteWhite = sprites[1];
    this.spriteSize = spriteSize;
  }

  setPosition({ exitCell }) {
    this.centerX = exitCell.centerX;
    this.centerY = exitCell.centerY;
  }

  draw(ctx, spriteOption = 'spriteNormal') {
    ctx.translate(this.centerX, this.centerY);
    ctx.drawImage(
      this[spriteOption],
      -Math.floor(this.spriteSize / 2),
      -Math.floor(this.spriteSize / 2),
      this.spriteSize,
      this.spriteSize
    );
    ctx.translate(-this.centerX, -this.centerY);
  }
}

export default TargetNode;
