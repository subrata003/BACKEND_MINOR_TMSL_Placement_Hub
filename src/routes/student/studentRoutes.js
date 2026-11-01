import express from "express";

import {
  createStudentProfile
} from "../../controllers/student/studentController.js";

import { verifyToken } from "../../middlewares/user/authMiddlewares.js";
import { verifyRole } from "../../middlewares/user/roleMiddleware.js";

const studentDataRouter = express.Router();

studentDataRouter.use(verifyToken,verifyRole("student"));

// Create own student profile
studentDataRouter.post("/profile", createStudentProfile);

// Get own student profile
// studentDataRouter.get("/profile", getMyStudentProfile);

export default studentDataRouter;