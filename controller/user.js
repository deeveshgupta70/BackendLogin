import { User } from "../model/user.js";

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

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(401)
      .json({ sucess: false, message: "Something Missing" });

  const userInfo = await User.create({ name, email, password });

  return res
    .status(200)
    .cookie("Token", Date.now())
    .json({ sucess: true, message: "Congratulation User Saved" });
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  //   const userInfo = await User.findById({ _id: id });
  const userInfo = await User.findById(id);

  return res.status(200).json({ sucess: true, userInfo });
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;

  const userInfo = await User.findById({ _id: id });

  return res.status(200).json({ sucess: true, message: "Updated" });
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  const userInfo = await User.findById({ _id: id });

  return res.status(200).json({ sucess: true, message: "Deleted" });
};
