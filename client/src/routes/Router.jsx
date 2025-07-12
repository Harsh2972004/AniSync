import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Route>
      {/* Add more routes here as needed */}
    </Routes>
  );
};

export default AppRouter;
