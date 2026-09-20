import express from "express";
import { createUser, getAllUser, login } from "../../controllers/user/user.controller.js";

const userRoute=express.Router();

userRoute.post("/create",createUser);
userRoute.post("/login",login);
userRoute.get("/getall",getAllUser);

export default userRoute;