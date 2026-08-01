
import User from "../Models/users.js"
import { generateToken } from "../utilities/jwtToken.js";

export const getUsers = async (req ,res)=>{
    const alluser = await User.find();
    res.json(alluser);
}

export const createUser = async (req,res) =>{
    const savedUser = await User.create(req.body);
    res.json(savedUser)
}

export const getUserInfo = async (req,res)=>{

    const { id } = req.params;
    const saved = await User.findById(id).select("-password")
    if(!saved) return res.send("No data Found");
    res.json(saved)
}

export const deleteUser = async (req,res)=>{

    const { id } = req.params.id
    await User.deleteOne(id)
    res.send(" Waa delete Gareeyay")
}

export const updateUser = async (req,res)=>{

    const { id } = req.params;

    const updated = await User.findByIdAndUpdate(id,req.body,{ new: true})

    res.json(updated)

}




