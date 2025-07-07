import AddInput from "@/components/AddInput";
import { asyncAddGoal } from "@/states/goals/action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

function AddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const onAdd = async ({
    namaTabungan,
    target,
    nominalRutin,
    frekuensi,
    hari,
    gambar,
    mataUang = "IDR",
    tanggalDibuat = new Date().toISOString().split("T")[0],
  }) => {
    try {
      setError(null);
      const formattedDate = new Date(tanggalDibuat).toISOString().split("T")[0];

      const result = await dispatch(
        asyncAddGoal({
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
        navigate("/", {
          state: {
            alert: {
              variant: "success", // bisa kamu sesuaikan: "success", "destructive", dll
              title: "Berhasil!",
              description: "Tabungan berhasil ditambahkan.",
            },
          },
        });
      } else {
        setError(result?.message || "Gagal menambahkan tabungan");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan");
      console.error("Add goal error:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      <AddInput onAdd={onAdd} />
    </div>
  );
}

export default AddPage;
