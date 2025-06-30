import useInput from "@/hooks/useInput";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { BarChart3, Target } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

function AddInput() {
  const [nama, onNama] = useInput();
  const [target, onTarget] = useInput();
  const [rencana, onRencana] = useInput();
  const [nominalPengisian, onNominnalPengisian] = useInput();
  return (
    <form action="" className="flex gap-4">
      <div className="w-[400px]">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </AspectRatio>
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
        </div>
      </div>
    </form>
  );
}
export default AddInput;
