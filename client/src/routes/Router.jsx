import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import Browse from "../pages/Browse";
import DetailsPage from "../pages/DetailsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<DetailsPage />} />
      </Route>
      {/* Add more routes here as needed */}
    </Routes>
  );
};

export default AppRouter;
