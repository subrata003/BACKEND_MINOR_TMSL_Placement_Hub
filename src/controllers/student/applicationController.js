import Application from "../../models/student/Application.js";
import Student from "../../models/student/Student.js";
import Job from "../../models/admin/Job.js";
import { isEligible } from "../../service/isEligible .js";
// import { isEligible } from "../../services/eligibilityService.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const student = await Student.findOne({
      userId: req.user.id,
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const now = new Date();

    if (job.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "This job is not open for applications",
      });
    }

    if (job.applicationStartDate && now < job.applicationStartDate) {
      return res.status(400).json({
        success: false,
        message: "Applications have not started yet",
      });
    }

    if (now > job.applicationDeadline) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed",
      });
    }

    const existingApplication = await Application.findOne({
      student: student._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    if (!isEligible(student, job)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible for this job",
      });
    }

    const application = await Application.create({
      student: student._id,
      job: job._id,
      resume: student.resume,
    });

    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully",
      data: application,
    });
  } catch (error) {
    // Also handles duplicate-key errors from the unique index.
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    console.error("Apply job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};