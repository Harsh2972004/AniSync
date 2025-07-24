import Navbar from "../components/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar home={isHome} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
