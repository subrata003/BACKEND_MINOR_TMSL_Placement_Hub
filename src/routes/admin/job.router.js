import express from "express";
import { verifyToken } from "../../middlewares/user/authMiddlewares.js";
import { verifyRole } from "../../middlewares/user/roleMiddleware.js";

import { createJob, deleteJob, getAlljob, jobDetails, updateJob } from "../../controllers/admin/job.controller.js";


const jobRouter=express.Router();

jobRouter.post("/create",verifyToken,verifyRole("admin"),createJob)

jobRouter.put("/update/:id",verifyToken,verifyRole("admin"),updateJob)
jobRouter.delete("/delete/:id",verifyToken,verifyRole("admin"),deleteJob)
jobRouter.get("/getjobdetails/:id",jobDetails)
jobRouter.get("/getalljobs",getAlljob)





export default jobRouter;