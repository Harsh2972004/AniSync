import { useState } from "react";
import { register, verifyEmail } from "../services/auth";
import { redirect } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import OTPForm from "../components/OTPForm";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState("form"); // "form" or "otp"
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    // if (userDetails.password !== userDetails.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }
    try {
      const response = await register(userDetails);
      console.log("user registered successfully", response.data);
      setSuccess(
        "Registration successful! Please check your email to verify your account."
      );
      setStep("otp"); // Move to OTP verification step
    } catch (error) {
      console.error("Error registering user:", error.response?.data);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Registration failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
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
      redirect("/");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "OTP verification failed");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container-spacing bg-primary ">
      <h1 className=" section-spacing text-center text-[1.5rem] pt-4">
        Sign up to AniSync
      </h1>
      <div className="flex items-center justify-between h-[70vh]">
        {step === "form" ? (
          <RegisterForm
            handleInputChange={handleInputChange}
            handleRegister={handleRegister}
            userDetails={userDetails}
          />
        ) : (
          <OTPForm
            handleOtpVerification={handleOtpVerification}
            otp={otp}
            setOtp={setOtp}
            email={userDetails.email}
          />
        )}

        <div className="">hmmm</div>
      </div>
    </div>
  );
};

export default Register;
