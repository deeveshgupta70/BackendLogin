import mongoose from "mongoose";

//----------------Connecting Database------------------//
//1.Connecting
const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", { dbName: "BackendAPI" })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((e) => console.log(e.message));
};

export default connectDB;
