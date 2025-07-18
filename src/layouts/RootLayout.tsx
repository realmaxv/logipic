import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";




function RootLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full h-screen bg-white flex flex-col overflow-hidden md:w-[390px] md:h-[844px] md:rounded-[2rem] md:shadow-2xl md:border md:border-gray-300">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
