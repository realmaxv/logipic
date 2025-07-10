import { Contact2, LayoutDashboard, UserPlus } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="h-25 w-full bg-accent fixed bottom-0 rounded flex items-center justify-center pb-4">
      <nav className="flex items-center justify-evenly w-full">
        <Link to={"/employees"}>
          <Contact2 size={45} className="border p-1 rounded shadow " />
        </Link>
        <Link
          to={"/"}
          className="rounded p-1 border-2  bg-blue-100 shadow-md"
          aria-current="page"
        >
          <LayoutDashboard size={45} className="text-stone-700" />
        </Link>

        <Link to={"/add"}>
          <UserPlus size={45} className="border p-1 rounded shadow " />
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
