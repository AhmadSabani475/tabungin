import { api } from "@/utilty/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};
function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}
function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}
function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading()); 

    try {
      const response = await api.login({ email, password });
      const { token } = response.data.token;
      api.putAccessToken(token);
      const authUser = await api.getProfile();
      dispatch(setAuthUserActionCreator(authUser.data.user));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading()); 
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
