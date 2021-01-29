function applyDropShadow(ctx, option = null) {
  ctx.shadowColor = option === 'reset' ? 'transparent' : 'rgba(0, 0, 0, .4)';
  ctx.shadowBlur = option === 'reset' ? 0 : 2;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

export default applyDropShadow;
