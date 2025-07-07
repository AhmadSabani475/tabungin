import React from "react";
import { ActionType } from "./action";

function goalDetailReducer(goalDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_GOAL_DETAIL:
      return action.payload.goalDetail;

    case ActionType.DELETE_GOAL:
      return null;

    case ActionType.ADD_ENTRY:
      if (!goalDetail) return goalDetail;

      return {
        ...goalDetail,
        entries: [...goalDetail.entries, action.payload.newEntry],
        totalTerkumpul:
          goalDetail.totalTerkumpul +
          parseFloat(action.payload.newEntry.nominal),
      };
    case ActionType.EDIT_GOAL:
      if (!goalDetail || goalDetail.id !== action.payload.updatedGoal.id) {
        return goalDetail;
      }

      return {
        ...goalDetail,
        ...action.payload.updatedGoal,
      };
    case ActionType.CLEAR_GOAL_DETAIL:
      return null;

    default:
      return goalDetail;
  }
}

export default goalDetailReducer;
