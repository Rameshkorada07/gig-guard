import User from "../models/User.js";
import Policy from "../models/Policy.js";
import Claim from "../models/Claim.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClaims = await Claim.countDocuments();
    const flaggedClaims = await Claim.countDocuments({ flagged: true });
    const activePolicies = await Policy.countDocuments({ active: true });
    return res.json({ totalUsers, totalClaims, flaggedClaims, activePolicies });
  } catch (error) {
    console.error("Error fetching admin stats:", error.message);
    return res.status(500).json({ error: "Failed to fetch admin stats" });
  }
};
