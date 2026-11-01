import express from "express";
import { verifyToken } from "../../middlewares/user/authMiddlewares.js";
import { verifyRole } from "../../middlewares/user/roleMiddleware.js";

import { createJob, deleteJob, jobDetails, updateJob } from "../../controllers/admin/job.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { deleteProfile } from "../../controllers/student/student.controller.js";


const jobRouter=express.Router();

jobRouter.post("/create",verifyToken,verifyRole("admin"),createJob)

jobRouter.put("/update/:id",verifyToken,verifyRole("admin"),updateJob)
jobRouter.delete("/delete/:id",verifyToken,verifyRole("admin"),deleteJob)
jobRouter.get("/getjobdetails/:id",jobDetails) // subrata 
// jobRouter.get("/getalljobs",getAlljob)

// jobRouter.get("/getjobdetail/:jobId",getJobById)


jobRouter.route("/deleteprofile/:studentId").delete(verifyJWT,verifyRole("admin") ,deleteProfile)







export default jobRouter;