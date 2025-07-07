import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="pb-26 pt-26 bg-stone-200 dark:bg-accent">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
