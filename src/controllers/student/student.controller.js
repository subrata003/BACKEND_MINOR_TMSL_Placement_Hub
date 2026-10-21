import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Student from "../../models/student/student.model.js";
import { deleteFromeCloudinary, uploadOnCloudinary } from "../../service/cloudinary.service.js"
import userModal from "../../models/user/user.model.js";
import ChcekEligibility from "../../utils/ChcekEligibility.js";


const createProfile = asyncHandler(async (req, res) => {

    // console.log("===== CREATE PROFILE =====");
    const userId = req.user?._id;
    //    console.log("User ID:", userId);
    const existingStudent = await Student.findOne({ userId })

    // console.log("existingStudent", existingStudent);


    if (existingStudent) {

        throw new ApiError(409, " student profile already exists")
    }

const {
    name,
    email,
    phone,
    dateOfBirth,
    gender,
    rollNumber,
    registrationNumber,
    college,
    degree,
    branch,
    passingYear,
    tenthPercentage,
    twelfthPercentage,
    ugPercentage,
    pgPercentage,
    percentage,
    activeBacklogs,
    totalBacklogs,
    gapYears,
    skills
} = req.body;
    
        console.log("DODY",req.body);
        
        

    if (
        [name, email, phone, rollNumber, degree, branch, passingYear, registrationNumber].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }


    if (!email.toLowerCase().endsWith("@gmail.com")) {
        throw new ApiError(400, "Email must be a Gmail address!");
    }

    if (phone.length !== 10) {
        throw new ApiError(400, "Phone number must be 10 digits");
    }
    // uploaded file 

    const resumeLocalFile = req.files?.resume?.[0]?.path;
    const photoLocalFile = req.files?.profilePhoto?.[0]?.path;

    // console.log("Resume path:", resumeLocalFile);
    // console.log("Photo path:", photoLocalFile);

    if (!resumeLocalFile) {
        throw new ApiError(400, " resume is required");
    }

    if (!photoLocalFile) {
        throw new ApiError(400, " profile photo is required");
    }


 


   const resumeResult = await uploadOnCloudinary(
    resumeLocalFile,
    "raw"
);

    // console.log("Resume upload:", resumeResult);

    if (!resumeResult) {
        throw new ApiError(500, " Failed to upload resume");
    }


    const photoResult = await uploadOnCloudinary(photoLocalFile, "image");

    //  console.log(
    //     "Profile upload:",
    //     photoResult
    // );

    if (!photoResult) {
        throw new ApiError(500, " Failed to upload profile photo");
    }

//   console.log("req.body.branch =", req.body.branch);
// console.log("req.body.passingYear =", req.body.passingYear);

// console.log("branch variable =", branch);
// console.log("passingYear variable =", passingYear);

    const student = await Student.create({

        userId,

        name,
        email,
        phone,
        dateOfBirth,
        gender,

        rollNumber,
        registrationNumber,
        college,

        degree,
        branch,
        passingYear,

        tenthPercentage,
        twelfthPercentage,
        ugPercentage,
        pgPercentage,
        percentage,

        activeBacklogs,
        totalBacklogs,

        gapYears,

        skills,

        resume: {
            url: resumeResult.secure_url,
            publicId: resumeResult.public_id
        },

        profilePhoto: {
            url: photoResult.secure_url,
            publicId: photoResult.public_id
        }
        ,
        placementStatus:req.body.placementStatus,
        placedCompany:req.body.placedCompany,
        package:req.body.package
    })

    // console.log(
    //     "Student document created:",
    //     student
    // );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                student,
                "Student profile created successfully"
            )
        )
})


const updateProfile = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const student = await Student.findOne({ userId });

    if (!student) {

        throw new ApiError(404, " Student profile not found")
    }

    const {
        email,
        rollNumber,
        college,
        branch,
        degree,
        passingYear,
        percentage,
        activeBacklogs
    } = req.body;

  const resumeFile = req.file?.path;
    const oldResume = student.resume;
  
    

    let newResume = null;

if (resumeFile) {

    const uploadResult = await uploadOnCloudinary(
        resumeFile,
        "raw"
    );

    if (!uploadResult) {
        throw new ApiError(
            500,
            "Failed to upload new resume"
        );
    }

    newResume = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id
    };
}

    // Prepare database update
    const updateData = {
        email,
        rollNumber,
        college,
        branch,
        degree,
        passingYear,
        percentage,
        activeBacklogs
    };

    // Only replace resume if new resume was uploaded
    if (newResume) {

        updateData.resume = newResume;
    }



    const updatedStudent = await Student.findOneAndUpdate({ userId },
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    );

    // if DB update failed

    if (!updatedStudent) {

        if (newResume) {
            await deleteFromeCloudinary(
                newResume.publicId,
               "raw"
            )
        }

        throw new ApiError(500, "Failed to update student profile");
    }

    // delete old resume
    if (newResume && oldResume) {

        await deleteFromeCloudinary(
            oldResume.publicId,
            "raw"
        )


    };

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedStudent,
                "Student profile updated successfully"
            )
        )



})


const getProfile=asyncHandler(async(req,res)=>{
    const userId=req.user?._id

    const student =await Student.findOne({userId})

    if (!student) {
        
        throw new ApiError(404,"Student profile not found");
    }

    return res
    .status(200)
    .json(
        
        new ApiResponse(
            200,
            student,
            "Student profile fetched successfully"
        )
    )
})

const deleteProfile=asyncHandler(async(req,res)=>{

    const { studentId }=req.params ;

    console.log("studentId:",studentId);

    const profile = await Student.findById(studentId);  

    console.log("profile:",profile)

    if (!profile) {
        
        throw new ApiError(404," Student profile not found ");

    }

    const filesToDelete=[
        {
             publicId:profile.resume.publicId,
             resourceType:"raw"

         },
         {
            publicId: profile.profilePhoto.publicId,
            resourceType: "image"
        }
     ].filter(file => file.publicId);

      const userId = profile.userId;
      console.log("userId",userId);

     // Delete the student's database records first.
    // Also remove related applications, if required.
    await userModal.deleteOne( { _id: userId });
    await Student.deleteOne({ _id: studentId });

    const results = await Promise.allSettled(
        filesToDelete.map(file =>
            deleteFromeCloudinary(
                file.publicId,
                file.resourceType
            )
        )
    );



     results.forEach((result, index) => {
        if (
            result.status === "rejected" ||
            !result.value?.success
        ) {
            console.error(
                "Cloudinary cleanup requires retry:",
                filesToDelete[index].publicId
            );

            // In production, enqueue a retry using a durable
            // cleanup job or deletion queue.
        }
    });


       return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Student account deleted"
        )
    );

})

const checkJobEligibility= asyncHandler(async(req,res)=>{

    const {jobId}=req.params;
    const userId=req.user ?._id;

    const student = await Student.findOne({userId});

    if (! student) {
        throw new ApiError(404,"Student profile not found");
    }

    const job = await Job.findById({jobId});

    if (!job) {
        
        throw new ApiError(404," job not found ");
    }

    const eligibilityResult= ChcekEligibility(student,job);

    return res
    .status(200)
    .json(
        200,
         {
        jobId: job._id,
        jobTitle: job.title,
        eligible: eligibilityResult.eligible,
        reasons: eligibilityResult.reasons,
      },

      "Eligibility checked successfully"
    );
})

export {
    createProfile,
    updateProfile,
    getProfile,
    deleteProfile,
    checkJobEligibility

}