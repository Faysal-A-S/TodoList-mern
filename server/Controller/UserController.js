import User from "../Model/UserSchema.js";
import { v4 as uuid } from "uuid";
import generateToken from "../config/generateToken.js";
export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with same email already exists" });
    }
    const newUser = new User({
      _id: uuid(),
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,

      Token: generateToken(newUser._id),
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
