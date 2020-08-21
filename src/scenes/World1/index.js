import React from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";
import styles from "./styles.module.css";

import {
  gameFactory,
  createLayers,
  createPlayer,
  setupCameras,
  setupPhysics,
  setupPathFinder,
  setupDebugLayer,
  constrainDestinationToWorldBounds,
} from "utilities";

const SCALE = 1;
const PLAYER_SPEED = 200 * SCALE;
const IS_DEBUGGING = Boolean(process.env.REACT_APP_INITIAL_SCENE_ID);

function getPointerDownHandler(map, scene) {
  const GRID_SIZE = map.tileWidth * SCALE;
  const WORLD_WIDTH = map.widthInPixels * SCALE;
  const WORLD_HEIGHT = map.heightInPixels * SCALE;

  const player = scene.registry.get("player");

  return (pointer) => {
    const newDestination = constrainDestinationToWorldBounds(
      scene.cameras.main.getWorldPoint(pointer.x, pointer.y),
      WORLD_WIDTH,
      WORLD_HEIGHT,
      GRID_SIZE
    );

    scene.physics.moveToObject(player, newDestination, PLAYER_SPEED);
    scene.registry.set("destination", newDestination);

    // const fromX = Math.floor(player.x / GRID_SIZE);
    // const fromY = Math.floor(player.y / GRID_SIZE);
    // const toX = Math.floor(destination.x / GRID_SIZE);
    // const toY = Math.floor(destination.y / GRID_SIZE);

    // console.log(fromX, fromY, toX, toY);
    // const pathFinder = scene.registry.get("pathFinder");
    // pathFinder.findPath(fromX, fromY, toX, toY, (path) => console.log(path));
    // pathFinder.calculate();
  };
}

function initialize() {
  this.registry.set("scale", SCALE);
  this.registry.set("player", null);
  this.registry.set("destination", null);
  this.registry.set("isDebugging", IS_DEBUGGING);
}

function preload() {
  this.load.image("player", "assets/player.png");
  this.load.image("tiles", "assets/tilemap/world-1.png");
  this.load.tilemapTiledJSON("map", "assets/tilemap/world-1.json");
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("world-1", "tiles");

  this.registry.set("map", map);
  this.registry.set("tileset", tileset);

  const player = createPlayer(map, this);

  this.registry.set("player", player);
  this.registry.set("pathFinder", setupPathFinder(this));
  this.registry.set("destination", player.body.position);

  const layers = createLayers(this);
  const collisionLayer = layers[1];

  this.registry.set("layers", layers);
  this.registry.set("collisionLayer", collisionLayer);

  setupPhysics(this);
  setupCameras(this);

  this.input.on("pointerdown", getPointerDownHandler(map, this));

  if (IS_DEBUGGING) {
    setupDebugLayer(collisionLayer, layers, this);
    console.log("tileset", tileset);
    console.log("player", player);
    console.log("scene", this);
    console.log("map", map);
  }
}

function update() {
  const player = this.registry.get("player");
  const destination = this.registry.get("destination");
  const distance = Phaser.Math.Distance.Between(
    player.x,
    player.y,
    destination.x,
    destination.y
  );

  if (distance < 4) {
    player.body.setVelocity(0, 0);
  }
}

const game = gameFactory({ initialize, preload, create, update });

function World1Scene() {
  return (
    <div className={styles.World}>
      <IonPhaser game={game} />
    </div>
  );
}

export default World1Scene;
