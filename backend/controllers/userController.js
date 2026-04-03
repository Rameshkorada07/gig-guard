import User from "../models/User.js";
import Policy from "../models/Policy.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const calculateRiskScore = async (req, res) => {
  try {
    const { zone, weatherForecast, pastDisruption, plan } = req.body;
    if (!zone) {
      return res.status(400).json({ error: "Missing zone" });
    }

    const planMap = {
      starter: { weeklyPremium: 29, coverageHours: 10 },
      standard: { weeklyPremium: 49, coverageHours: 20 },
      pro: { weeklyPremium: 79, coverageHours: 40 },
    };

    const base = planMap[plan]?.weeklyPremium ?? 49;
    const zoneRiskMap = { high_risk: 80, medium_risk: 55, low_risk: 30 };
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

    const clamp = (x, min, max) => Math.max(min, Math.min(max, x));
    const premium = clamp(
      base + (zone === "high_risk" ? 20 : zone === "low_risk" ? -10 : 0) + (weatherForecast === "rain" ? 10 : 0) - safetyDiscount + pastDisruption * 2,
      10,
      200
    );

    return res.json({
      riskScore: clamp(Math.round(score), 0, 100),
      recommendedPremium: Math.round(premium),
      safetyDiscount,
      warning,
      zoneRisk: zone,
      weatherRisk: weatherForecast,
      disruptionRisk: `${pastDisruption}`,
    });
  } catch (error) {
    console.error("Error calculating risk:", error.message);
    return res.status(500).json({ error: "Failed to calculate risk" });
  }
};
