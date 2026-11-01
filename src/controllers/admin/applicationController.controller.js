import Application from "../../models/student/Application.js";

export const getAllApplications = async (req, res) => {
  try {
    const { status, jobId } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (jobId) {
      filter.job = jobId;
    }

    const applications = await Application.find(filter)
      .populate("student")
      .populate("job")
      .sort({ appliedAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const allowedStatuses = [
      "Under Review",
      "Shortlisted",
      "Interview Scheduled",
      "Selected",
      "Not Selected",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      id,
      { $set: { status, remarks } },
      { new: true, runValidators: true }
    )
      .populate("student")
      .populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};