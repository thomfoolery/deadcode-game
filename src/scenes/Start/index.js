import React, { useCallback } from "react";

import styles from "./styles.module.css";

function StartScene({ dispatch }) {
  const handleStartGame = useCallback(() => {
    dispatch({ type: "CHANGE_SCENE", sceneId: "WORLD" });
  }, [dispatch]);

  return (
    <div className={styles.Start}>
      <button onClick={handleStartGame}>Start</button>
    </div>
  );
}

export default StartScene;
