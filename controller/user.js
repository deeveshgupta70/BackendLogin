import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import errorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({ status: "success", users });
};

export const createUserQuery = async (req, res) => {
  const { name, email, password } = req.query;

  if (!name || !email || !password)
    return res
      .status(401)
      .json({ sucess: false, message: "Something Missing" });

  const userInfo = await User.create({ name, email, password });

  return res
    .status(200)
    .json({ sucess: true, message: "Congratulation User Saved" });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return next(new errorHandler("Something Missing!", 400));
    const oldUser = await User.findOne({ email });
    if (oldUser) return next(new errorHandler("User Already Exist!", 406));
    const hashPassword = await bcrypt.hash(password, 10);

    const userDetails = await User.create({
      name,
      email,
      password: hashPassword,
    });

    sendCookie(res, userDetails, "Congratulations!! User Registered", 200);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new errorHandler("Something Missing", 406));

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Invalid Email Or Password", 406));

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) sendCookie(res, user, `Welcome Back, ${user.name}`, 201);
    else return next(new errorHandler("Invalid Email Or Password", 406));
  } catch (error) {
    next(error);
  }
};

export const getMyDetails = async (req, res, next) => {
  try {
    return res.status(202).json({
      success: true,
      message: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    return res
      .status(200)
      .cookie("Token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "Logout",
      });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res) => {};

export const updateUserById = async (req, res) => {};
