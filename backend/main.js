import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
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

// Middleware
app.use(express.json());
app.use(Logger);
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// Routes
app.use("/api/users", router);
app.use("/api/auth", authrouter);
app.use("/api/admin", adminrouter);
app.use("/api/product", productRoute);
app.use("/api/sales", salerouter);
app.use("/api/category", categoryrouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === "production") {

  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get(/.*/, (req, res) => {
      res.send(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  })
}




mongoose
  .connect(
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_URI
      : process.env.MONGODB_URI_dep
  )
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(` Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB Connection Failed");
    process.exit(1);
  });