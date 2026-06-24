const rateLimit = require('express-rate-limit');

// General API rate limit
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again in 15 minutes.' },
});

// Stricter limit for detection (ML inference is expensive)
const detectionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, error: 'Detection limit reached. Max 10 detections per minute.' },
});

// Auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many auth attempts. Try again in 15 minutes.' },
});

module.exports = rateLimiter;
module.exports.detectionLimiter = detectionLimiter;
module.exports.authLimiter = authLimiter;
