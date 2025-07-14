import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import icon from "../assets/icon.png";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 bg-white border-b border-gray-200">
      {location.pathname !== "/" ? (
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600"
          aria-label="Zurück"
        >
          <ChevronLeft size={28} />
        </button>
      ) : (
        <div className="w-7" />
      )}
      <img src={icon} className="w-10 h-10 rounded-full" alt="LogiPic icon" />
      <div className="w-7" />
    </header>
  );
}

export default Header;
