import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

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

    resume: {
      type: String,
      default: "",
    },

    degree: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    passingYear: {
      type: Number,
    },

    percentage: {
      type: Number,
      min: 0,
      max: 100,
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

    activeBacklogs: {
      type: Number,
      default: 0,
      min: 0,
    },

    gapYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    skills: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;