// import { useState } from "react";
// import { useTheme } from "./theme-provider";
import { ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router";
import icon from "@/assets/icon.png";
function Header() {
  // const { setTheme } = useTheme();
  // const [themeOn, setThemeOn] = useState(false);
  const location = useLocation();

  // const handleDarkSwitch: React.FormEventHandler<HTMLButtonElement> = () => {
  //   setThemeOn((prev) => !prev);
  //   if (themeOn === false) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };

  return (
    <header className="h-15 w-full flex items-center justify-between px-6 fixed top-0 bg-white dark:bg-stone-800 z-50 shadow-md">
      {" "}
      {location.pathname !== "/" ? (
        <Link to={"/"}>
          <ChevronLeft size={30} />
        </Link>
      ) : (
        <div></div>
      )}
      {/* <div className="flex  items-center space-x-2">
        {!themeOn && <SunIcon />}
        {themeOn && <MoonIcon />}
        <Switch onClick={handleDarkSwitch} id="dark-mode" />
      </div> */}
      <img src={icon} className="size-15 rounded-4xl" alt="LogiPic icon" />
    </header>
  );
}

export default Header;
