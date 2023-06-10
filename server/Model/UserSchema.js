import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const User = mongoose.model("user", userSchema);
export default User;
