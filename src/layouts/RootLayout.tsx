import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="pb-26 pt-21">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
