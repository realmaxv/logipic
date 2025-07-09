import {
  CalendarDays,
  Contact2,
  LayoutDashboard,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="h-25 w-full bg-accent fixed bottom-0 rounded flex items-center justify-center pb-4">
      <nav className="flex items-center justify-evenly w-full">
        <Link to={"/employees"}>
          <Contact2 size={45} className="border p-1 rounded shadow " />
        </Link>
        <Link to={"/"}>
          <LayoutDashboard size={45} className="border p-1 rounded shadow " />
        </Link>

        <Link to={"/add"}>
          <UserPlus size={45} className="border p-1 rounded shadow " />
        </Link>
        <Link to={"/weekdays"}>
          <CalendarDays size={45} className="border p-1 rounded shadow " />
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
