const sprites = importAll(require.context('../assets', false, /\.png$/));

export const loadStartNodeSprites = (numOfSprites) => {
  return Array.from(new Array(numOfSprites), (_, i) => {
    const sprite = sprites[`start-node-${i}`];
    return loadSprite(sprite);
  });
};

export const loadTargetNodeSprites = (...options) => {
  return options.map((option) => {
    const sprite = sprites[`target-node-${option}`];
    return loadSprite(sprite);
  });
};

function loadSprite(src) {
  const img = new Image();
  img.src = src;
  return img;
}

// Import all images from a directory using webpack
function importAll(r) {
  let sprites = {};
  r.keys().forEach((item) => {
    const key = item.replace(/\.\/(.+)\.png/, '$1');
    sprites[key] = r(item);
  });
  return sprites;
}
