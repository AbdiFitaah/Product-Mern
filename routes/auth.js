import  express from 'express'
import { login, register } from "../controllers/auth.js";
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validateSchema.js';
import { createSchema } from '../schemas/userSchema.js';

const authrouter = express.Router();

authrouter.post( "/create" , validate(createSchema), register )
authrouter.post( "/login", login )

authrouter.get( "/profile", protect , ( req , res ) => {
    

    console.log(req.user.email)
    res.json( { email: req.user.email } )
    
})

export default authrouter;