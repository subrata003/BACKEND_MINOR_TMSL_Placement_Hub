import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    // Reference to User account
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Personal Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    // College Information
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    registrationNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    college: {
      type: String,
      default: "Techno Main Salt Lake",
    },

    // Academic Information
    degree: {
      type: String,
      enum: ["BCA", "BTech", "MCA", "MTech", "Other"],
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    passingYear: {
      type: Number,
      required: true,
    },

    tenthPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    twelfthPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    ugPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    pgPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    percentage: {
      type: Number,
      min: 0,
      max: 100,
    },

    // Backlog Information
    activeBacklogs: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalBacklogs: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Academic Gap
    gapYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Skills
    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    // Resume - Cloudinary
    resume: {
      url: {
        type: String,
        trim: true,
        required: true
      },

      publicId: {
        type: String,
        trim: true,
        required: true
      }

    },

    // Profile Photo - Cloudinary
    profilePhoto: {
      url: {
        type: String,
        trim: true,
        default: null
      },

      publicId: {
        type: String,
        trim: true,
        default: null
      }


    },

    // Placement Status
    placementStatus: {
      type: String,
      enum: [
        "Not Placed",
        "Placed",
        "Not Interested",
      ],
      default: "Not Placed",
    },

    placedCompany: {
      type: String,
      trim: true,
    },

    package: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;