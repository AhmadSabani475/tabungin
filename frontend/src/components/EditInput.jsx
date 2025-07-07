import React, { useState, useEffect } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BarChart3, Target } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function EditInput({ data, onSubmit }) {
  const [nama, setNama] = useState(data.namaTabungan || "");
  const [target, setTarget] = useState(data.target || "");
  const [rencana, setRencana] = useState(data.frekuensi || "harian");
  const [nominal, setNominal] = useState(data.nominalRutin || "");
  const [previewImage, setPreviewImage] = useState(
    data?.gambar
      ? `http://localhost:8081/uploads/${data.gambar}`
      : "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
  );

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (data) {
      setNama(data.namaTabungan || "");
      setTarget(data.target || "");
      setRencana(data.frekuensi || "harian");
      setNominal(data.nominalRutin || "");
      setPreviewImage(
        data?.gambar
          ? `http://localhost:8081/uploads/${data.gambar}`
          : "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
      );
    }
  }, [data]);

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
    const formData = {
      namaTabungan: nama,
      target,
      frekuensi: rencana,
      nominalRutin: nominal,
      gambar: selectedFile ? previewImage : data.gambar,
      file: selectedFile || null,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 justify-between">
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
              onChange={(e) => setNama(e.target.value)}
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
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>

          <h2 className="text-xl font-bold">Rencana Pengisian</h2>
          <div className="flex flex-col gap-4">
            <div className="flex rounded-3xl border border-black justify-around w-full bg-gray-100 overflow-hidden">
              {["harian", "mingguan", "bulanan"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`py-2 px-4 w-full hover:bg-gray-200 ${
                    rencana === item ? "bg-gray-300" : ""
                  } ${item !== "bulanan" ? "border-r border-black" : ""}`}
                  onClick={() => setRencana(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
            <Input
              className="bg-white"
              type="number"
              placeholder="Nominal Pengisian"
              value={nominal}
              onChange={(e) => setNominal(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditInput;
