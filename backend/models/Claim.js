import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: String, required: true },
    lostHours: { type: Number, required: true },
    payout: { type: Number, required: true },
    status: { type: String, enum: ["approved", "rejected", "flagged"], default: "approved" },
    flagged: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Claim = mongoose.model("Claim", claimSchema);
export default Claim;
