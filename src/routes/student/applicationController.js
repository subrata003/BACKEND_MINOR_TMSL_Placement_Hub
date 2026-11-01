import express from "express";

import {
  applyJob,
} from "../../controllers/student/applicationController.js";
import { verifyToken } from "../../middlewares/user/authMiddlewares.js";
import { verifyRole } from "../../middlewares/user/roleMiddleware.js";

// import authMiddleware from "../../middleware/authMiddleware.js";
// import roleMiddleware from "../../middleware/roleMiddleware.js";

const ApplyRouterStudent = express.Router();

// Student applies for a job
ApplyRouterStudent.post(
  "/jobs/:jobId/apply",
  verifyToken,verifyRole("student"),
  applyJob
);

export default ApplyRouterStudent;