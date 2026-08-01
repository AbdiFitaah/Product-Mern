import User from "../Models/users.js"
import {generateToken} from '../utilities/jwtToken.js'
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
    let { name, password, email, role } = req.body;

    try {
        email = email.toLowerCase();
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User already exists" });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            role 
        });

        const token = generateToken(user._id);

        res.status(201).json({ token });

    } catch (error) {
        console.log(error);
    }
};








export const  login = async ( req ,res ,next )=>{

    let { email, password } = req.body;
    try {
        email = email.toLowerCase()
        const user = await User.findOne({ email })

        if(!user || !( await user.comparePassword(password) ))    {
           return res.status(400).json({message:" Email or Passsword is invalid"})
        }
        const token = generateToken(user._id)
        res.status(200).json( { token ,user } )


    } catch (error) {
        next(error)
    }

}