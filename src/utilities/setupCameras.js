function setupCameras(scene) {
  const map = scene.registry.get("map");
  const scale = scene.registry.get("scale");
  const player = scene.registry.get("player");

  const WORLD_WIDTH = map.widthInPixels * scale;
  const WORLD_HEIGHT = map.heightInPixels * scale;

  scene.cameras.main.startFollow(player, true);
  scene.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
}

export default setupCameras;
