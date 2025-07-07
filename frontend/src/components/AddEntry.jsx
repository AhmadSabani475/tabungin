import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, PenBox } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  asyncAddEntry,
  asyncReceiveGoalDetail,
} from "@/states/goalDetail/action";

function AddEntry({ goalId }) {
  const dispatch = useDispatch();
  const [option, setOption] = useState("TAMBAH");
  const [nominal, setNominal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jenisTransaksi = option;
    const tanggal = new Date().toISOString();

    try {
      await dispatch(
        asyncAddEntry(goalId, {
          nominal,
          keterangan,
          tanggal,
          jenisTransaksi,
        })
      );

      await dispatch(asyncReceiveGoalDetail(goalId)); // Pastikan goalDetail.entries update

      // Reset form
      setNominal("");
      setKeterangan("");
      setOption("TAMBAH");
      setOpen(false);
    } catch (err) {
      console.error("Gagal tambah entry:", err);
      // Tambahkan alert atau toast error jika perlu
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed bottom-6 right-6 z-50 ">
        <DialogTrigger asChild>
          <Button
            className="w-12 h-12 p-2 rounded-full bg-[#254D70] text-white"
            variant="ghost"
          >
            <PenBox size={24} />
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Catat Tabungan</DialogTitle>
            <DialogDescription>
              {option === "TAMBAH" ? "Tambah" : "Kurangi"} saldo tabungan
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex gap-4">
              <Button
                type="button"
                variant={option === "TAMBAH" ? "default" : "outline"}
                onClick={() => setOption("TAMBAH")}
              >
                <Plus size={16} />
                <span>Tambah</span>
              </Button>
              <Button
                type="button"
                variant={option === "KURANG" ? "default" : "outline"}
                onClick={() => setOption("KURANG")}
              >
                <Minus size={16} />
                <span>Kurangi</span>
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nominal">Nominal *</Label>
              <Input
                id="nominal"
                type="number"
                min="0"
                value={nominal}
                onChange={(e) => setNominal(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="keterangan">Keterangan</Label>
              <Input
                id="keterangan"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEntry;
