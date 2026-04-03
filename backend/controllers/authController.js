import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const register = async (req, res) => {
  try {
    console.log("Registration request received with data:", req.body);
    const { name, phone, password, zone, avgHoursPerDay, avgWeeklyEarnings } = req.body;
    
    if (!name || !phone || !password || !zone || !avgHoursPerDay || !avgWeeklyEarnings) {
      console.log("Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ error: "Phone number already registered" });
    }

    const riskScore = calculateRiskScore(zone);
    const riskProfile = {
      score: riskScore,
      recommendedPremium: 49,
      zoneRisk: zone,
      weatherRisk: "clear",
      disruptionRisk: "0",
    };

    const user = await User.create({
      name,
      phone,
      password,
      zone,
      avgHoursPerDay,
      avgWeeklyEarnings,
      riskProfile,
      activity: "active",
    });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    console.log("User created successfully:", user._id);
    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        zone: user.zone,
        riskProfile: user.riskProfile,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error.message || error);
    return res.status(500).json({ error: "Failed to register user", details: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Login request received");
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ error: "Phone and password required" });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(401).json({ error: "Invalid phone or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid phone or password" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    console.log("Login successful for user:", user._id);
    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        zone: user.zone,
        riskProfile: user.riskProfile,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message || error);
    return res.status(500).json({ error: "Login failed" });
  }
};

function calculateRiskScore(zone) {
  const zoneMap = { high_risk: 80, medium_risk: 55, low_risk: 30 };
  return zoneMap[zone] ?? 50;
}
