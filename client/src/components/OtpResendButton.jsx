const OtpResendButton = ({ handleResendOtp, remainingTime }) => {
  return (
    <p className="text-sm text-gray-400">
      Didn't receive the OTP?{" "}
      <button
        type="button"
        onClick={handleResendOtp}
        disabled={remainingTime > 0}
        className="text-blue-400 underline disabled:cursor-not-allowed"
      >
        {remainingTime > 0 ? `Resend in ${remainingTime}` : "Resend OTP"}
      </button>
    </p>
  );
};

export default OtpResendButton;
