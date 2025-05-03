# World Explorer 🌍

## Project Title
**World Explorer – Discover and Save Countries**

## Overview 🧭
**World Explorer** is a full-stack web application that allows users to explore countries around the world with animated UI, region-based filtering, sorting (A–Z / Z–A), and favorite management. Authenticated users can save countries to their favorites and view them later. It uses the REST Countries API for data and MongoDB to store user favorites.

## Live Demo 🔗
[Visit World Explorer](https://your-deployed-url.com)

## Folder Structure 📁

### Backend (Node.js + Express + MongoDB) 🔧
```
/backend
├── controllers/
│   └── authController.js
│   └── favoriteController.js
├── models/
│   └── User.js
│   └── Favorite.js
├── routes/
│   └── authRoutes.js
│   └── favoriteRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── .env
├── server.js
└── package.json
```

### Frontend (React + Tailwind CSS + Framer Motion) 💻
```
/frontend
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Navbar.jsx
│   │   └── SearchBar.jsx
│   │   └── FilterDropdown.jsx
│   │   └── Loader.jsx
│   │   └── CountryCard.jsx
│   │   └── CountryDetailsModal.jsx
│   ├── pages/
│   │   └── Home.jsx
│   │   └── Login.jsx
│   │   └── Register.jsx
│   │   └── Favorites.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   ├── main.jsx
├── public/
│   └── images/
│   │   └── regions/ 
└── package.json
```

## Technologies Used 🛠️

### Backend:
* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* CORS
* dotenv

### Frontend:
* React.js (Vite)
* Tailwind CSS
* Framer Motion
* Axios
* Lottie
* React Toastify
* REST Countries API

## Features ✅
* 🌐 Explore all countries visually
* 🔍 Search by name
* 🌍 Filter by region (Africa, Americas, etc.)
* 🔁 Sort countries (A–Z, Z–A)
* ❤️ Save favorites (JWT protected)
* 👤 Auth system (Register / Login)
* 📱 Fully responsive & animated UI
* ❌ 404 Not Found with themed background
* 💡 Modern UI (glassmorphism, smooth animations)

## Authentication Flow 🔒
1. User registers and logs in using email/password.
2. JWT token is stored in `localStorage`.
3. Protected routes (like `/favorites`) are guarded.
4. Token is sent in `Authorization` header to access/modify favorites.

## API Routes 🧪

### Backend API:
| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login and get JWT token |
| `/api/countries/favorites` | GET | Get all user's favorites |
| `/api/countries/favorites` | POST | Add a country to favorites |
| `/api/countries/favorites/:id` | DELETE | Remove from favorites |

## Getting Started 🚀

### Prerequisites 📦
* Node.js
* MongoDB
* npm or yarn

### Setup Instructions 🔧

```bash
# Clone the repository
git clone https://github.com/your-username/world-explorer.git
cd world-explorer

# Install backend dependencies
cd backend
npm install

# Configure environment variables
touch .env
# Add:
# MONGO_URI=your_mongo_connection
# JWT_SECRET=your_jwt_secret
# PORT=5000

# Start backend server
npm run dev
```

```bash
# In a new terminal, setup frontend
cd ../frontend
npm install

# Start frontend
npm run dev
```

Visit: `http://localhost:3000` 

### Environment Variables (Backend) 💡
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/world-explorer
JWT_SECRET=yourStrongSecretKey
```

## Testing 🧪
Use Postman or built-in UI to test endpoints. Protected routes require a Bearer token.

## Auther 🤝
Yasiru Kaveeshwara
