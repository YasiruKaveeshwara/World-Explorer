# World Explorer 🌍

## Project Title

**World Explorer – Discover and Save Countries**

## Overview 🧭

**World Explorer** is a full-stack MERN application that lets users explore and discover countries from around the world with stunning animated UI, intelligent filtering, search, and a favorite system. Authenticated users can save countries for later and view detailed information in a beautiful modal layout.

## Live Demo 🔗

[Visit World Explorer](https://world-explorer-chi.vercel.app)

## Features ✅

- 🌐 Explore a global list of countries
- 🔍 Live search by country name
- 🌍 Region-based filtering (Africa, Americas, etc.)
- 🔁 Sort A–Z or Z–A
- ❤️ JWT-authenticated favorite saving & removal
- 📱 Mobile-first, fully responsive layout
- ❌ 404 page with animated background
- ⚙️ Smooth performance and optimized loading

## Folder Structure 📁

### Backend (Node.js + Express + MongoDB)

```
/backend
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
├── .env
└── package.json
```

### Frontend (React + Tailwind CSS + Framer Motion)

```
/frontend
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
├── public/
└── package.json
```

## Technologies Used 🛠️

### Backend:

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Auth
- CORS
- dotenv

### Frontend:

- React
- Tailwind CSS
- Framer Motion
- Axios
- Lottie
- React Toastify
- REST Countries API

## API Routes 🧪

### Backend:

| Route                          | Method | Description                   |
| ------------------------------ | ------ | ----------------------------- |
| `/api/auth/register`           | POST   | Register new user             |
| `/api/auth/login`              | POST   | Login and get JWT token       |
| `/api/countries/favorites`     | GET    | Get user's saved favorites    |
| `/api/countries/favorites`     | POST   | Add country to favorites      |
| `/api/countries/favorites/:id` | DELETE | Remove country from favorites |

## Authentication Flow 🔒

1. User registers or logs in.
2. JWT is stored in localStorage.
3. Favorites are accessed using Bearer token.
4. Token expires? → Graceful error fallback shown.

## Getting Started 🚀

### Prerequisites:

- Node.js
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup:

```bash
cd backend
npm install
```

Create .env:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=yourStrongSecretKey
```

Start server:

```bash
npm run dev
```

### Frontend Setup:

```bash
cd ../frontend
npm install
npm run dev
```

Visit: `http://localhost:3000`

## Testing 🧪

```bash
cd backend
npm test
```

## Author 🤝

Yasiru Kaveeshwara
