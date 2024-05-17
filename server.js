import express from "express";
import mongoose, { mongo } from "mongoose";
// import { configDotenv } from "dotenv";

const app = express();

//----------------Connecting Database------------------//
//1.Connecting
mongoose
  .connect("mongodb://localhost:27017", { dbName: "BackendAPI" })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => console.log(e.message));

// 2.Creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//3.Creating the Modal
const User = mongoose.model("User", userSchema);

//-------------------Using Middleware--------------//
app.use(express.json());
// app.use(express.cookieP)

// -------------------API-------------------------//
app.get("/", (req, res) => {
  res.status(200).send("Working");
});

app.get("/users/all", async (req, res) => {
  const users = await User.find({});
  res.json({ status: "success", users });
});

app.get("/users/createquery", async (req, res) => {
  const { name, email, password } = req.query;

  if (!name || !email || !password)
    return res
      .status(401)
      .json({ sucess: false, message: "Something Missing" });

  const userInfo = await User.create({ name, email, password });

  return res
    .status(200)
    .json({ sucess: true, message: "Congratulation User Saved" });
});

app.get("/userId/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const userInfo = await User.findById({ _id: id });

  return res.status(200).json({ sucess: true, userInfo });
});

app.post("/users/create", async (req, res) => {
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
});

app.listen(4000, () => {
  console.log(`Server Running`);
});
