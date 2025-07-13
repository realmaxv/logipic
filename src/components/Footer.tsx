import { CalendarDays, Contact2, UserPlus } from "lucide-react";
import icon from "@/assets/icon.png";

import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="h-25 w-full bg-accent fixed bottom-0 rounded flex items-center justify-center pb-4">
      <nav className="flex items-center justify-evenly w-full">
        <NavLink
          to={"/"}
          className="rounded p-1 border-2  shadow-md"
          aria-current="page"
        >
          <img src={icon} className="size-9 rounded-4xl" alt="LogiPic icon" />
        </NavLink>
        <NavLink to={"/employees"}>
          <Contact2 size={45} className="border p-1 rounded shadow " />
        </NavLink>

        <NavLink to={"/add"}>
          <UserPlus size={45} className="border p-1 rounded shadow " />
        </NavLink>
        <NavLink to={"/weekdays"}>
          <CalendarDays size={45} className="border p-1 rounded shadow " />
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
