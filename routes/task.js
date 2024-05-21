import express from "express";
import {
  createTask,
  deleteTask,
  getUserTasks,
  updateTask,
} from "../controller/task.js";
import authentication from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", authentication, createTask);

router.get("/all", authentication, getUserTasks);

router
  .route("/:id")
  .put(authentication, updateTask)
  .delete(authentication, deleteTask);

export default router;
