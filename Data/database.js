import mongoose from "mongoose";

//----------------Connecting Database------------------//
//1.Connecting
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "BackendAPI" })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((e) => console.log(e.message));
};

export default connectDB;
