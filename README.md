# 📒 Journal App — React Version

A personal journal web application built with **React + Vite**, connected to a **Spring Boot** backend with JWT authentication and MongoDB Atlas.

This is a rebuild of the original [vanilla JS version](https://github.com/Vedansh-Paliwal/journal-app-vanilla) *(update link)*, rewritten in React as a component-based SPA.

---

## 🚀 Features

### 🔐 Authentication
- User Signup and Login
- JWT stored in `localStorage`
- Auto-redirect to login if token is missing or expired

### 📘 Journal Management
- View all journal entries
- Create new entries
- Update existing entries
- Delete entries

### 👤 Profile Management
- Edit username
- Change password (expandable section)
- Delete account
- Frontend validation for password mismatch

### 📱💻 Responsive UI
- Navbar with hover dropdowns on desktop
- Hamburger menu with overlay on mobile
- Body scroll locked when mobile menu is open

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite |
| **Styling** | CSS Modules |
| **Backend** | Spring Boot (JWT, MongoDB Atlas) |
| **Deployment** | Netlify (frontend), Render (backend) |

---

## 🔗 Backend API

Base URL (Production):
```
https://journal-app-backend-soa3.onrender.com
```

> ⚠️ Hosted on Render's free plan — first request may take ~30 seconds to wake up.

### Endpoints

| Method | Endpoint | Auth Required |
|--------|----------|---------------|
| POST | `/public/signup` | No |
| POST | `/public/login` | No |
| GET | `/journal` | Yes |
| POST | `/journal` | Yes |
| PUT | `/journal/id/{id}` | Yes |
| DELETE | `/journal/id/{id}` | Yes |
| GET | `/user` | Yes |
| PUT | `/user` | Yes |
| DELETE | `/user` | Yes |

All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📁 Project Structure

```
src/
├── main.jsx
├── Parent.jsx         # Auth routing logic
├── Dashboard.jsx      # Section switcher
├── Navbar.jsx
├── Home.jsx
├── Entries.jsx        # View, edit, delete entries
├── NewEntry.jsx       # Create / update entry
├── EditProfile.jsx    # Edit username, password, delete account
└── *.module.css       # Component-scoped styles
```

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

> Make sure the backend is running locally at `http://localhost:8080`, or update the URL constants in each component to point to the production backend.

---

## 🌍 Deployment

| Part | Platform | Status |
|------|----------|--------|
| Frontend | Netlify | *(add live URL here)* |
| Backend | Render | ✔️ Live |

---

## 🔒 Security Notes
- JWT stored in `localStorage` (sufficient for a learning/portfolio project)
- No secrets on the frontend
- All auth enforced by the backend
- Unauthorized requests auto-redirect to login

---

## 📄 License
Open-source. Free to use for learning or portfolio purposes.