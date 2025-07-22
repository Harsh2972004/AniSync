import API from "./api";

export const register = (data) => API.post("/user/register", data);
export const login = (data) => API.post("/user/login", data);
export const logout = () => API.get("/user/logout");
export const verifyEmail = (data) => API.post("/user/verify-email", data);
export const resendOtp = (email) =>
  API.post("/user/resend-verification", { email });
