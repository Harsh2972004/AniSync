import LoadingButton from "./LoadingButton";
import OtpResendButton from "./OtpResendButton";
import useResendOtp from "../hooks/useOtpResend";

const OTPForm = ({
  email,
  handleOtpVerification,
  otp,
  setOtp,
  isLoading,
  otpError,
}) => {
  const { remainingTime, error, handleResendOtp, success } = useResendOtp(
    email,
    "verify",
    120
  );

  return (
    <form
      onSubmit={handleOtpVerification}
      className="w-full md:w-auto flex flex-col space-y-6 text-white"
    >
      <h3 className="md:w-[400px]">
        An OTP has been sent to your email:{" "}
        <span className="font-semibold text-blue-500">{email}</span>
      </h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="otp">Enter OTP</label>
        <input
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          type="text"
          placeholder="OTP"
          id="otp"
          name="otp"
          className="w-full md:w-[400px] h-12 p-2 rounded-md bg-secondary"
        />
        {otpError?.error && (
          <p className="text-red-500 text-sm font-semibold -mt-2">{otpError?.error}</p>
        )}
      </div>
      <LoadingButton isLoading={isLoading} text={"Verify OTP"} />
      <OtpResendButton
        handleResendOtp={handleResendOtp}
        remainingTime={remainingTime}
      />
    </form>
  );
};

export default OTPForm;
