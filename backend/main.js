import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // 👈 Sidaan uga muhiimsan
import { fileURLToPath } from "url"; // 👈 Sidaan uga muhiimsan

import { Logger } from "./middlewares/Logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import router from "./routes/users.js";
import authrouter from "./routes/auth.js";
import adminrouter from "./routes/admin.js";
import productRoute from "./routes/ProductRoute.js";
import salerouter from "./routes/Sales.js";
import categoryrouter from "./routes/categoryRoutes.js";

// Load Environment Variables
dotenv.config();

const app = express();

// Path Setup ee ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(Logger);

// CORS configuration
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? process.env.CLIENT_URL
      : ["http://localhost:5173", "https://product-mern-zc8c.onrender.com/api"],
  })
);

// API Routes
app.use("/api/users", router);
app.use("/api/auth", authrouter);
app.use("/api/admin", adminrouter);
app.use("/api/product", productRoute);
app.use("/api/sales", salerouter);
app.use("/api/category", categoryrouter);

// Production Static Files Setup
if (process.env.NODE_ENV === "production") {
  // Waxaa loo adeegeyaa frontend Build-ka
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Catch-all route oo lagu soo celinayo React/Vite index.html
  app.get(/.*/, (req, res) => {
    // 👈 Halkan waxaa loo beddelay res.sendFile
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); 
  });
}

// Global Error Handlers (Waa inay ka dambeeyaan Routes-ka)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect Database & Start Server
mongoose
  .connect(
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI
      : process.env.MONGODB_URI_dep
  )
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });