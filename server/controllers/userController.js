import { User } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.register(name, email, password);
    res
      .status(201)
      .json({ message: "User registered successfully", name, email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
