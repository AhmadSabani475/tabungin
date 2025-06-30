import GoalDetail from "@/components/GoalDetail";
import GoalTerkumpul from "@/components/GoalTerkumpul";
import { asyncReceiveGoalDetail } from "@/states/goalDetail/action";
import {
  asyncDeleteGoal,
  deleteGoalActionCreator,
} from "@/states/goals/action";
import { Backpack, Edit, MoveLeft, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";

function DetailPage() {
  const { id } = useParams();
  const goalDetail = useSelector((state) => state.goalDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncReceiveGoalDetail(id));
  }, [id, dispatch]);
  if (!goalDetail) {
    return <p className="text-center mt-8">Loading detail tabungan...</p>;
  }
  if (!goalDetail) {
    return null;
  }
  // Hitung persen progress
  const persen = Math.floor(
    (goalDetail.nominalTerkumpul / goalDetail.target) * 100
  );

  // Hitung estimasi berapa periode lagi (minggu/bulan/hari)
  const sisa = goalDetail.target - goalDetail.nominalTerkumpul;
  const estimasiPeriode = Math.ceil(sisa / goalDetail.nominalRutin);

  // Tambahkan satuan waktu ke estimasi
  let estimasi = `${estimasiPeriode} ${goalDetail.frekuensi.toLowerCase()} lagi`;
  const onDelete = (goalId) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus target tabungan ini?"
    );

    if (isConfirmed) {
      dispatch(asyncDeleteGoal(goalId));
      navigate("/");
    }
  };
  return (
    <>
      <header className="p-4 w-full bg-[#213448] rounded-2xl  text-white font-bold flex justify-between sticky top-0 items-center  ">
        <div className="flex gap-2 items-center">
          <Link to="/">
            <MoveLeft />
          </Link>
          <h2 className="text-2xl">{goalDetail.namaTabungan}</h2>
        </div>
        <div className="flex gap-4">
          {/* <button
            type="button"
            className="cursor-pointer"
            onClick={() => onEdit= (id) }
          >
            <Edit />
          </button> */}
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => onDelete(id)}
          >
            <Trash />
          </button>
        </div>
      </header>
      <GoalDetail
        gambar={goalDetail.gambar}
        target={goalDetail.target}
        nominalPerhari={goalDetail.nominalRutin}
        persen={persen}
        createdAt={goalDetail.tanggalDibuat}
        estimasi={estimasi}
        frekuensi={goalDetail.frekuensi}
      />

      <GoalTerkumpul
        target={goalDetail.target}
        terkumpul={goalDetail.totalTerkumpul}
        entries={goalDetail.entries}
      />
    </>
  );
}
export default DetailPage;
