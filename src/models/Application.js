import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    date: Date,
    round: String,
    mode: {
      type: String,
      enum: ["Online", "Onsite"],
    },
    notes: String,
  },
  { _id: false } 
);

const OfferSchema = new mongoose.Schema(
  {
    decision: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
    decidedAt: Date,
    notes: String,
  },
  { _id: false }
);

const ApplicationSchema = new mongoose.Schema(
  {
    userId: String,

    company: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      required: true,
    },

    fromStatus: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected", null],
      default: null,
    },

    interview: {
      type: InterviewSchema,
      default: undefined, 
    },

    offer: {
      type: OfferSchema,
      default: undefined,
    },
  },
  {
    timestamps: {
      createdAt: "appliedAt",
      updatedAt: "updatedAt",
    },  
  }
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
