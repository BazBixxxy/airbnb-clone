import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utilities/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: `user email already exists` });
    }

    // encrypting passwords by hashing it using brcypt js
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    if (newUser) {
      // generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    }
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: `invalid email or password` });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      id: user._id,
      name: user.name,
    });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `logout successful` });
  } catch (error) {
    res.status(400).json({ logoutError: `${error}` });
  }
};
