import  express from 'express'
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const adminhrouter = express.Router();

adminhrouter.get("/dashboard",protect, authorize('admin'), (req,res) => {

    res.json({ massage:"Welcome to the Page" })
})

export default adminhrouter;