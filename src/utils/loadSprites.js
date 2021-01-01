export const loadStartNodeSprites = (numOfSprites) => {
  return Array.from(new Array(numOfSprites), (_, i) =>
    loadSprite(`./assets/start-node-${i}.png`)
  );
};

export const loadTargetNodeSprites = (...options) => {
  return options.map((option) =>
    loadSprite(`./assets/target-node-${option}.png`)
  );
};

function loadSprite(src) {
  const img = new Image();
  img.src = src;
  return img;
}
