import Student from "../../models/student/Student.js";

export const createStudentProfile = async (req, res) => {
  try {
    // Get identity from the authenticated login token
    const userId = req.user.id;

    // Prevent creating a second profile for the same user
    const existingStudent = await Student.findOne({ userId });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Your profile already exists. Please update it instead.",
        data: existingStudent,
      });
    }

    const {
      phone,
      gender,
      rollNumber,
      registrationNumber,
      college,
      degree,
      branch,
      passingYear,
      tenthPercentage,
      twelfthPercentage,
      pgPercentage,
      activeBacklogs,
      totalBacklogs,
      gapYears,
      skills,
    } = req.body;

    const student = await Student.create({
      userId,
      name:req.user.name,
      email: req.user.email, // Use the logged-in account's email
      phone,
      gender,
      rollNumber,
      registrationNumber,
      college,
      degree,
      branch,
      passingYear,
      tenthPercentage,
      twelfthPercentage,
      pgPercentage,
      activeBacklogs,
      totalBacklogs,
      gapYears,
      skills,
    });

    return res.status(201).json({
      success: true,
      message: "Your student profile was created successfully",
      data: student,
    });
  } catch (error) {
    console.error("Create student profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create student profile",
    });
  }
};