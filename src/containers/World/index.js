import React, { useCallback } from "react";
import * as scenes from "scenes";

function WorldScene({ dispatch }) {
  const handlePause = useCallback(() => {
    dispatch({ type: "CHANGE_SCENE", sceneId: "PAUSE" });
  }, [dispatch]);

  const Scene = scenes["World1"];

  return <Scene handlePause={handlePause} />;
}

export default WorldScene;
