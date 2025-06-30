import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { Hourglass, Settings, SquareArrowLeft, Star, User } from "lucide-react";
function Sidebar({ signOut }) {
  return (
    <aside className="bg-[#EAEFEF] min-h-screen w-52 flex flex-col border-r drop-shadow-xl">
      <div className="flex flex-col items-center mb-16">
        <img src={logo} alt="logo" className="h-24 mx-auto" />
        <h2 className="text-[#213448] text-3xl font-[--font-Jacques-Francois]">
          Tabungin
        </h2>
      </div>
      <div className="flex flex-col  font-[--font-Jacques-Francois] text-[#213448] text-xl">
        <ul>
          <li className="border-t border-b">
            <Link>
              <div className="flex p-4">
                <Hourglass className="mr-2" />
                Berlangsung
              </div>
            </Link>
          </li>
          <li className="border-t border-b">
            <Link>
              <div className="flex p-4">
                <Star className="mr-2" />
                Tercapai
              </div>
            </Link>
          </li>
          <li className="border-t border-b">
            <Link>
              <div className="flex p-4">
                <Settings className="mr-2" />
                Pengaturan
              </div>
            </Link>
          </li>
          <li className="border-t border-b">
            <Link>
              <div className="flex p-4">
                <User className="mr-2" />
                Akun
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex fixed bottom-0 font-[--font-Jacques-Francois] text-[#213448] text-xl  border-t border-b p-4">
        <SquareArrowLeft className="mr-2" />
        <button className="cursor-pointer" onClick={signOut}>
          Keluar
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
