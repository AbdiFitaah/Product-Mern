import express from "express";
import { getAllCategories } from "../controllers/categoryController.js";

const categoryrouter = express.Router();

categoryrouter.get("/", getAllCategories);

export default categoryrouter;