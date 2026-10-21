import userModal from "../models/user/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT= asyncHandler(async(req,_,next)=>{
    try {
        
        const token= req.header("Authorization")?.replace("Bearer ", "");

        
        
        if (!token) {
            throw new ApiError(401,"unauthorized request");
        }

        const decodedToken=jwt.verify(token,process.env.SERECT_KEY);


        const user= await userModal.findById(decodedToken.id);

        if (!user) {
             throw new ApiError(401, " unauthorized user ");
        }

        req.user=user;
        next()


    } catch (error) {
        
        throw new ApiError(401,error?.message || " Invalid Token")
    }
})