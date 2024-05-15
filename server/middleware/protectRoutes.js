import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ error: `unauthorized access || token doesn't exist` });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ error: `unauthorized - invalid token` });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(401).json({ error: `user not found` });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `Internal service error || ${error}` });
  }
};

export default protectRoute;
