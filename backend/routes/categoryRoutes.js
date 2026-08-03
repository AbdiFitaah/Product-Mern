import express from "express";
import { getAllCategories, myCategory } from "../controllers/categoryController.js";

const categoryrouter = express.Router();

categoryrouter.get("/", getAllCategories);

export default categoryrouter;