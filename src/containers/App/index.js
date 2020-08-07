import React, { useReducer } from "react";
import { initialState, reducer } from "state";

import StartScene from "scenes/Start";
import WorldScene from "containers/World";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  switch (state.sceneId) {
    case "WORLD":
      return <WorldScene dispatch={dispatch} />;
    case "START":
    default:
      return <StartScene dispatch={dispatch} />;
  }
}

export default App;
