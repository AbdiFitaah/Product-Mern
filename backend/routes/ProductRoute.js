import express from 'express'
import { deleteProduct, getProduct, createProduct, updateProduct } from '../controllers/Product.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateSchema.js';
import { taskValidationSchema } from '../schemas/taskSchema.js';

const productRoute = express.Router()

productRoute.post("/", protect, createProduct)
productRoute.get("/", protect, getProduct)
productRoute.put("/:id", protect, updateProduct)
productRoute.delete("/:id",protect, deleteProduct)

export default productRoute;