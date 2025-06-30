import { api } from "@/utilty/api";

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
    try {
      const response = await api.login({ email, password });
      const { token } = response.data.token;
      api.putAccessToken(token);
      const authUser = await api.getProfile();
      dispatch(setAuthUserActionCreator(authUser.data.user));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return async (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
  };
}
export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
