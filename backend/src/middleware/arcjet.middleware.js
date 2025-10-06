import aj from "../lib/arcjet.js";

export const arcgetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      identifier:
        req.ip ||
        req.headers["x-forwarded-for"] ||
        req.headers["user-agent"] ||
        "unknown",
    });

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res
          .status(403)
          .json({ message: "Access denied by security policy." });
      }
    }

    next();
  } catch (error) {
    console.log("Arcjet Protection Error:", error);
    next();
  }
};
