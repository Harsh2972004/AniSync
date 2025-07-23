import { useEffect, useState } from "react";
import { register, verifyEmail, resendOtp } from "../services/auth";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import OTPForm from "../components/OTPForm";
import OAuthSection from "../components/OAuthSection";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(
    localStorage.getItem("registerForm") || "form"
  ); // "form" or "otp"
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const response = await register(userDetails);
      console.log("user registered successfully", response.data);
      setSuccess(
        "Registration successful! Please check your email to verify your account."
      );
      setStep("otp"); // Move to OTP verification step
      localStorage.setItem("registerForm", "otp");
      localStorage.setItem("registerEmail", userDetails.email);
    } catch (error) {
      console.error("Error registering user:", error.response?.data);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Assuming you have an API endpoint for OTP verification
      const response = await verifyEmail({ email: userDetails.email, otp });
      console.log("OTP verified successfully", response.data);
      setSuccess("OTP verified successfully! You can now log in.");
      setStep("form"); // Reset to form step after successful verification
      navigate("/");
      localStorage.removeItem("registerForm");
      localStorage.removeItem("registerEmail");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "OTP verification failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const savedStep = localStorage.getItem("registerForm");
    const savedEmail = localStorage.getItem("registerEmail");

    if (savedStep) {
      setStep(savedStep);
    }
    if (savedEmail) {
      setUserDetails((prev) => ({ ...prev, email: savedEmail }));
    }
  }, []);

  return (
    <div className="auth-page section-spacing bg-primary pb-8 flex flex-col justify-center gap-8 rounded-md">
      <h1 className="font-bold text-center w-[400px] mx-auto text-[1.5rem] py-8 border-b-2 border-white">
        Sign up to AniSync
      </h1>
      <div className="mx-14 flex flex-col items-center justify-start gap-8">
        {step === "form" && (
          <RegisterForm
            handleInputChange={handleInputChange}
            handleRegister={handleRegister}
            userDetails={userDetails}
            isLoading={isLoading}
          />
        )}
        {step === "otp" && (
          <OTPForm
            handleOtpVerification={handleOtpVerification}
            otp={otp}
            setOtp={setOtp}
            email={userDetails.email}
            isLoading={isLoading}
          />
        )}
        <OAuthSection title={"register"} />
        <div className="flex items-center justify-center">
          <span>
            Already a user?{" "}
            <a href="/login" className="underline text-blue-400">
              Login here
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
