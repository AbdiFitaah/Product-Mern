import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { Logger } from "./middlewares/Logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import router from "./routes/users.js";
import authrouter from "./routes/auth.js";
import adminrouter from "./routes/admin.js";
import taskrouter from "./routes/Taskroute.js";

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(Logger);

// Routes
app.use("/users", router);
app.use("/auth", authrouter);
app.use("/admin", adminrouter);
app.use("/task", taskrouter);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;

// Check Environment Variables
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log(
  "Mongo URI:",
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_dep
);

// Connect Database
mongoose
  .connect(
     process.env.MONGODB_URI_dep
  )
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    process.exit(1);
  });