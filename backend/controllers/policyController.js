import Policy from "../models/Policy.js";
import User from "../models/User.js";

const planMap = {
  starter: { weeklyPremium: 29, coverageHours: 10 },
  standard: { weeklyPremium: 49, coverageHours: 20 },
  pro: { weeklyPremium: 79, coverageHours: 40 },
};

const zoneRiskMap = {
  high_risk: 80,
  medium_risk: 55,
  low_risk: 30,
};

function clamp(x, min, max) {
  return Math.max(min, Math.min(max, x));
}

function riskScoringEngine({ zone, weatherForecast = "clear", pastDisruption = 0, base = 0 }) {
  const zoneRisk = zoneRiskMap[zone] ?? 50;
  let score = zoneRisk;
  let safetyDiscount = 0;
  let warning = "";

  if (zone === "high_risk") score += 15;
  if (zone === "low_risk") score -= 10;

  if (weatherForecast === "rain") {
    score += 10;
    warning = "Heavy rain predicted";
  } else if (weatherForecast === "heat") {
    score += 12;
    warning = "Extreme heat event";
  } else if (weatherForecast === "aqi") {
    score += 8;
    warning = "High AQI event";
  }

  if (pastDisruption > 2) score += 10;
  if (pastDisruption <= 1) safetyDiscount = 5;

  const premium = clamp(
    base + (zone === "high_risk" ? 20 : zone === "low_risk" ? -10 : 0) + (weatherForecast === "rain" ? 10 : 0) - safetyDiscount + pastDisruption * 2,
    10,
    200
  );

  return {
    riskScore: clamp(Math.round(score), 0, 100),
    recommendedPremium: Math.round(premium),
    safetyDiscount,
    warning,
    zoneRisk: zone,
    weatherRisk: weatherForecast,
    disruptionRisk: `${pastDisruption}`,
  };
}

export const activatePolicy = async (req, res) => {
  try {
    const { plan, weatherForecast = "clear", pastDisruption = 0 } = req.body;
    const userId = req.userId;

    if (!plan) {
      return res.status(400).json({ error: "Missing plan" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const planDef = planMap[plan];
    if (!planDef) {
      return res.status(400).json({ error: "Invalid plan" });
    }

    const risk = riskScoringEngine({ zone: user.zone, weatherForecast, pastDisruption, base: planDef.weeklyPremium });

    const policyData = {
      userId: user._id,
      plan,
      premium: risk.recommendedPremium,
      coverageHours: planDef.coverageHours,
      active: true,
      activatedAt: new Date(),
      zone: user.zone,
    };

    const policy = await Policy.findOneAndUpdate({ userId: user._id }, policyData, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    await User.findByIdAndUpdate(user._id, { riskProfile: risk });

    return res.json({ policy, riskProfile: risk });
  } catch (error) {
    console.error("Error activating policy:", error.message);
    return res.status(500).json({ error: "Failed to activate policy" });
  }
};

export const getUserPolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne({ userId: req.userId });
    if (!policy) return res.json({ policy: null });
    return res.json({ policy });
  } catch (error) {
    console.error("Error fetching policy:", error.message);
    return res.status(500).json({ error: "Failed to fetch policy" });
  }
};
