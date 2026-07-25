
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
    name:String,
    email:{ type: String,unique:true},
    password: String,
    role:{
        type:String,
        enum:['user','admin'], // waa inuu labadaan midkood uu noqdaa value giisa
        default:'user'   // marka user cusub la sameyo automaticaly waa user
    }
})
//pre waa fucntion ah in uu shaqo qabto ka hor howsha aa u direysid sida save, update all

userSchema.pre( "save" , async function()  {

    // hadaan passwordka lasoo badalin ka soco ha badalin oo hash haka sii dhigin
    
    if( !this.isModified("password") )return ;

    // waa inta jeer ee la badali dono password si uu u noqdo secure
    const salt = await bcrypt.genSalt(10);
    //hashing password
    this.password = bcrypt.hash( this.password , salt)
})

userSchema.methods.comparePassword = function (inputPassword) {

    return bcrypt.compare(inputPassword,this.password);
}


const user  = mongoose.model("User" , userSchema);
export default user;
