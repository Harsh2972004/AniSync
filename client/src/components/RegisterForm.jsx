const RegisterForm = ({ handleRegister, userDetails, handleInputChange }) => {
  return (
    <form
      onSubmit={handleRegister}
      className=" flex flex-col space-y-6 text-white"
    >
      <div className="flex flex-col space-y-2">
        <label name="name">Name</label>
        <input
          onChange={handleInputChange}
          value={userDetails.name}
          type="text"
          placeholder="Username"
          name="name"
          className="w-[400px] h-12 p-2 rounded-md bg-secondary"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label name="email">Email</label>
        <input
          onChange={handleInputChange}
          value={userDetails.email}
          type="email"
          placeholder="Email"
          name="email"
          className="w-[400px] h-12 p-2 rounded-md bg-secondary"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label name="password">Password</label>
        <input
          onChange={handleInputChange}
          value={userDetails.password}
          type="password"
          placeholder="Password"
          name="password"
          className="w-[400px] h-12 p-2 rounded-md bg-secondary"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label name="confirmPassword">Confirm Password</label>
        <input
          onChange={handleInputChange}
          value={userDetails.confirmPassword}
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="w-[400px] h-12 p-2 rounded-md bg-secondary"
        />
      </div>
      <button
        type="submit"
        className="bg-btn_pink text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-btn_pink transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
