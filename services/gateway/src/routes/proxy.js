const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { detectionLimiter } = require('../middleware/rateLimiter');
const logger = require('../middleware/logger');

const router = express.Router();

const proxyOptions = (target, pathRewrite) => ({
  target,
  changeOrigin: true,
  pathRewrite,
  on: {
    error: (err, req, res) => {
      logger.error(`Proxy error to ${target}: ${err.message}`);
      res.status(502).json({ success: false, error: 'Service temporarily unavailable' });
    },
  },
});

// ─── Detection Service ────────────────────────────────────
router.use(
  '/detect',
  authenticate,
  detectionLimiter,
  createProxyMiddleware(proxyOptions(
    process.env.DETECTION_SERVICE_URL || 'http://localhost:8001',
    { '^/api/v1/detect': '/detect' }
  ))
);

// ─── Chat Service ─────────────────────────────────────────
router.use(
  '/chat',
  authenticate,
  createProxyMiddleware(proxyOptions(
    process.env.CHAT_SERVICE_URL || 'http://localhost:8002',
    { '^/api/v1/chat': '/chat' }
  ))
);

// ─── Education Service ────────────────────────────────────
router.use(
  '/education',
  optionalAuth,
  createProxyMiddleware(proxyOptions(
    process.env.EDUCATION_SERVICE_URL || 'http://localhost:3002',
    { '^/api/v1/education': '/education' }
  ))
);

// ─── History Service ──────────────────────────────────────
router.use(
  '/history',
  authenticate,
  createProxyMiddleware(proxyOptions(
    process.env.HISTORY_SERVICE_URL || 'http://localhost:3003',
    { '^/api/v1/history': '/history' }
  ))
);

module.exports = router;
