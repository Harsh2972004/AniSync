import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import OAuthSection from "../components/OAuthSection";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { requestResetPassword, resetPassword } from "../services/auth";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { loginUser } = useAuth();

  const [otp, setOtp] = useState("");
  const [resetPasswordStep, setResetPasswordStep] = useState("first");
  const [forgotPassword, setForgotPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const response = await loginUser(userDetails);
      setSuccess("Login successful!");
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      console.error("Error logging in user:", error.response.data);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    setResetPasswordStep("first");
    try {
      const response = await requestResetPassword(userDetails.email);
      setSuccess("Please check your email for the OTP to reset your password.");
      setResetPasswordStep("second");
    } catch (error) {
      console.error("Error requesting password reset:", error.response?.data);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Password reset failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const response = await resetPassword({
        email: userDetails.email,
        otp,
        newPassword: userDetails.password,
      });
      setSuccess("Password reset successfully! You can now log in.");
      setResetPasswordStep("first");
      setForgotPassword(false);
      setUserDetails({ email: "", password: "", confirmPassword: "" });
      setOtp("");
      navigate("/login"); // Redirect to login page after password reset
    } catch (error) {
      console.error("Error resetting password:", error.response?.data);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Password reset failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page section-spacing font-montserrat bg-primary flex flex-col items-center justify-center rounded-md">
      <h1 className="mx-auto text-center w-4/5 md:w-[400px] text-[1.2rem] md:text-[1.5rem] py-8 border-b-2 border-white font-bold">
        {forgotPassword ? "Reset Password" : "Login to AniSync"}
      </h1>
      <div className="flex flex-col gap-10 w-full md:mx-14 flex-1 justify-center items-center my-10">
        {forgotPassword ? (
          <ForgotPasswordForm
            otp={otp}
            setOtp={setOtp}
            userDetails={userDetails}
            handleInputChange={handleInputChange}
            isLoading={isLoading}
            handleResetPassword={handleResetPassword}
            hanldeRequestResetPassword={handleRequestResetPassword}
            resetPasswordStep={resetPasswordStep}
            backendError={error}
          />
        ) : (
          <LoginForm
            userDetails={userDetails}
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
            isLoading={isLoading}
            error={error}
          />
        )}
        {forgotPassword ? null : (
          <>
            <div>
              <a
                className="text-blue-400 cursor-pointer"
                onClick={() => {
                  setError(""), setForgotPassword(true);
                }}
              >
                Forgot Password?
              </a>
            </div>
            <OAuthSection title={"login"} />
            <div className="col-span-2 text-center mt-8">
              <span>
                Not registered?{" "}
                <a href="/register" className="underline text-blue-400">
                  Register here
                </a>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
