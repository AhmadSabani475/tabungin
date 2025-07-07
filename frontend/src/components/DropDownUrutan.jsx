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
import { ArrowDownUp, ChevronDown } from "lucide-react";

export function DropDownUrutan({ urutan, setUrutan }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-transparent border border-black text-black flex items-center gap-2"
        >
          <ArrowDownUp />
          {urutan == "naik" ? "Menaik" : "Menurun"}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={urutan} onValueChange={setUrutan}>
          <DropdownMenuRadioItem value="naik">Meningkat</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="turun">Menurun</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
