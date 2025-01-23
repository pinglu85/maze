const spriteNameToSrc = importAllSprites(
  require.context("../assets", false, /\.png$/),
);

function loadStartNodeSprites(numOfSprites) {
  return Array.from(new Array(numOfSprites), (_, i) => {
    const src = spriteNameToSrc[`start-node-${i}`];
    return loadSprite(src);
  });
}

function loadTargetNodeSprites(...options) {
  return options.map((option) => {
    const src = spriteNameToSrc[`target-node-${option}`];
    return loadSprite(src);
  });
}

function loadWeightSprite() {
  const src = spriteNameToSrc.weight;
  return loadSprite(src);
}

function loadSprite(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// Import all images from a directory using webpack
function importAllSprites(requireContext) {
  const spriteNameToSrc = {};

  for (const key of requireContext.keys()) {
    const spriteName = key.replace(/\.\/(.+)\.png/, "$1");
    spriteNameToSrc[spriteName] = requireContext(key);
  }
  return spriteNameToSrc;
}

export { loadStartNodeSprites, loadTargetNodeSprites, loadWeightSprite };
