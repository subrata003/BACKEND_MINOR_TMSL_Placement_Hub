export const verifyRole=(role)=>{
 return (req,res,next)=>{
  if( !req.user.role===role){
   return res.status(401).json({message:"you are not authorized"})

  }
  next();

 }
}