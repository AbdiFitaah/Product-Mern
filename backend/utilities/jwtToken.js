import jwt from 'jsonwebtoken'


export const generateToken = (userId) => {
    return jwt.sign( { id: userId },process.env.JWT_SECRET,{ expiresIn:"1d"})
}

// 1. jwtweptoken import gareysanay
// jwt.sign ayan wacnay  waxu qadanaa 3 shey 
/// 1.  payload oo ah xogta uu sii xambarayo, 2. xogta number sireedka lagu badalaayo, 3 iyo waqtiga uu dhacaayo 




const newTest =(userId)=>{

    return jwt.sign({id:userId},process.env.JWT_SECRET,{ expiresIn:"7d" })

}