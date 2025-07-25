import React from "react";
import { Card, CardFooter } from "./ui/card";
import iphone from "../assets/iphone.jpg";
import { useNavigate } from "react-router";
function GoalItem({
  id,
  namaTabungan,
  target,
  nominalRutin,
  frekuensi,
  nominalTerkumpul,
  imageUrl,
}) {
  const navigate = useNavigate();
  const displayImage = imageUrl || iphone;
  const persen = Math.min(Math.round((nominalTerkumpul / target) * 100), 100);
  const sisa = target - nominalTerkumpul;
  const estimasiDurasi = Math.ceil(sisa / nominalRutin); 
  let estimasiTeks = `${estimasiDurasi} ${frekuensi.toLowerCase()} lagi`;
  const sudahTercapai = nominalTerkumpul >= target;

  const onClick = () => {
    if (!sudahTercapai) {
      navigate(`/goal/${id}`);
    }
  };
  return (
    <Card className="bg-[#213448] w-full cursor-pointer " onClick={onClick}>
      <div className="relative flex p-2 border-b gap-16 text-white">
        <div className="bg-white w-55 rounded-lg border">
          <img
            src={displayImage}
            alt={`Tabungan ${namaTabungan}`}
            className="mx-auto rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            onError={(e) => {
              e.target.src = iphone; 
            }}
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-20">{namaTabungan}</h2>
          <h2 className="text-xl font-semibold mb-2">
            Rp. {target.toLocaleString()}
          </h2>
          <p className="text-md ">
            Rp. {nominalRutin.toLocaleString()}/{frekuensi}
          </p>
        </div>
        <div className="absolute bottom-2 right-3 w-24 h-24 border-2 border-white rounded-full bg-[#213448] text-center flex items-center justify-center">
          <p className="text-2xl font-bold text-white">{persen}%</p>
        </div>
      </div>

      <CardFooter>
        <p className="mx-auto text-white text-lg ">{estimasiTeks}</p>
      </CardFooter>
    </Card>
  );
}
export default GoalItem;
