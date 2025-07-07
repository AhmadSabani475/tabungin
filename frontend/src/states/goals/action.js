import { api } from "@/utilty/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  RECEIVE_GOALS: "RECEIVE_GOALS",
  ADD_GOAL: "ADD_GOAL",
  DELETE_GOAL: "DELETE_GOAL",
};
function receiveGoalsActionCreator(goals) {
  return {
    type: ActionType.RECEIVE_GOALS,
    payload: {
      goals,
    },
  };
}
function addGoalActionCreator(goal) {
  return {
    type: ActionType.ADD_GOAL,
    payload: {
      goal,
    },
  };
}
function deleteGoalActionCreator(goalId) {
  return {
    type: ActionType.DELETE_GOAL,
    payload: {
      goalId,
    },
  };
}
function asyncReceiveGoals() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.getAllGoals();
      console.log("API Response Goals:", response.data);
      dispatch(receiveGoalsActionCreator(response.data));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
function asyncAddGoal({
  namaTabungan,
  target,
  nominalRutin,
  frekuensi,
  hari,
  mataUang,
  tanggalDibuat,
  gambar,
}) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { error, data, message } = await api.createGoal({
        namaTabungan,
        target,
        nominalRutin,
        frekuensi,
        hari,
        mataUang,
        tanggalDibuat,
        gambar,
      });
      console.log("Response dari API createGoal:", data);
      if (error) {
        throw new Error(message || "Gagal menambahkan tabungan");
      }

      dispatch(addGoalActionCreator(data.goal)); // Sesuaikan dengan struktur response
      return { success: true, data }; // Return untuk feedback di komponen
    } catch (error) {
      console.error("Add goal error:", error);
      alert(error.message);
      return { success: false, message: error.message }; // Return error state
    } finally {
      dispatch(hideLoading());
    }
  };
}
function asyncDeleteGoal(goalId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteGoal(goalId);
      dispatch(deleteGoalActionCreator(goalId));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
export {
  ActionType,
  receiveGoalsActionCreator,
  addGoalActionCreator,
  asyncAddGoal,
  asyncReceiveGoals,
  deleteGoalActionCreator,
  asyncDeleteGoal,
};
