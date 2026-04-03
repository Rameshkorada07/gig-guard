import Claim from "../models/Claim.js";
import Policy from "../models/Policy.js";
import User from "../models/User.js";

const eventLossMap = {
  rain: 2,
  heat: 3,
  aqi: 2,
  traffic: 1,
  outage: 4,
};

export const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.json({ claims });
  } catch (error) {
    console.error("Error fetching claims:", error.message);
    return res.status(500).json({ error: "Failed to fetch claims" });
  }
};

export const triggerEvent = async (req, res) => {
  try {
    const event = req.params.event;
    if (!eventLossMap[event]) {
      return res.status(400).json({ error: "Invalid trigger event" });
    }

    const zone = req.query.zone ? String(req.query.zone) : null;

    const activePolicies = await Policy.find({ active: true });
    if (!activePolicies.length) {
      return res.json({ message: "No active policies found", createdClaims: 0 });
    }

    const processing = [];
    for (const policy of activePolicies) {
      if (zone && policy.zone !== zone) continue;

      const user = await User.findById(policy.userId);
      if (!user) continue;

      if (zone && user.zone !== zone) continue;

      const lostHours = eventLossMap[event] || 1;
      const payout = Math.round(lostHours * policy.premium * 0.75);
      const isInactive = user.activity === "inactive";
      const claim = new Claim({
        userId: user._id,
        event: event === "aqi" ? "High AQI" : event === "outage" ? "Platform outage" : event === "rain" ? "Heavy Rain" : event === "heat" ? "Extreme Heat" : "Traffic slowdown",
        lostHours,
        payout,
        status: isInactive ? "flagged" : "approved",
        flagged: isInactive,
      });
      processing.push(claim.save());
    }

    const created = await Promise.all(processing);

    return res.json({ message: `Trigger ${event} processed`, createdClaims: created.length, created });
  } catch (error) {
    console.error("Error triggering event:", error.message);
    return res.status(500).json({ error: "Failed to trigger event" });
  }
};
