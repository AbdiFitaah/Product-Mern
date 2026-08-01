import express from 'express'
import { getUsers, createUser, getUserInfo, deleteUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/getInfo/:id",getUserInfo)
router.delete("/delete/:id",deleteUser)
router.put("/update/:id",updateUser)

export default router;