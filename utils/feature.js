import jwt from "jsonwebtoken";

export const sendCookie = (res, userDetails, message, statusCode = 200) => {
  const token = jwt.sign({ _id: userDetails._id }, process.env.SECREAT_KEY);

  return res
    .status(statusCode)
    .cookie("Token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
