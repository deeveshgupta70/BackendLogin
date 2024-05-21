import express from "express";
import {
  register,
  createUserQuery,
  getAllUsers,
  getUserById,
  updateUserById,
  login,
  getMyDetails,
  logout,
} from "../controller/user.js";
import authentication from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.get("/createquery", createUserQuery);

//If multiple endpoint have same routes then
router.route("/userId/:id").get(getUserById).put(updateUserById);

// router.get("/userId/:id", getUserById);
// router.put("/userId/:id", updateUserById);
// router.delete("/userId/:id", deleteUserById);

router.post("/create", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", authentication, getMyDetails);

export default router;
