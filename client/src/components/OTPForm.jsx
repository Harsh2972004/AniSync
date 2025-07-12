const OTPForm = ({ email, handleOtpVerification, otp, setOtp }) => {
  return (
    <form
      onSubmit={handleOtpVerification}
      className="flex flex-col space-y-6 text-white"
    >
      <h3>
        An OTP has been sent to your email:{" "}
        <span className="font-semibold">{email}</span>
      </h3>
      <div className="flex flex-col space-y-2">
        <label name="otp">Enter OTP</label>
        <input
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          type="text"
          placeholder="OTP"
          name="otp"
          className="w-[400px] h-12 p-2 rounded-md bg-secondary"
        />
      </div>
      <button
        type="submit"
        className="bg-btn_pink text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-btn_pink transition-colors"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OTPForm;
