import mongoose from "mongoose";
import { JobApplication } from "../../models/jobApplication/jobApplication.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError} from "../../utils/ApiError.js"
import { ApiResponse} from "../../utils/ApiResponse.js"
import ChcekEligibility from "../../utils/ChcekEligibility.js";
import Student from "../../models/student/student.model.js";
import Job from "../../models/admin/Job.js";
// import Student from "../../models/student/student.model.js";





const applyForJob = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  
  if (!mongoose.isValidObjectId(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized user");
  }

  
  const student = await Student.findOne({ userId });

  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  
  if (job.status !== "Open") {
    throw new ApiError(400, "This job is not open for applications");
  }

  const now = new Date();

  
  if (!job.applicationDeadline || job.applicationDeadline < now) {
    throw new ApiError(400, "The application deadline has passed");
  }

  
  if (job.applicationStartDate && job.applicationStartDate > now) {
    throw new ApiError(400, "Applications have not started yet");
  }


  const eligibility = ChcekEligibility(student, job);

  if (!eligibility.eligible) {
    throw new ApiError(
      400,
      `You are not eligible: ${eligibility.reasons.join(", ")}`
    );
  }

  // existing application
  const existingApplication = await JobApplication.findOne({
    studentId: student._id,
    jobId: job._id,
  });

  if (existingApplication) {
    throw new ApiError(409, "You have already applied for this job");
  }

  
  let application;

  try {
    application = await JobApplication.create({
      studentId: student._id,
      jobId: job._id,
      applicantName: student.name,
      jobTitle: job.jobTitle,
      companyName:job.companyName
    });
  } catch (error) {

    if (error.code === 11000) {
      throw new ApiError(409, "You have already applied for this job");
    }

    throw error;
  }


  return res.status(201).json(
    new ApiResponse(
      201,
      application,
      "Job application submitted successfully"
    )
  );
});


const getAlljob = asyncHandler(async(req,res)=>{

  const today = new Date();

  const jobs=await Job.find({
    status:"Open",

    applicationDeadline:{$gte:today},

    $or:[
      {applicationStartDate:{$exists:false}},
      {applicationStartDate:null},
      {applicationStartDate:{$lte:today}}
    ]
  }).select("-__v").sort({ createdAt: -1 });

  return res
  . status(200)
  .json(
    new ApiResponse(
      200,
      jobs,
        "Available jobs fetched successfully"
    )
  )


})


const getJobById = asyncHandler(async (req, res) => {
  const { jobId } = req.params;

  // Validate the job ID
  if (!mongoose.isValidObjectId(jobId)) {
    throw new ApiError(400, "Invalid job ID");
  }

  const today = new Date();

  const job = await Job.findOne({
    _id: jobId,
    status: "Open", // Corrected spelling
    applicationDeadline: { $gte: today },
    $or: [
      { applicationStartDate: { $exists: false } },
      { applicationStartDate: null },
      { applicationStartDate: { $lte: today } },
    ],
  }).select("-__v"); // Corrected syntax

  if (!job) {
    throw new ApiError(
      404,
      "Job not found or applications are not currently open"
    );
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      job,
      "Job details fetched successfully"
    )
  );
});

// application tracker
const getMyApplication = asyncHandler(async(req,res)=>{

    const userId= req.user?._id;
    const student= await Student.findOne({userId});

    if (!student) {
        
        throw new ApiError(404,"Student profile not found");
    }

    const applications=await JobApplication.find({
        studentId: student._id,
    })
    .populate("jobId","jobTitle companyName location")
    .sort({createdAt:-1});

    return res
    .status(200)
    .json( new ApiResponse(
        200,
        applications,
        "Your applications fetched successfully"
    ))
})



const getDriveDetails = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const userId = req.user?._id;


  if (!mongoose.isValidObjectId(applicationId)) {
    throw new ApiError(400, "Invalid application ID");
  }

  
  const student = await Student.findOne({ userId });

  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  const application = await JobApplication.findOne({
    _id: applicationId,
    studentId: student._id,
  }).select("jobId jobTitle applicantName drive applicationStatus");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  
  if (
    !application.drive ||
    application.drive.status === "Not Scheduled"
  ) {
    throw new ApiError(404, "Drive has not been scheduled yet");
  }

  
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        applicationId: application._id,
        jobId: application.jobId,
        jobTitle: application.jobTitle,
        applicationStatus: application.applicationStatus,
        drive: application.drive,
      },
      "Drive details fetched successfully"
    )
  );
});



const getInterviewDetails = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;
  const userId = req.user?._id;


  if (!mongoose.isValidObjectId(applicationId)) {
    throw new ApiError(400, "Invalid application ID");
  }


  const student = await Student.findOne({ userId });

  if (!student) {
    throw new ApiError(404, "Student profile not found");
  }

  
  const application = await JobApplication.findOne({
    _id: applicationId,
    studentId: student._id,
  }).select("jobTitle jobId applicationStatus interviewRounds");

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  
  if (
    !application.interviewRounds ||
    application.interviewRounds.length === 0
  ) {
    throw new ApiError(404, "No interview rounds scheduled yet");
  }

  
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        applicationId: application._id,
        jobId: application.jobId,
        jobTitle: application.jobTitle,
        applicationStatus: application.applicationStatus,
        interviewRounds: application.interviewRounds,
      },
      "Interview details fetched successfully"
    )
  );
});

const getApplicationResult=asyncHandler(async(req,res)=>{
  const { applicationId}=req.params;
  const userId=req.user?._id;

  if (!mongoose.isValidObjectId(applicationId)) {
    
    throw new ApiError(400,"Invalid application Id")
  }

  const student=await Student.findOne({userId});

  if (!student) {
    throw new ApiError(404," Student profile not found");
  }



  const application=await JobApplication.findOne({
    _id:applicationId,
    studentId:student._id,
  }).select("jobId jobTitle applicationStatus resultStatus resultDate placementStatus offer");

 if (!application) {
   throw new ApiError(404,"Application not found")
 }

 return res
 .status(200)
 .json(
  new ApiResponse(
    200,
    {
      applicationId: application._id,
        jobId: application.jobId,
        jobTitle: application.jobTitle,
        applicationStatus: application.applicationStatus,
        resultStatus: application.resultStatus,
        resultDate: application.resultDate,
        placementStatus: application.placementStatus,
        offer: application.offer,
    },
    "Application result fetched successfully"
  )
 )

})

const getMyPlacements=asyncHandler(async(req,res)=>{

  const userId=req.user?._id;
  const student=await Student.findOne({userId});

  if (!student) {
    throw new ApiError(404," Student profile not found");
  }

  const placements=await JobApplication.findOne({
    studentId:student._id,
    placementStatus:{
      $in:["Offer Released", "Offer Accepted", "Placed"],
    }
  }) .select("jobId jobTitle applicantName  companyName resultStatus placementStatus offer createdAt")
     .populate("jobId"," location")
     .sort({updatedAt:-1});

     if (placements.length ===0) {
      return res
      .status(200)
      .json(
      new ApiResponse(
        200,
        [],
        "No placement records found"
      )
    );
     }
      
     return res
     .status(200)
     .json(
      new ApiResponse(
        200,
        placements,
        "Placement details fetched successfully"
      )
     )


})


export { applyForJob,getAlljob,getJobById,getMyApplication,getDriveDetails ,getInterviewDetails,getApplicationResult,getMyPlacements};



