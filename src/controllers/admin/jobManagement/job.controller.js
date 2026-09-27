import Job from "../../../models/admin/jobManagement/Job.js";


export const createJob = async (req, res) => {
  try {
    const {
      companyName,
      
      jobTitle,
      jobDescription,
      jobType,
      location,
      workMode,
      salary,
      package: jobPackage,
      eligibility,
      applicationStartDate,
      applicationDeadline,
      status,
    } = req.body;

    // Basic validation
    if (
      !companyName ||
      !jobTitle ||
      !jobDescription ||
      !location ||
      !applicationDeadline
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Create job
    const job = await Job.create({
      companyName,
      
      jobTitle,
      jobDescription,
      jobType,
      location,
      workMode,
      salary,
      package: jobPackage,
      eligibility,
      applicationStartDate,
      applicationDeadline,
      status: status || "Draft",

      // Comes from logged-in admin JWT
      createdBy: req.user.id,
    });
    
    const saveJob = await job.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: saveJob,
    });
  } catch (error) {
    console.error("Create job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create job",
      error: error.message,
    });
  }
};
