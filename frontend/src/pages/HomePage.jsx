import { DropDownField } from "@/components/DropDownField";
import { DropDownUrutan } from "@/components/DropDownUrutan";
import GoalList from "@/components/GoalList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { asyncReceiveGoals } from "@/states/goals/action";
import { Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router";

function HomePage() {
  const { goals = [] } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("namaTabungan");
  const [urutan, setUrutan] = useState("naik"); // "naik" = ascending, "turun" = descending
  const location = useLocation();
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    if (location.state?.alert) {
      setAlertData(location.state.alert);

      window.history.replaceState({}, document.title); // <- pindahkan ke sini

      const timeout = setTimeout(() => {
        setAlertData(null);
      }, 4000);

      return () => clearTimeout(timeout); // <- ini tetap di dalam useEffect
    }
  }, [location.state]);
  useEffect(() => {
    dispatch(asyncReceiveGoals());
  }, [dispatch]);
  console.log("goals from state:", goals);

  const ongoingGoals = goals
    .filter(
      (goal) =>
        goal && goal.status?.toString().trim().toUpperCase() === "BERLANGSUNG"
    )
    .sort((a, b) => {
      let compare = 0;

      switch (sortBy) {
        case "namaTabungan":
          compare = a.namaTabungan.localeCompare(b.namaTabungan);
          break;
        case "tanggalDibuat":
          compare =
            new Date(a.tanggalDibuat).getTime() -
            new Date(b.tanggalDibuat).getTime();
          break;
        case "target":
        case "nominalRutin":
        case "nominalTerkumpul":
          compare = (a[sortBy] || 0) - (b[sortBy] || 0);
          break;
        default:
          compare = 0;
      }

      return urutan === "naik" ? compare : -compare;
    });

  return (
    <div className="p-4">
      {alertData && (
        <Alert variant={alertData.variant}>
          <Trash2Icon />
          <AlertTitle>{alertData.title}</AlertTitle>
          <AlertDescription>{alertData.description}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-around mb-4">
        <DropDownField setSortBy={setSortBy} sortBy={sortBy} />
        <DropDownUrutan urutan={urutan} setUrutan={setUrutan} />
      </div>

      {ongoingGoals.length > 0 ? (
        <GoalList goalList={ongoingGoals} />
      ) : (
        <p className="text-center text-gray-500 mt-8">Tabungan belum dibuat</p>
      )}

      <div className="fixed bottom-4 right-4">
        <Link to="/goals/create">
          <Button className="rounded-full shadow-lg">+ Tambah Celengan</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
