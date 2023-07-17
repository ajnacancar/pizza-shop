import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";

function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:w-1/6 w-full px-7 py-10 bg-zinc-100 lg:h-screen">
      <div className="flex justify-between items-center">
        <Link to={"/admin"} className="flex items-center space-x-3">
          <GiKnifeFork size={40} color="black" />

          <h1 className="text-black font-bold font-Lobster-Two text-5xl italic">
            Pizza
          </h1>
        </Link>

        <AiOutlineMenu
          onClick={() => setOpen(!open)}
          className="text-black cursor-pointer flex lg:hidden"
          size={40}
        />
      </div>

      <div className="hidden lg:block mt-10">
        <SidebarLinks />
      </div>

      {open && (
        <div className="block mt-10 lg:hidden">
          <SidebarLinks />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
