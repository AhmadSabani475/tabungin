import { ActionType } from "./action";

function goalsReducer(goals = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_GOALS:
      return action.payload.goals;
    case ActionType.ADD_GOAL:
      return [action.payload.goal, ...goals];
    case ActionType.DELETE_GOAL:
      return goals.filter((goal) => goal.id !== action.payload.goalId);
    default:
      return goals;
  }
}
export default goalsReducer;
