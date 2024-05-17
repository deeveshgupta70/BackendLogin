import mongoose from "mongoose";

// Creating Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//Creating the Modal
export const User = mongoose.model("User", userSchema);
