import jwt from "jsonwebtoken";
import User from "./../Model/UserSchema.js";
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Auth token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id: id }).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export default requireAuth;
