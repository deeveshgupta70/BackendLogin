import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
  path: "./config.env",
});

export const app = express();
//-------------------Using Middleware--------------//
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_TODO_URI, process.env.FRONTEND_LOGIN],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

//-----------------Using Routes-------------------//
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// -------------------API-------------------------//
app.get("/", (req, res) => {
  res.status(200).send("Working");
});

//-------------------Error Middleware---------------//

app.use(errorMiddleware);
