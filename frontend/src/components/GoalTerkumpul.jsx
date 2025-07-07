import React from "react";
import { Card } from "./ui/card";

function GoalTerkumpul({ target, terkumpul, entries }) {
  const sisa = target - terkumpul;

  return (
    <div className="p-4 flex flex-col gap-4 w-full">
      <Card className="bg-[#213448] w-full shadow-2xl shadow-black text-white">
        <div className="flex justify-around mx-4 text-xl border-b border-white p-2">
          <div className="text-center">
            <h2 className="font-medium">Terkumpul</h2>
            <p>Rp. {terkumpul.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <h2 className="font-medium">Kekurangan</h2>
            <p>Rp. {sisa.toLocaleString()}</p>
          </div>
        </div>

        <div>
          {entries && entries.length > 0 ? (
            <ul className="space-y-1 text-sm font-bold">
              {entries.map((entry, index) => {
                const isPositive = entry.nominal >= 0;
                return (
                  <li
                    key={entry.id || index}
                    className={`flex justify-around p-2 rounded`}
                  >
                    <span className="text-white">{entry.tanggal}</span>
                    <span
                      className={`${
                        isPositive ? "text-green-500" : "text-red-800"
                      }`}
                    >
                      {isPositive ? "+" : "-"}Rp.{" "}
                      {Math.abs(entry.nominal).toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm p-2">
              Belum ada riwayat tabungan.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default GoalTerkumpul;
