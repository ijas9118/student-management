import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes";

dotenv.config();
const cors = require("cors");

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/students", studentRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/student-management")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
