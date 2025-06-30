import { api } from "@/utilty/api";
import { setAuthUserActionCreator } from "../auth/action";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};
function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}
function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const token = api.getAccessToken();
      if (token) {
        const authUser = await api.getProfile();
        if (!authUser.error) {
          dispatch(setAuthUserActionCreator(authUser.data));
        } else {
          dispatch(setAuthUserActionCreator(null));
        }
      } else {
        dispatch(setAuthUserActionCreator(null));
      }
    } catch {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { ActionType, setAuthUserActionCreator, asyncPreloadProcess };
