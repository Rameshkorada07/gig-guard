import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ["starter", "standard", "pro"], required: true },
    premium: { type: Number, required: true },
    coverageHours: { type: Number, required: true },
    active: { type: Boolean, default: false },
    activatedAt: Date,
    zone: String,
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
