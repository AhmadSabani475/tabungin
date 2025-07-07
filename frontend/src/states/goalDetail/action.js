import { api } from "@/utilty/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  RECEIVE_GOAL_DETAIL: "RECEIVE_GOAL_DETAIL",
  CLEAR_GOAL_DETAIL: "CLEAR_GOAL_DETAIL",
  DELETE_GOAL: "DELETE_GOAL",
  ADD_ENTRY: "ADD_ENTRY",
  EDIT_GOAL: "EDIT_GOAL",
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
function deleteGoalActionCreator(goalId) {
  return {
    type: ActionType.DELETE_GOAL,
    payload: {
      goalId,
    },
  };
}
function addEntryActionCreator(newEntry) {
  return {
    type: ActionType.ADD_ENTRY,
    payload: {
      newEntry,
    },
  };
}
function editGoalActionCreator(updatedGoal) {
  return {
    type: ActionType.EDIT_GOAL,
    payload: {
      updatedGoal,
    },
  };
}
function asyncEditGoal(goalId, updatedData) {
  return async (dispatch) => {
    try {
      const response = await api.editGoal(goalId, updatedData);
      if (!response.error) {
        dispatch(editGoalActionCreator(response.data));
        dispatch(asyncReceiveGoalDetail(goalId));
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };
}

function asyncAddEntry(goalId, entryData) {
  return async (dispatch) => {
    // 👀 log ini

    const { nominal, keterangan, tanggal, jenisTransaksi } = entryData;

    try {
      const {  data } = await api.addEntry(goalId, {
        nominal,
        keterangan,
        tanggal,
        jenisTransaksi,
      });

      dispatch(addEntryActionCreator(data.entry));
      dispatch(asyncReceiveGoalDetail(goalId));
      return { success: true };
    } catch  {
      return { success: false };
    }
  };
}

function asyncDeleteGoal(goalId) {
  return async (dispatch) => {
    try {
      await api.deleteGoal(goalId);
      dispatch(deleteGoalActionCreator(goalId));
      dispatch(clearGoalDetailActionCreator());
    } catch (error) {
      alert(error.message);
    }
  };
}
function asyncReceiveGoalDetail(goalId) {
  return async (dispatch) => {
    dispatch(clearGoalDetailActionCreator());
    dispatch(showLoading());
    try {

      const goalResponse = await api.getDetailGoal(goalId);
      const goal = goalResponse.data;

      const entriesResponse = await api.getEntries(goalId);
      const entries = entriesResponse.data.entries || [];
      const totalTerkumpul = entries.reduce(
        (sum, entry) => sum + parseFloat(entry.nominal),
        0
      );

      const goalDetail = {
        ...goal,
        entries,
        totalTerkumpul,
      };
      dispatch(receiveGoalDetailActionCreator(goalDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncEditGoal,
  editGoalActionCreator,
  receiveGoalDetailActionCreator,
  asyncReceiveGoalDetail,
  asyncDeleteGoal,
  deleteGoalActionCreator,
  asyncAddEntry,
  addEntryActionCreator,
};
