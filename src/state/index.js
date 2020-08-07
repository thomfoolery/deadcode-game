const SCENE_IDS = ["START", "PAUSE", "WORLD", "NET"];

const initialState = {
  sceneId: process.env.REACT_APP_INITIAL_SCENE_ID || "START",
};

function reducer(state = initialState, action) {
  console.log("reducer action", action);

  switch (action.type) {
    case "CHANGE_SCENE":
      return {
        ...state,
        sceneId: SCENE_IDS.includes(action.sceneId)
          ? action.sceneId
          : state.sceneId,
      };
    default:
      return {
        ...state,
      };
  }
}

export { SCENE_IDS, initialState, reducer };
