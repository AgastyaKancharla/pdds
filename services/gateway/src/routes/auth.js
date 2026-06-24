const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { getDb } = require('../db/postgres');
const logger = require('../middleware/logger');
const { authLimiter } = require('../middleware/rateLimiter');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// ─── Validation Schemas ───────────────────────────────────
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// ─── Token Generation ─────────────────────────────────────
const generateToken = (user) =>
  jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

// ─── POST /register ───────────────────────────────────────
router.post('/register', authLimiter, async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const db = getDb();
    const existing = await db.query('SELECT id FROM users WHERE email = $1', [value.email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(value.password, 12);
    const userId = uuidv4();

    await db.query(
      `INSERT INTO users (id, email, password_hash, name, role, created_at)
       VALUES ($1, $2, $3, $4, 'user', NOW())`,
      [userId, value.email, passwordHash, value.name]
    );

    const token = generateToken({ id: userId, email: value.email, role: 'user' });
    logger.info(`New user registered: ${value.email}`);

    res.status(201).json({
      success: true,
      data: { token, user: { id: userId, email: value.email, name: value.name } },
    });
  } catch (err) {
    logger.error(`Register error: ${err.message}`);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// ─── POST /login ──────────────────────────────────────────
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, error: error.details[0].message });

    const db = getDb();
    const result = await db.query(
      'SELECT id, email, name, password_hash, role FROM users WHERE email = $1',
      [value.email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(value.password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    await db.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

    res.json({
      success: true,
      data: {
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      },
    });
  } catch (err) {
    logger.error(`Login error: ${err.message}`);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// ─── GET /me ──────────────────────────────────────────────
router.get('/me', authenticate, async (req, res) => {
  try {
    const db = getDb();
    const result = await db.query(
      'SELECT id, email, name, role, created_at, last_login FROM users WHERE id = $1',
      [req.user.userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
});

// ─── POST /logout ─────────────────────────────────────────
router.post('/logout', authenticate, (req, res) => {
  // Token invalidation is handled client-side; add Redis blacklist for production
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
