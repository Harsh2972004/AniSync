import { useState } from "react";

const RegisterForm = ({ handleRegister, userDetails, handleInputChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form
      onSubmit={handleRegister}
      className="w-auto flex flex-col space-y-6 text-white"
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
          className="w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
        />
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
          className="w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <div className="relative w-[400px]">
          <input
            onChange={handleInputChange}
            value={userDetails.password}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            autoComplete="new-password"
            className="w-[400px] h-12 p-2 rounded-lg border-2 border-gray-600 bg-secondary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/4 text-gray-400 hover:text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <p className="text-sm text-gray-400 w-[400px]">
          {userDetails.password
            ? `* The password must be at least 8 characters long and it should
          contain 1 UpperCase, 1 lowerCase, 1 number and 1 symbol`
            : ""}
        </p>
      </div>
      {userDetails.password ? (
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
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      ) : null}
      <button
        type="submit"
        className="w-full font-semibold bg-btn_pink text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-btn_pink transition-colors mx-auto"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
