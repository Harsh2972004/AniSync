import { useState } from "react";
import LoadingButton from "./LoadingButton";

const LoginForm = ({
  userDetails,
  handleLogin,
  handleInputChange,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleLogin}
      className="w-auto flex flex-col space-y-6 text-white"
    >
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
          className="w-[400px] h-12 p-2 rounded-lg bg-secondary border-2 border-gray-600"
        />
      </div>
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
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <LoadingButton isLoading={isLoading} text={"Login"} />
    </form>
  );
};

export default LoginForm;
