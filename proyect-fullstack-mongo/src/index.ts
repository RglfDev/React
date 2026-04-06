import mongoose from "mongoose";
import app from "./app";

const PORT = 4000;

mongoose.connect("mongodb://127.0.0.1:27017/react_express_db")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

