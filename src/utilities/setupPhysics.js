function setupPhysics(scene) {
  const map = scene.registry.get("map");
  const scale = scene.registry.get("scale");
  const player = scene.registry.get("player");
  const collisionLayer = scene.registry.get("collisionLayer");

  const WORLD_WIDTH = map.widthInPixels * scale;
  const WORLD_HEIGHT = map.heightInPixels * scale;

  scene.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  scene.physics.add.collider(player, collisionLayer, () => {
    player.body.setVelocity(0, 0);
  });
}

export default setupPhysics;
