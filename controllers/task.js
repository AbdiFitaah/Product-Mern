import Tasks from "../Models/Tasks.js";

export const register = async (req,res,next)=>{

   try {
        const save = await Tasks.create({ ...req.body, createdBy:req.user._id })
        res.status(201).json({save})
    
   } catch (error) {
        next(error)
   }
}

export const getMytasks= async (req,res,next)=>{

    try {
        const data = await Tasks.find({createdBy:req.user._id});
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const updateTask= async (req,res,next)=>{

    try {
        
        const task= await Tasks.findOneAndUpdate(
            { _id: req.params.id , createdBy:req.user._id },
            req.body,
            { new:true }
        )
        if(!task) return res.status(404).json({ massage:"No task Found"})
        res.json(task)

    } catch (error) {
        next(error)
    }
}

export const deleteTask=async (req,res,next)=>{

    try {
        
        const task =await Tasks.findOneAndDelete(
            { _id:req.params.id, createdBy:req.user._id }
        )
        if(!task) return res.status(401).json({ massage:"No task Found"})
            res.json({massage:"Secsefully Deleted"})
    } catch (error) {
        next(error)
    }


}