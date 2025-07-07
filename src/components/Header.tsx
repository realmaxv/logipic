import { useState } from "react";
import { useTheme } from "./theme-provider";
import { Switch } from "./ui/switch";
import { ChevronLeft, MoonIcon, SunIcon } from "lucide-react";
import { Link, useLocation } from "react-router";

function Header() {
  const { setTheme } = useTheme();
  const [themeOn, setThemeOn] = useState(false);
  const location = useLocation();

  const handleDarkSwitch: React.FormEventHandler<HTMLButtonElement> = () => {
    setThemeOn((prev) => !prev);
    if (themeOn === false) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <header className="h-25 w-full flex items-center justify-between px-6 fixed top-0 bg-white dark:bg-stone-800 z-50 shadow-md">
      {" "}
      {location.pathname === "/employees" ? (
        <Link to={"/"}>
          <ChevronLeft size={30} />
        </Link>
      ) : (
        <div></div>
      )}
      <div className="flex  items-center space-x-2">
        {!themeOn && <SunIcon />}
        {themeOn && <MoonIcon />}
        <Switch onClick={handleDarkSwitch} id="dark-mode" />
      </div>
    </header>
  );
}

export default Header;
