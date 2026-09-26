import express from "express";
import { verifyToken } from "../../middlewares/user/authMiddlewares.js";
import { verifyRole } from "../../middlewares/user/roleMiddleware.js";
import { createJob } from "../../controllers/admin/job.controller.js";

const jobRouter=express.Router();

jobRouter.post("/create",verifyToken,verifyRole("admin"),createJob)

export default jobRouter;