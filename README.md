# Workzy Platform

A full-stack home services marketplace connecting customers with trusted local helpers.

**Team:**
- **Devesh Kumar** — Developer
- **Harshit Nama** — Marketing

---

## 🎨 Design Theme
Spotify Dark — `#121212` background · `#000000` sidebar · `#181818` cards · `#1DB954` accent

---

## 🏗 Architecture

```
frontend-client/   → Customer website  (React + Vite, port 5173)
frontend-helper/   → Helper dashboard  (React + Vite, port 5174)
backend/           → REST API          (Node.js + Express, port 5000)
```

---

## 🚀 Local Setup (Step by Step)

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### 1. Database
```bash
# Create database
psql -U postgres -c "CREATE DATABASE workzy;"

# Run schema
psql -U postgres -d workzy -f backend/database/schemas/schema.sql

# Seed services
psql -U postgres -d workzy -f backend/database/seeds/services.sql
```

### 2. Backend
```bash
cd backend
# .env is already configured for local use
npm install
npm run dev
# → http://localhost:5000
```

### 3. Client Frontend
```bash
cd frontend-client
# .env already set to http://localhost:5000
npm install
npm run dev
# → http://localhost:5173
```

### 4. Helper Frontend
```bash
cd frontend-helper
# .env already set to http://localhost:5000
npm install
npm run dev
# → http://localhost:5174
```

---

## 🔑 Environment Variables

**backend/.env** (already configured):
```
DATABASE_URL=postgresql://postgres:qwert123@localhost:5432/workzy
SESSION_SECRET=workzy_local_dev_secret_change_in_prod_2025
CLIENT_URL=http://localhost:5173
HELPER_URL=http://localhost:5174
PORT=5000
NODE_ENV=development
```

**frontend-client/.env** and **frontend-helper/.env**:
```
VITE_API_URL=http://localhost:5000
```

---

## 🖼 Logos
All logos are in `public/logo/`:
- `BadgeLogo.png` — Used as favicon + sidebar icon
- `BrandmarkLogo.png` — Used in page loader
- `HorizontalLogo.jpg` — Used in navbar, footer, login/register pages
- `MascotLogo.png` — Available for marketing use

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login |
| POST | /api/auth/logout | Logout |
| GET | /api/auth/me | Session check |
| GET | /api/services | All services |
| GET | /api/helpers | Search helpers |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/my | Client bookings |
| GET | /api/bookings/jobs | Helper jobs |
| PATCH | /api/bookings/:id/status | Update job status |
| GET | /api/earnings | Helper earnings |
| GET | /api/notifications | Notifications |
| PATCH | /api/notifications/read-all | Mark all read |
| GET | /api/availability | Helper availability |
| PATCH | /api/availability | Toggle availability |
