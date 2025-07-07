import React from "react";
import logo from "../assets/logo.png";
// perbaiki ke react-router-dom
import { Hourglass, Settings, SquareArrowLeft, Star, User } from "lucide-react";
import { useLocation, Link } from "react-router";

function Sidebar({ signOut }) {
  const location = useLocation();
  const path = location.pathname;

  const menuItemClass = (targetPath) =>
    `border-t border-b p-4 flex items-center ${
      path === targetPath ? "border-b-3 border-[#3B82F6] " : ""
    }`;

  return (
    <aside className="fixed top-0 left-0 h-screen w-52 bg-[#EAEFEF] border-r drop-shadow-xl flex flex-col z-50">
      <div className="flex flex-col items-center mb-16">
        <img src={logo} alt="logo" className="h-24 mx-auto" />
        <h2 className="text-[#213448] text-3xl font-[--font-Jacques-Francois]">
          Tabungin
        </h2>
      </div>
      <div className="flex flex-1 flex-col font-[--font-Jacques-Francois] text-[#213448] text-xl overflow-y-auto">
        <ul className="flex flex-col items-start justify-start space-y-6 px-2">
          <li>
            <Link to="/">
              <div className={menuItemClass("/")}>
                <Hourglass className="mr-2" />
                Berlangsung
              </div>
            </Link>
          </li>
          <li>
            <Link to="/tercapai">
              <div className={menuItemClass("/tercapai")}>
                <Star className="mr-2" />
                Tercapai
              </div>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex fixed bottom-0 font-[--font-Jacques-Francois] text-[#213448] text-xl border-t border-b p-4  bg-[#EAEFEF]">
        <SquareArrowLeft className="mr-2" />
        <button className="cursor-pointer" onClick={signOut}>
          Keluar
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
