import { api } from "@/utilty/api";

const ActionType = {
  RECEIVE_GOAL_DETAIL: "RECEIVE_GOAL_DETAIL",
  CLEAR_GOAL_DETAIL: "CLEAR_GOAL_DETAIL",
};

function receiveGoalDetailActionCreator(goalDetail) {
  return {
    type: ActionType.RECEIVE_GOAL_DETAIL,
    payload: {
      goalDetail,
    },
  };
}
function clearGoalDetailActionCreator() {
  return {
    type: ActionType.CLEAR_GOAL_DETAIL,
  };
}

function asyncReceiveGoalDetail(goalId) {
  return async (dispatch) => {
    dispatch(clearGoalDetailActionCreator());
    try {
      // Ambil detail goal
      const goalResponse = await api.getDetailGoal(goalId);
      const goal = goalResponse.data.goal;

      // Ambil entries (isi tabungan)
      const entriesResponse = await api.getEntries(goalId);
      const entries = entriesResponse.data.entries || [];


      const totalTerkumpul = entries.reduce(
        (sum, entry) => sum + entry.nominal,
        0
      );

      // Gabungkan semua ke dalam goalDetail
      const goalDetail = {
        ...goal,
        entries,
        totalTerkumpul,
      };
      dispatch(receiveGoalDetailActionCreator(goalDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}
export { ActionType, receiveGoalDetailActionCreator, asyncReceiveGoalDetail };
