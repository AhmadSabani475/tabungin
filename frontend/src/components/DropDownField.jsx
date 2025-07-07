"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignLeft, ChevronDown } from "lucide-react";

export function DropDownField({ sortBy, setSortBy }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border border-black text-black flex items-center gap-2"
        >
          <AlignLeft />
          {sortBy === "namaTabungan"
            ? "Nama Tabungan"
            : sortBy === "tanggalDibuat"
            ? "Tanggal Dibuat"
            : sortBy === "target"
            ? "Target Tabungan"
            : sortBy === "nominalRutin"
            ? "Nominal Pengisian"
            : sortBy === "nominalTerkumpul"
            ? "Nominal Terkumpul"
            : "Urutan"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="namaTabungan">
            Nama Tabungan
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="target">
            TargetTabungan
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="nominalPengisian">
            Nominal Pengisian
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="tanggalDibuat">
            Tanggal Dibuat
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="nominalTerkumpul">
            Nominal Terkumpul
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
