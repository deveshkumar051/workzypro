-- ============================================================
-- Workzy Platform — Database Schema
-- Run this file once to set up all tables
-- ============================================================

-- Accounts (clients + helpers share one table, role differentiates)
CREATE TABLE IF NOT EXISTS accounts (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100)  NOT NULL,
  mobile        VARCHAR(15)   NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          VARCHAR(10)   NOT NULL CHECK (role IN ('client', 'helper')),
  location      VARCHAR(150),
  created_at    TIMESTAMP     DEFAULT NOW()
);

-- Services catalogue
CREATE TABLE IF NOT EXISTS services (
  id            SERIAL PRIMARY KEY,
  service_name  VARCHAR(100)  NOT NULL,
  category      VARCHAR(100),
  description   TEXT,
  base_price    NUMERIC(10,2) NOT NULL DEFAULT 0,
  image_url     VARCHAR(255)
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id             SERIAL PRIMARY KEY,
  client_id      INTEGER       NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  helper_id      INTEGER       NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  service_id     INTEGER       NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  date           DATE          NOT NULL,
  time           TIME          NOT NULL,
  status         VARCHAR(20)   NOT NULL DEFAULT 'pending'
                               CHECK (status IN ('pending','accepted','rejected','completed','cancelled')),
  price          NUMERIC(10,2) NOT NULL,
  address        TEXT          NOT NULL,
  payment_method VARCHAR(20)   DEFAULT 'offline' CHECK (payment_method IN ('online','offline')),
  created_at     TIMESTAMP     DEFAULT NOW()
);

-- Reviews (one per completed booking)
CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  booking_id  INTEGER   NOT NULL REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
  client_id   INTEGER   NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  rating      SMALLINT  NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  title       VARCHAR(150) NOT NULL,
  message     TEXT         NOT NULL,
  is_read     BOOLEAN      DEFAULT FALSE,
  created_at  TIMESTAMP    DEFAULT NOW()
);

-- Helper earnings (created when booking status → completed)
CREATE TABLE IF NOT EXISTS earnings (
  id          SERIAL PRIMARY KEY,
  helper_id   INTEGER       NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  booking_id  INTEGER       NOT NULL REFERENCES bookings(id) ON DELETE CASCADE UNIQUE,
  amount      NUMERIC(10,2) NOT NULL,
  date        DATE          DEFAULT CURRENT_DATE
);

-- Helper availability (on/off work switch)
CREATE TABLE IF NOT EXISTS helper_availability (
  helper_id    INTEGER   PRIMARY KEY REFERENCES accounts(id) ON DELETE CASCADE,
  is_available BOOLEAN   DEFAULT TRUE,
  updated_at   TIMESTAMP DEFAULT NOW()
);

-- Session storage (used by connect-pg-simple)
CREATE TABLE IF NOT EXISTS "session" (
  "sid"    VARCHAR    NOT NULL COLLATE "default",
  "sess"   JSON       NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL
);
ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

-- ─── Indexes for performance ────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bookings_client   ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_helper   ON bookings(helper_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status   ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_earnings_helper   ON earnings(helper_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking   ON reviews(booking_id);
