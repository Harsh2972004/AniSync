import LoadingButton from "./LoadingButton";
import { useState } from "react";
import OtpResendButton from "./OtpResendButton";
import useResendOtp from "../hooks/useOtpResend";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ForgotPasswordForm = ({
  setOtp,
  otp,
  userDetails,
  handleInputChange,
  isLoading,
  handleResetPassword,
  hanldeRequestResetPassword,
  resetPasswordStep,
  backendError,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { remainingTime, handleResendOtp, error, succes } = useResendOtp(
    userDetails.email,
    "reset",
    120
  );

  return (
    <>
      <form
        onSubmit={
          resetPasswordStep === "first"
            ? hanldeRequestResetPassword
            : handleResetPassword
        }
        className="w-4/5 md:w-auto flex flex-col space-y-6 text-white"
      >
        {resetPasswordStep === "second" ? (
          <h3 className="w-[400px]">
            Reset password for:{" "}
            <span className="font-semibold text-blue-500">
              {userDetails.email}
            </span>{" "}
          </h3>
        ) : null}
        {resetPasswordStep === "first" ? (
          <>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                value={userDetails.email}
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full md:w-[400px] h-12 p-2 rounded-lg bg-secondary border-2 border-gray-600"
              />
              {backendError?.general && (
                <p className="text-red-500 text-sm font-semibold -mt-2">
                  {backendError.general}
                </p>)}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password">password</label>
              <div className="relative w-[400px]">
                <input
                  onChange={handleInputChange}
                  value={userDetails.password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-[400px] h-12 p-2 rounded-lg bg-secondary border-2 border-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/4 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={22} />
                  ) : (
                    <FaRegEye size={22} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative w-[400px]">
                <input
                  onChange={handleInputChange}
                  value={userDetails.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  className="w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/4 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <FaRegEyeSlash size={22} />
                  ) : (
                    <FaRegEye size={22} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="otp">Enter OTP</label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                type="text"
                id="otp"
                name="otp"
                autoComplete="otp"
                placeholder="Enter your OTP"
                className="w-[400px] h-12 p-2 rounded-lg bg-secondary border-2 border-gray-600"
              />
            </div>
          </>
        )}
        {backendError?.general && (
          <p className="text-red-500 text-sm font-semibold -mt-2">
            {backendError.general}
          </p>
        )}
        <LoadingButton
          isLoading={isLoading}
          text={resetPasswordStep === "first" ? "Enter" : "Reset Password"}
        />
      </form>
      {resetPasswordStep === "second" && (
        <OtpResendButton
          remainingTime={remainingTime}
          handleResendOtp={handleResendOtp}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
