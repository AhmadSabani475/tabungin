import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./auth/reducer";
import isPreloadReducer from "./isPreload/reducer";
import goalsReducer from "./goals/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import goalDetailReducer from "./goalDetail/reducer";
import { loadingBarMiddleware } from "react-redux-loading-bar";
const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    goals: goalsReducer,
    loadingBar: loadingBarReducer,
    goalDetail: goalDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loadingBarMiddleware()), 
});
export default store;
