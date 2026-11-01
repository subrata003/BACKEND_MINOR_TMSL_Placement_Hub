import express from "express";

import {
  getAllApplications,
  updateApplicationStatus,
} from "../../controllers/admin/applicationController.controller.js";

import { verifyToken } from "../../middlewares/user/authMiddlewares.js";
import { verifyRole } from "../../middlewares/user/roleMiddleware.js";

const ApplyRouterAdmin = express.Router();

ApplyRouterAdmin.use(verifyToken,verifyRole("admin"));

ApplyRouterAdmin.get("/", getAllApplications);

ApplyRouterAdmin.patch("/:id/status", updateApplicationStatus);

export default ApplyRouterAdmin;