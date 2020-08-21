import Phaser from "phaser";

function setupDebugLayer(layer, layers, scene) {
  const debugGraphics = scene.add.graphics().setAlpha(0.2);
  layer.renderDebug(debugGraphics, {
    tileColor: null, // Color of non-colliding tiles
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
  });
  debugGraphics.setDepth(layers.length);
}

export default setupDebugLayer;
