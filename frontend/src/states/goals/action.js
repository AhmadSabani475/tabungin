import { api } from "@/utilty/api";

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
    try {
      const response = await api.getAllGoals();
      dispatch(receiveGoalsActionCreator(response.data.goals));
    } catch (error) {
      alert(error.message);
    }
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
}) {
  return async (dispatch) => {
    try {
      const goal = await api.createGoal({
        namaTabungan,
        target,
        nominalRutin,
        frekuensi,
        hari,
        mataUang,
        tanggalDibuat,
      });
      dispatch(addGoalActionCreator(goal.data));
    } catch (error) {
      alert(error.message);
    }
  };
}
function asyncDeleteGoal(goalId) {
  return async (dispatch) => {
    try {
      await api.deleteGoal(goalId);
      dispatch(deleteGoalActionCreator(goalId));
    } catch (error) {
      alert(error.message);
    }
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
