import Navbar from "../components/Navbar";
import { Outlet, useLocation, useParams } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const { id } = useParams();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar home={isHome} details={id} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
