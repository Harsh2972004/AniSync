import { useContext, useState, useEffect, createContext } from "react";
import {
  getAvatar,
  getBannerImage,
  login,
  logout,
  register,
} from "../services/auth";
import { API } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userBanner, setUserBanner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/auth/status", {
          withCredentials: true,
        });
        if (res.data.isAuthenticated) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("auth status check failed:", error);
        setUser(null)
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [authChanged]);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!user || !user.avatar) return setUserAvatar(null);

      try {
        const response = await getAvatar(user.avatar);
        const avatarUrl = URL.createObjectURL(response.data);
        setUserAvatar(avatarUrl);
      } catch (error) {
        console.error("Failed to fetch avatar:", error);
      }
    };

    fetchUserAvatar();
  }, [user?.avatar]);

  useEffect(() => {
    const fetchUserBanner = async () => {
      if (!user || !user.profileBanner) return setUserBanner(null);

      try {
        const response = await getBannerImage(user.profileBanner);
        const bannerUrl = URL.createObjectURL(response.data);
        setUserBanner(bannerUrl);
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      }
    };

    fetchUserBanner();
  }, [user?.profileBanner]);

  const updateUser = async () => {
    try {
      const res = await API.get("/user/auth/status", { withCredentials: true });
      if (res.data.isAuthenticated) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const registerUser = async (formdata) => {
    try {
      const res = await register(formdata);
      if (res.data.user) {
        setUser(res.data.user);
      }
      setAuthChanged((prev) => !prev);
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
        setUser(res.data.user);
      }
      setAuthChanged((prev) => !prev);

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
      setAuthChanged((prev) => !prev);
    } catch (error) {
      console.error("logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userAvatar,
        userBanner,
        setUserAvatar,
        isLoading,
        loginUser,
        logoutUser,
        registerUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
