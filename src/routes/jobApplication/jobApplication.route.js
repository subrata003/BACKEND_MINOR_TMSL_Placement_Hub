import { Router } from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { applyForJob, getAlljob, getApplicationResult, getDriveDetails, getInterviewDetails, getJobById, getMyApplication, getMyPlacements } from "../../controllers/jobApplication/jobApplication.controller.js";


const router=Router();

router.route("/apply/:jobId").post(verifyJWT,applyForJob)

router.route("/getalljobs").get(getAlljob)

router.route("/getjobdetail/:jobId").get(getJobById)
router.route("/my-applications").get(verifyJWT,getMyApplication)
router.route("/drive/:applicationId").get(verifyJWT,getDriveDetails)
router.route("/interviews/:applicationId").get(verifyJWT,getInterviewDetails)
router.route("/result/:applicationId").get(verifyJWT,getApplicationResult)
router.route("/my-placements").get(verifyJWT,getMyPlacements)

export default router;