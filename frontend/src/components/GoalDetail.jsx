import React from "react";
import { Card, CardFooter } from "./ui/card";

function GoalDetail({
  gambar,
  target,
  nominalPerhari,
  persen,
  createdAt,
  estimasi,
  frekuensi,
}) {
  return (
    <div className="p-4 flex flex-col gap-4 w-full ">
      <div className="w-full mx-auto bg-white  flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Goal Target"
          className="h-[350px] w-full rounded-lg object-cover"
        />
      </div>
      <Card className="bg-[#213448] w-full  p-4 shadow-2xl shadow-black">
        <div className="flex border-b border-b-white justify-between items-center p-2 ">
          <div className="text-white ">
            <h2 className="text-2xl ">{target}</h2>
            <p className="text-md ">
              Rp. {nominalPerhari}/{frekuensi}
            </p>
          </div>
          <div className=" w-24 h-24 border-2 border-white rounded-full bg-[#213448] text-center flex items-center justify-center">
            <p className="text-2xl font-bold text-white">{persen}%</p>
          </div>
        </div>
        <CardFooter className="flex-col gap-2 w-full text-white">
          <div className="flex justify-between w-full">
            <h2>Tanggal Dibuat</h2>
            <h2>{createdAt}</h2>
          </div>
          <div className="flex justify-between w-full">
            <h2>Estimasi</h2>
            <h2>{estimasi}</h2>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
export default GoalDetail;
