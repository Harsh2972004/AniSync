import { useContext, useState, useEffect, createContext } from "react";
import { login, logout, register } from "../services/auth";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/auth/status", {
          withCredentials: true,
        });
        if (res.data.isAuthenticated) {
          console.log(res.data.isAuthenticated);
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("auth status check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [authChanged]);

  const registerUser = async (formdata) => {
    try {
      const res = await register(formdata);
      if (res.data.user) {
        setUser(res.data.user);
      }
      setAuthChanged([(prev) => !prev]);
      return res;
    } catch (error) {
      console.error("error registering user:", error);
      throw error;
    }
  };

  const loginUser = async (formData) => {
    try {
      const res = await login(formData);
      if (res.data.user) {
        console.log("set user", res.data.user);
        setUser(res.data.user);
      }
      setAuthChanged([(prev) => !prev]);

      return res;
    } catch (error) {
      console.error("login failed:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setAuthChanged([(prev) => !prev]);
    } catch (error) {
      console.error("logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, loginUser, logoutUser, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
