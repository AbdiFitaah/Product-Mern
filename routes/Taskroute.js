import express from 'express'
import { deleteTask, getMytasks, register, updateTask } from '../controllers/task.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateSchema.js';
import { taskValidationSchema } from '../schemas/taskSchema.js';

const taskrouter = express.Router()

taskrouter.post("/", protect, validate(taskValidationSchema), register )
taskrouter.get("/mytask",protect, getMytasks)
taskrouter.put("/:id", protect, updateTask)
taskrouter.delete("/:id",protect, deleteTask)

export default taskrouter;