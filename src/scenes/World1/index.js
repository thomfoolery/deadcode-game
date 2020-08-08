import React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

import styles from "./styles.module.css";

const PLAYER_SPEED = 200;
const IS_DEBUGGING = Boolean(process.env.REACT_APP_INITIAL_SCENE_ID);

let player,
  // obstacles,
  destination;

function roundToGrid(position, gridSize) {
  const x = Math.round(position.x / gridSize) * gridSize;
  const y = Math.round(position.y / gridSize) * gridSize;
  return { x, y };
}

function constrainDestinationToWorldBounds(position, width, height, gridSize) {
  const roundedPosition = roundToGrid(position, gridSize);
  const x = Math.min(
    width - gridSize / 2,
    Math.max(0 + gridSize / 2, roundedPosition.x)
  );
  const y = Math.min(
    height - gridSize / 2,
    Math.max(0 + gridSize / 2, roundedPosition.y)
  );
  return { x, y };
}

const scene = {
  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("tiles", "assets/tilemap/world-1.png");
    this.load.tilemapTiledJSON("map", "assets/tilemap/world-1.json");
  },
  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("world-1", "tiles");

    const GRID_SIZE = map.tileWidth;
    const WORLD_WIDTH = map.widthInPixels * GRID_SIZE;
    const WORLD_HEIGHT = map.heightInPixels * GRID_SIZE;

    const belowLayer = map.createStaticLayer("below", tileset, 0, 0);
    const groundLayer = map
      .createStaticLayer("ground", tileset, 0, 0)
      .setCollisionByProperty({ collision: true });
    const aboveLayer = map.createStaticLayer("above", tileset, 0, 0);
    const spawnPoint = map.findObject(
      "points",
      (obj) => obj.name === "PlayerSpawn"
    );

    player = this.physics.add.image(spawnPoint.x, spawnPoint.y, "player");
    player.body.height = player.body.height / 2;
    player.body.offset.y = player.body.height;
    player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    const layers = [belowLayer, groundLayer, player, aboveLayer];
    layers.map((x, index) => x.setDepth(index));

    if (IS_DEBUGGING) {
      const debugGraphics = this.add.graphics().setAlpha(0.2);
      groundLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
      debugGraphics.setDepth(layers.length);
    }

    this.physics.add.collider(player, groundLayer, () => {
      player.body.setVelocity(0, 0);
    });

    destination = player.body.position;

    this.cameras.main.startFollow(player, true);

    this.input.on("pointerdown", (pointer) => {
      destination = constrainDestinationToWorldBounds(
        this.cameras.main.getWorldPoint(pointer.x, pointer.y),
        WORLD_WIDTH,
        WORLD_HEIGHT,
        GRID_SIZE
      );
      this.physics.moveToObject(player, destination, PLAYER_SPEED);
    });
  },
  update() {
    const distance = Phaser.Math.Distance.Between(
      player.x,
      player.y,
      destination.x,
      destination.y
    );

    if (distance < 4) {
      player.body.setVelocity(0, 0);
    }
  },
};

const game = {
  width: "100%",
  height: "100%",
  renderer: Phaser.AUTO,
  disableContextMenu: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: IS_DEBUGGING,
    },
  },
  scene,
};

function World1Scene() {
  return (
    <div className={styles.World}>
      <IonPhaser game={game} />
    </div>
  );
}

export default World1Scene;
