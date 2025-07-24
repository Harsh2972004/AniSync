import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      {/* Add more routes here as needed */}
      <Route index element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
