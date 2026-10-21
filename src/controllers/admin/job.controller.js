import Job from "../../models/admin/Job.js";


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
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

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

    // Find and update job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
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
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Check if job exists
    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });

  } catch (error) {
    console.error("Update job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update job",
      error: error.message,
    });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const {id}=req.params;

    // Find and delete job
    const deletedJob=await Job.findByIdAndDelete(id);

    // Check if job exists
    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: deletedJob,
    });


    
  } catch ({error}) {
    console.error("Delete job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
      error: error.message,
    });
    
  }
}

//handle application deadline
export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.params;

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

    // Continue with your existing eligibility check
    // and application creation logic here.

  } catch (error) {
    console.error("Apply job error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to apply for job",
    });
  }
};

export const jobDetails=async(req,res)=>{
  try {
    const {id}=req.params;
    const job=await Job.findById(id);
    if(!job){
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });

    }
    return res.status(200).json({
      success: true,
      message: "Job details",
      data: job,
    })
    
  } catch (error) {
    
  }
}
export const getAlljob = async (req, res) => {
 try {
  const job = await Job.find();
  res.status(200).json({ success: true, message: "job get successfully", data: job })
 } catch (error) {
  res.status(500).json({ success: false, message: "Internal server error" })

 }
}

