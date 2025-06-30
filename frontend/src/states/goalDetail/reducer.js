import React from "react";
import { ActionType } from "./action";

function goalDetailReducer(goalDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_GOAL_DETAIL:
      return action.payload.goalDetail;
    case ActionType.CLEAR_GOAL_DETAIL:
      return null;
    default:
      return goalDetail;
  }
}
export default goalDetailReducer;
