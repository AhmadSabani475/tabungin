import { api } from "@/utilty/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

function asyncRegister({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export { asyncRegister };
