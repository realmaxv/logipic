import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import icon from "../assets/icon.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 React Router Hook

  return (
    <header className="h-15 w-full flex items-center justify-between px-6 fixed top-0 bg-white dark:bg-stone-800 z-50 shadow-md">
      {location.pathname !== "/" ? (
        <button onClick={() => navigate(-1)}>
          <ChevronLeft size={30} />
        </button>
      ) : (
        <div></div>
      )}
      <img src={icon} className="size-15 rounded-4xl" alt="LogiPic icon" />
    </header>
  );
}

export default Header;
