import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import OAuthSection from "../components/OAuthSection";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    try {
      const response = await login(userDetails);
      console.log("User logged in successfully", response.data);
      setSuccess("Login successful!");
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      console.error("Error logging in user:", error.response?.data);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="auth-page section-spacing font-montserrat bg-primary flex flex-col items-center justify-center rounded-md">
      <h1 className="mx-auto text-center w-[400px] text-[1.5rem] py-8 border-b-2 border-white font-bold">
        Login to AniSync
      </h1>
      <div className="flex flex-col gap-10 mx-14 flex-1 justify-center items-center my-10">
        <LoginForm
          userDetails={userDetails}
          handleInputChange={handleInputChange}
          handleLogin={handleLogin}
        />
        <OAuthSection title={"login"} />
        <div className="col-span-2 text-center mt-8">
          <span>
            Not registered?{" "}
            <a href="/register" className="underline text-blue-400">
              Register here
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
