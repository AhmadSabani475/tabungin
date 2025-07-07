import AddEntry from "@/components/addEntry";
import GoalDetail from "@/components/GoalDetail";
import GoalTerkumpul from "@/components/GoalTerkumpul";
import { asyncReceiveGoalDetail } from "@/states/goalDetail/action";
import { asyncDeleteGoal, asyncReceiveGoals } from "@/states/goals/action";

import { Edit, MoveLeft, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function DetailPage() {
  const { id } = useParams();
  const goalDetail = useSelector((state) => state.goalDetail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    dispatch(asyncReceiveGoalDetail(id));
  }, [id, dispatch]);

  if (!goalDetail) {
    return <p className="text-center mt-8">Loading detail tabungan...</p>;
  }

  const persen = Math.floor(
    (goalDetail.totalTerkumpul / goalDetail.target) * 100
  );

  const sisa = goalDetail.target - goalDetail.nominalTerkumpul;
  const estimasiPeriode =
    goalDetail.nominalRutin > 0 ? Math.ceil(sisa / goalDetail.nominalRutin) : 0;

  const estimasi = `${estimasiPeriode} ${goalDetail.frekuensi.toLowerCase()} lagi`;

  const handleDelete = async () => {
    setOpenDialog(false);

    await dispatch(asyncDeleteGoal(id));

    await dispatch(asyncReceiveGoals());

    navigate("/", {
      state: {
        alert: {
          title: "Berhasil!",
          description: "Target tabungan berhasil dihapus.",
          variant: "default", 
        },
      },
    });
  };

  const onClickEdit = () => {
    navigate(`/goal/edit/${id}`);
  };

  return (
    <>
      <header className="p-4 w-full bg-[#213448] rounded-2xl text-white font-bold flex justify-between sticky top-0 items-center">
        <div className="flex gap-2 items-center">
          <Link to="/">
            <MoveLeft />
          </Link>
          <h2 className="text-2xl">{goalDetail.namaTabungan}</h2>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={onClickEdit}>
            <Edit />
          </button>

          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogTrigger asChild>
              <button type="button">
                <Trash />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Apakah Anda yakin ingin menghapus target tabungan ini?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <GoalDetail
        gambar={`http://localhost:8081/uploads/${goalDetail.gambar}`}
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

      <AddEntry goalId={id} />
    </>
  );
}

export default DetailPage;
