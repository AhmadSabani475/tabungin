import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  asyncEditGoal,
  asyncReceiveGoalDetail,
} from "@/states/goalDetail/action";
import EditInput from "@/components/EditInput"; // Ganti AddInput menjadi EditInput

function EditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const goalDetail = useSelector((state) => state.goalDetail);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(asyncReceiveGoalDetail(id));
  }, [dispatch, id]);

  const onEdit = async ({
    namaTabungan,
    target,
    nominalRutin,
    frekuensi,
    hari,
    gambar,
    mataUang = "IDR",
  }) => {
    try {
      setError(null);
      const tanggalDibuatRaw = goalDetail?.tanggalDibuat;

      let formattedDate = "";

      if (tanggalDibuatRaw && !isNaN(new Date(tanggalDibuatRaw))) {
        formattedDate = new Date(tanggalDibuatRaw).toISOString().split("T")[0];
      } else {
        formattedDate = new Date().toISOString().split("T")[0]; // fallback default: today
      }

      const result = await dispatch(
        asyncEditGoal(id, {
          namaTabungan,
          target,
          nominalRutin,
          frekuensi,
          hari,
          gambar,
          mataUang,
          tanggalDibuat: formattedDate,
        })
      );

      if (result?.success) {
        navigate(`/goal/${id}`);
      } else {
        setError(result?.message || "Gagal mengedit tabungan");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengedit");
      console.error("Edit goal error:", err);
    }
  };

  if (!goalDetail) {
    return <p className="text-center p-4">Memuat data tabungan...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      <EditInput data={goalDetail} onSubmit={onEdit} />
    </div>
  );
}

export default EditPage;
