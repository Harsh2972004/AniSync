import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="flex justify-center items-center h-screen">Authenticating...</div>; // or your spinner component

  if (!user) {
    // redirect to login and preserve the original route
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
