-- PDDS Database Schema
-- Migration: 001_init
-- Description: Core users, profiles, sessions

-- ─── Extensions ───────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  name          VARCHAR(100) NOT NULL,
  role          VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'agronomist')),
  provider      VARCHAR(20) DEFAULT 'email' CHECK (provider IN ('email', 'google')),
  provider_id   TEXT,
  avatar_url    TEXT,
  is_verified   BOOLEAN DEFAULT FALSE,
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── User Profiles ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location      VARCHAR(255),
  bio           TEXT,
  plant_types   TEXT[],         -- plants/crops they grow
  farm_size     VARCHAR(50),    -- 'home_garden', 'small_farm', 'large_farm'
  language      VARCHAR(10) DEFAULT 'en',
  notifications BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Usage Tracking ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS usage_tracking (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
  action          VARCHAR(100) NOT NULL,  -- 'detection', 'chat_message', 'symptom_check'
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_created_at ON usage_tracking(created_at);

-- ─── Updated At Trigger ───────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
