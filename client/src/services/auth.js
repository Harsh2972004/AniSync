import { API } from "./api";

export const register = (data) =>
  API.post("/user/register", data, { withCredentials: true });

export const login = (data) =>
  API.post("/user/login", data, { withCredentials: true });

export const logout = () => API.post("/user/logout", { withCredentials: true });

export const verifyEmail = (data) => API.post("/user/verify-email", data);

export const resendOtp = (email, purpose) =>
  API.post("/user/resend-otp", { email, purpose });

export const requestResetPassword = (email) =>
  API.post("/user/forgot-password", { email, purpose: "verify" });

export const resetPassword = (data) => API.post("/user/reset-password", data);

export const updateName = (name) => API.put("/user/update-username", { name });

export const updatePassword = (newPassword, confirmPassword) =>
  API.put("/user/update-password", { newPassword, confirmPassword });

export const uploadAvatar = (file) => API.post("/user/profile-avatar", file);

export const uploadBanner = (file) => API.post("user/banner-image", file);

