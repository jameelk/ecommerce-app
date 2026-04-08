-- ============================================================
-- ECOMMERCE DATABASE SCHEMA (PostgreSQL / Supabase)
-- Production-grade schema with full variation support
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search

-- ============================================================
-- USERS & AUTH
-- ============================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),(µ¥°QaPU9%EU°
8bÆDäeôäRDUBTäTRÀ¢gVÆÅöæÖRDUBäõBåTÄÂDTdTÅBrrÂ]]\Ý\VÛHVÕSQUS	ØÝ\ÝÛY\ÈÒPÒÈ
ÛHS
	ØÝ\ÝÛY\Ë	ØYZ[Ë	Û[Ù\]ÜÊJK\×ØXÝ]HÓÓPSQUSQK
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  refresh_token TEXT UNIQUE NOT NULL,
  device_info JSONB,
  ip_address TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  label TEXT DEFAULT 'Home',
  full_name TEXT NOT NULL,
  phone TEXT,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

