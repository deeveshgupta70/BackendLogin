import errorHandler from "../middlewares/error.js";
import { Task } from "../model/task.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description || !req.user._id)
      return next(new errorHandler("Something Missing", 404));

    await Task.create({ title, description, userId: req.user._id });

    return res.status(200).json({
      success: true,
      message: "Task Created",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById({ _id: id });

    if (!task) return next(new errorHandler("Invalid Id or Task", 404));

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById({ _id: id });
    if (!task) return next(new errorHandler("Invalid Id or Task", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
