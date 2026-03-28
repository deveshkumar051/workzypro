require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { pool } = require('./config/db');
const routes = require('./routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// ─── Security ────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ─── CORS ─────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    process.env.HELPER_URL || 'http://localhost:5174',
    "https://pound-estimates-incoming-lamb.trycloudflare.com",
    "https://eleven-compile-continuous-added.trycloudflare.com"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Body Parsing ─────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Logging ──────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// ─── Session ──────────────────────────────────────────────
app.use(session({
  store: new pgSession({
    pool,
    tableName: 'session',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'workzy_dev_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
}));

// ─── Health Check (before routes) ─────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Root ─────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'Workzy Platform API',
    status: 'running',
    version: '1.0.0',
    team: {
      developer: 'Devesh Kumar',
      marketing: 'Harshit Nama',
    },
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth/me',
    },
  });
});

// ─── API Routes ───────────────────────────────────────────
app.use('/api', routes);

// ─── Error Handler (must be last) ─────────────────────────
app.use(errorMiddleware);

module.exports = app;
