import Phaser from "phaser";

const IS_DEBUGGING = Boolean(process.env.REACT_APP_INITIAL_SCENE_ID);

function gameFactory(scene) {
  return {
    width: "100%",
    height: "100%",
    pixelArt: true,
    renderer: Phaser.AUTO,
    disableContextMenu: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
        debug: IS_DEBUGGING,
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.NO_CENTER,
    },
    scene,
  };
}

export default gameFactory;
