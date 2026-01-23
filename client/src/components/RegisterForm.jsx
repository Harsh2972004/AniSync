import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const RegisterForm = ({
  handleRegister,
  userDetails,
  handleInputChange,
  isLoading,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form
      onSubmit={handleRegister}
      className="w-full md:w-auto flex flex-col space-y-6 text-white"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="name">Username</label>
        <input
          onChange={handleInputChange}
          value={userDetails.name}
          type="text"
          placeholder="Username"
          name="name"
          id="name"
          autoComplete="username"
          className="w-full md:w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
        />
        {error.name && (
          <p className="text-red-500 text-sm font-semibold">{error.name}</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleInputChange}
          value={userDetails.email}
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          autoComplete="email"
          className="w-full md:w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
        />
        {error.email && (
          <p className="text-red-500 text-sm font-semibold">{error.email}</p>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <div className="relative w-full md:w-[400px]">
          <input
            onChange={handleInputChange}
            value={userDetails.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            autoComplete="new-password"
            className="w-full md:w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
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
        {error.password && (
          <p className="text-red-500 text-sm font-semibold">{error.password}</p>
        )}
      </div>
      {userDetails.password ? (
        <div className="flex flex-col space-y-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative w-full md:w-[400px]">
            <input
              onChange={handleInputChange}
              value={userDetails.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              className="w-full md:w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
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
          {error.confirmPassword && (
            <p className="text-red-500 text-sm font-semibold">
              {error.confirmPassword}
            </p>
          )}
        </div>
      ) : null}
      <LoadingButton isLoading={isLoading} text={"Sign-up"} />
    </form>
  );
};

export default RegisterForm;
