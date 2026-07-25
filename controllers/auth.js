import User from "../Models/users.js"
import {generateToken} from '../utilities/jwtToken.js'


export const register = async ( req, res, next) => {

    let { name ,password, email, role } = req.body;

    try {

        // marka hore raadi in uu jiro qofkaan ka hor diwan gelin
        email = email.toLowerCase();
        const exists = await User.findOne({ email:email })

        if(exists) return res.status(400).json({ message:"User already exists"});

        const user = await User.create({ name, email,password,role })

        const token= generateToken(user._id)

        res.status(201).json({ token })
        
    } catch (error) {
        next(error)
    }
}








export const  login = async ( req ,res ,next )=>{

    let { email, password } = req.body;
    try {
        
        const user = await User.findOne({ email })

        if(!user || !( await user.comparePassword(password) ))    {
           return res.status(400).json({message:" Email or Passsword is invalid"})
        }

        const token = generateToken(user._id)
        res.status(200).json( { token } )


    } catch (error) {
        next(error)
    }

}