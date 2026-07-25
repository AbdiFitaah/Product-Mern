import jwt from 'jsonwebtoken'
import User from '../Models/users.js';


export const protect = async ( req ,res , next ) => {

    const token = req.headers.authorization?.split(" ")[1];
    
    try {
        if(!token) return res.status(401).json({ message: " No  Token Provided"})
    
            const decode = jwt.verify( token , process.env.JWT_SECRET )
            req.user = await User.findById(decode.id).select("-password")

            next();

    } catch (error) {
        res.status(401).json({ message: " Un Outherized "})
    }
    

}