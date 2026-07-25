export const Logger = ( req,res,next ) =>{

    console.log(`${new Date().toISOString()} `);

    //call next maxaa yeelay marka shaqadaan la dhameeyo gudbi

    next()
}