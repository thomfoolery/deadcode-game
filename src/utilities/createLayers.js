function createLayers(scene) {
  const map = scene.registry.get("map");
  const scale = scene.registry.get("scale");
  const player = scene.registry.get("player");
  const tileset = scene.registry.get("tileset");

  const belowLayer = map.createStaticLayer("below", tileset, 0, 0);
  const groundLayer = map
    .createStaticLayer("ground", tileset, 0, 0)
    .setCollisionByProperty({ collision: true });
  const aboveLayer = map.createStaticLayer("above", tileset, 0, 0);

  const layers = [belowLayer, groundLayer, player, aboveLayer];

  layers.forEach((layer, index) => {
    layer.setDepth(index);
    layer.setScale(scale);
  });

  return layers;
}

export default createLayers;
