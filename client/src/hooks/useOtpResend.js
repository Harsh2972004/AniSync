import { resendOtp } from "../services/auth";
import { useState, useEffect } from "react";

const useResendOtp = (email, cooldown = 120) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleResendOtp = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      const response = await resendOtp(email);
      console.log("OTP resent successfully", response.data);
      setSuccess("OTP resent successfully! Please check your email.");
      setRemainingTime(cooldown);
    } catch (error) {
      console.error("Error resending OTP:", error.response?.data);
      if (error.response?.status === 429 && error.response.data.remaining) {
        setRemainingTime(error.response.data.retryAfter);
        setError(error.response.data.message);
      } else if (error.response && error.response.data) {
        setError(error.response.data || "Failed to resend OTP");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [remainingTime]);

  return {
    remainingTime,
    isLoading,
    error,
    handleResendOtp,
    success,
  };
};

export default useResendOtp;
