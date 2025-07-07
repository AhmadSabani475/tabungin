import GoalList from "@/components/GoalList";
import { Button } from "@/components/ui/button";
import { asyncReceiveGoals } from "@/states/goals/action";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
function TercapaiPage() {
  const { goals = [] } = useSelector((states) => states);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncReceiveGoals());
  }, [dispatch]);
  const onClearGoals = goals.filter(
    (goal) => goal.status?.toString().trim().toUpperCase() !== "BERLANGSUNG"
  );

  return (
    <div className="p-4">
      <GoalList goalList={onClearGoals} />
      <div className="fixed bottom-4 right-4">
        <Link to="/goals/create">
          <Button className="rounded-full shadow-lg">+ Tambah Celengan</Button>
        </Link>
      </div>
    </div>
  );
}
export default TercapaiPage;