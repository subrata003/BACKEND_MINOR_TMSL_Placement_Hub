
import mongoose from "mongoose";

const interviewRoundSchema = new mongoose.Schema(
  {
    roundName: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Completed",
        "Passed",
        "Failed",
        "Cancelled",
      ],
      default: "Scheduled",
    },

    scheduledAt: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  { _id: true }
);

const jobApplicationSchema = new mongoose.Schema(
  {
    // Student who applied
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // Job for which the student applied
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },


    applicantName: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    companyName:{
      type:String,
      required:true,
      trim:true,
    },

    // 1. Application tracking
    applicationStatus: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Rejected",
        "Withdrawn",
      ],
      default: "Applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    // 2. Placement drive tracking
    drive: {
      status: {
        type: String,
        enum: [
          "Not Scheduled",
          "Scheduled",
          "Attended",
          "Absent",
          "Completed",
          "Cancelled",
        ],
        default: "Not Scheduled",
      },

      date: {
        type: Date,
      },

      location: {
        type: String,
        trim: true,
      },

      instructions: {
        type: String,
        trim: true,
      },
    },

    // 3. Interview tracking
    interviewRounds: {
      type: [interviewRoundSchema],
      default: [],
    },

    //  Final selection result
    resultStatus: {
      type: String,
      enum: [
        "Pending",
        "Selected",
        "Rejected",
        "Waitlisted",
      ],
      default: "Pending",
    },

    resultDate: {
      type: Date,
    },

    // 5. Final placement tracking
    placementStatus: {
      type: String,
      enum: [
        "Not Placed",
        "Offer Released",
        "Offer Accepted",
        "Placed",
        "Offer Declined",
      ],
      default: "Not Placed",
    },

    offer: {
      package: {
        type: Number,
        min: 0,
      },

      role: {
        type: String,
        trim: true,
      },

      offerDate: {
        type: Date,
      },

      joiningDate: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

// A student can apply for a particular job only once.
jobApplicationSchema.index(
  { studentId: 1, jobId: 1 },
  { unique: true }
);

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
