import connectDB from "./Data/database.js";
import { app } from "./app.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server Running at Port : ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
