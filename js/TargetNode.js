class TargetNode {
  constructor(centerX, centerY, sprites, spriteSize) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.spriteNormal = sprites[0];
    this.spriteWhite = sprites[1];
    this.spriteSize = spriteSize;
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
