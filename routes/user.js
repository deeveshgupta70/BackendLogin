import express from "express";
import {
  createUser,
  createUserQuery,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../controller/user.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.get("/createquery", createUserQuery);

//If multiple endpoint have same routes then
router
  .route("/userId/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

// router.get("/userId/:id", getUserById);
// router.put("/userId/:id", updateUserById);
// router.delete("/userId/:id", deleteUserById);

router.post("/create", createUser);

export default router;
