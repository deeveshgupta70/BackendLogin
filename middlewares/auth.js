import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import errorHandler from "./error.js";

const authentication = async (req, res, next) => {
  try {
    const { Token } = req.cookies;

    //   console.log(Token);
    if (Token) {
      try {
        const userId = jwt.verify(Token, process.env.SECREAT_KEY);
        // console.log(userId);
        const user = await User.findById({ _id: userId._id });
        if (user) req.user = user;
        return next();
      } catch (err) {
        console.log(err.message);
      }
    }

    return next(new errorHandler("Login First", 400));
  } catch (error) {
    next(error);
  }
};

export default authentication;
