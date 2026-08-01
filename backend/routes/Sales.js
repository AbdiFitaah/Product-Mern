import express from "express";
const salesRouter = express.Router();
import { createSale, getMySales, getAllSales } from "../controllers/saleController.js";
import { protect } from '../middlewares/auth.js';


salesRouter.post("/", protect, createSale);
salesRouter.get("/mysales", protect, getMySales);

salesRouter.get("/allsales", protect, getAllSales);

export default salesRouter;