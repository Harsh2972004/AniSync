import API from "./api";

export const register = (data) => API.post("/user/register", data);
export const login = (data) => API.post("/user/login", data);
export const logout = () => API.get("/user/logout");
export const verifyEmail = (data) => API.post("/user/verify-email", data);
export const resendOtp = (email, purpose) =>
  API.post("/user/resend-otp", { email, purpose });
export const requestResetPassword = (email) =>
  API.post("/user/forgot-password", { email });
export const resetPassword = (data) => API.post("/user/reset-password", data);
