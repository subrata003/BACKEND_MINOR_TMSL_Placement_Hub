import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // Company Information
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    // Job Information
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: [
        "Full Time",
        "Part Time",
        "Internship",
        "Full Time + Internship",
      ],
      default: "Full Time",
    },

    location: {
      type: String,
      required: true,
    },

    workMode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      default: "Onsite",
    },

    // Salary / Package
    salary: {
      type: Number,
    },

    package: {
      type: Number,
    },

    // Eligibility Criteria
    eligibility: {
      minPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      degrees: [
        {
          type: String,
        },
      ],

      branches: [
        {
          type: String,
        },
      ],

      maxBacklogs: {
        type: Number,
        default: 0,
      },

      passingYear: {
        type: Number,
      },

      maxGapYears: {
        type: Number,
        default: 0,
      },

      minTenthPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },

      minTwelfthPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },

      requiredSkills: [
        {
          type: String,
          trim: true,
        },
      ],
    },

    // Job Dates
    applicationStartDate: {
      type: Date,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    // Job Status
    status: {
      type: String,
      enum: [
        "Draft",
        "Open",
        "Closed",
        "Completed",
      ],
      default: "Draft",
    },

    // Created by Admin/TPO
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;