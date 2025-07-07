import useInput from "@/hooks/useInput";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BarChart3, Target } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
function AddInput({ onAdd }) {
  const [nama, onNama] = useInput();
  const [target, onTarget] = useInput();
  const [rencana, onRencana] = useInput("harian");
  const [nominalPengisian, onNominnalPengisian] = useInput();
  const [previewImage, setPreviewImage] = useState(
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleRencanaChange = (value) => {
    onRencana({ target: { value } });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama || !target || !nominalPengisian) {
      alert("Harap lengkapi semua field yang diperlukan!");
      return;
    }

    onAdd({
      namaTabungan: nama,
      target: parseFloat(target),
      nominalRutin: parseFloat(nominalPengisian),
      frekuensi: rencana,
      hari: rencana === "mingguan" ? "senin" : null, 
      mataUang: "IDR", 
      tanggalDibuat: new Date().toISOString(),
      gambar: selectedFile,
    });
  };
  console.log("File yang dikirim:", selectedFile);
  console.log("Tipe:", typeof selectedFile);

  return (
    <form
      action=""
      className="flex gap-4 justify-between"
      onSubmit={handleSubmit}
    >
      <div className="w-3/4">
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg relative group"
        >
          <img
            src={previewImage}
            alt="Preview Tabungan"
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-lg">
            <Label
              htmlFor="picture"
              className="cursor-pointer px-4 py-2 bg-white text-black rounded-md"
            >
              Upload Gambar
            </Label>
          </div>
        </AspectRatio>
        <Input
          id="picture"
          type="file"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
        />
        <div className="p-2 my-2 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="font-bold text-3xl">
              <BarChart3 />
            </div>
            <Input
              className="bg-white"
              type="text"
              placeholder="Nama Tabungan"
              value={nama}
              onChange={onNama}
            />
          </div>
          <div className="flex gap-4 items-center">
            <div className="font-bold text-3xl">
              <Target />
            </div>
            <Input
              className="bg-white"
              type="text"
              placeholder="Target Tabungan"
              value={target}
              onChange={onTarget}
            />
          </div>
          <h2 className="text-xl font-bold ">Rencana Pengisian</h2>
          <div className="flex flex-col gap-4">
            <div className="flex rounded-3xl border border-black justify-around w-full bg-gray-100 overflow-hidden">
              <button
                type="button"
                className={`border-r border-black py-2 px-4 hover:bg-gray-200 w-full ${
                  rencana === "harian" ? "bg-gray-300" : ""
                }`}
                onClick={() => handleRencanaChange("harian")}
              >
                Harian
              </button>
              <button
                type="button"
                className={`border-r border-black py-2 px-4 hover:bg-gray-200 w-full ${
                  rencana === "mingguan" ? "bg-gray-300" : ""
                }`}
                onClick={() => handleRencanaChange("mingguan")}
              >
                Mingguan
              </button>
              <button
                type="button"
                className={`py-2 px-4 hover:bg-gray-200 w-full ${
                  rencana === "bulanan" ? "bg-gray-300" : ""
                }`}
                onClick={() => handleRencanaChange("bulanan")}
              >
                Bulanan
              </button>
            </div>
            <Input
              className="bg-white"
              type="text"
              placeholder="Nominal Pengisian"
              value={nominalPengisian}
              onChange={onNominnalPengisian}
            />
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-[#0AB1DD] text-black p-4 rounded-3xl hover:text-white cursor-pointer"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}
export default AddInput;
