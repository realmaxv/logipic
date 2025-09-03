import { CalendarDays, Contact2, UserPlus } from "lucide-react";
import icon from "@/assets/icon.png";

import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="h-20 w-full bg-white border-t border-gray-200 flex items-center justify-center">
      <nav className="flex items-center justify-evenly w-full px-4">
        <NavLink to="/" className="rounded-full p-1" aria-current="page">
          <img src={icon} className="size-8 rounded-full" alt="LogiPic icon" />
        </NavLink>
        <NavLink to="/employees">
          <Contact2 size={32} className="text-gray-600" />
        </NavLink>
        <NavLink to="/add">
          <UserPlus size={32} className="text-gray-600" />
        </NavLink>
        <NavLink to="/weekdays">
          <CalendarDays size={32} className="text-gray-600" />
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
