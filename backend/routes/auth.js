import express from 'express';
import { login, register } from "../controllers/auth.js";
import { protect } from '../middlewares/auth.js';

const authrouter = express.Router();

authrouter.post( "/create", register )
authrouter.post( "/login", login )

authrouter.get( "/profile", protect , async ( req , res ) => {
    res.json( req.user )
    
})

export default authrouter;