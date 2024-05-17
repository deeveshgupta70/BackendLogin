import express from "express";
import connectDB from "./Data/database.js";
import userRouter from "./routes/user.js";
import { config } from "dotenv";

config({
  path: "./config.env",
});

const app = express();

connectDB();

//-------------------Using Middleware--------------//
app.use(express.json());
app.use("/users", userRouter);

// -------------------API-------------------------//
app.get("/", (req, res) => {
  res.status(200).send("Working");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Running ${process.env.PORT}`);
});
