function createPlayer(map, scene) {
  const spawnPoint = map.findObject(
    "objects",
    (obj) => obj.name === "PlayerSpawn"
  );

  const player = scene.physics.add.image(spawnPoint.x, spawnPoint.y, "player");
  player.body.setSize(player.width, player.height / 2);
  player.body.setOffset(0, player.body.height);
  player.setCollideWorldBounds(true);

  return player;
}

export default createPlayer;
