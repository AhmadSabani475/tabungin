// components/DeleteConfirmation.jsx
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

function DeleteAlert({ onConfirm, id }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 hover:bg-transparent text-white">
          <Trash className="h-5 w-5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
          <AlertDialogDescription>
            Target tabungan ini akan dihapus permanen. Anda tidak bisa
            mengembalikannya.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(id)}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteAlert;
