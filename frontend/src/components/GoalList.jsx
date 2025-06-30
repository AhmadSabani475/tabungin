import React from "react";
import GoalItem from "./GoalItem";

function GoalList({ goalList }) {
  return (
    <div className="flex flex-col gap-2">
      {goalList.map((gL) => (
        <GoalItem key={gL.id} {...gL} id={gL.id} />
        
      ))}
    </div>
  );
}
export default GoalList;
