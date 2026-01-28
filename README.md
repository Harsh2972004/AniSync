🔗 Live Demo: https://ani-sync-8sx7.vercel.app/

# AniSync

A full-stack anime tracking web application that allows users to discover anime, manage personal watchlists, and track progress using real-time data from the AniList API.

---

## 🚀 Why I Built This

I built this project to practice building a **production-style full-stack application** using the MERN stack and GraphQL, with real authentication flows, third-party APIs, and scalable architecture.  
The goal was to move beyond CRUD demos and create something closer to what real users would use.

---

## ✨ Features

- 🔍 Search anime using AniList API
- 📈 View trending, seasonal, upcoming, and all-time popular anime
- 🔐 Authentication with:
  - Email & password
  - Google OAuth
  - AniList OAuth
- 🧾 Personal anime lists (watching, completed, planning, etc.)
- ❤️ Favorites & user-specific data stored in own database
- 🔄 Infinite scrolling for smooth browsing
- 📩 Email verification & password reset

---

## 📸 Screenshots

---

## 🛠 Tech Stack

### Frontend

- React
- Tailwind CSS
- Axios
- React Router

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- GraphQL(used to fetch and interact with AniList data)
- Passport.js (Local, Google, AniList strategies)

### Other Tools

- AniList GraphQL API
- Cloudinary (for media handling)
- Nodemailer (emails)

---

## 🧠 How It Works (Architecture)

- Anime data (search, trending, details) is fetched directly from the **AniList GraphQL API**
- User-specific data (lists, favorites, progress) is stored in my own MongoDB database
- Authentication is handled using Passport strategies
- Frontend communicates with backend via REST + GraphQL endpoints
- Infinite scrolling is implemented to improve UX and performance

---

## 🔐 Authentication & Security

- Passwords are hashed before storing
- JWT-based session handling
- Email verification before full access
- Secure cookies in production
- HTTPS enabled for secure communication

---

## ⚙️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/Harsh2972004/AniSync

# Install dependencies for frontend
cd client
npm install

# Add environment variables
cp .env.example .env

# Start the client
npm run dev

# Install dependencies for backend
cd server
npm install

# Add environment variables
cp .env.example .env

# start the server
node app.js
```

## 📚 What I Learned

- Designing a scalable backend with third-party APIs
- Implementing OAuth flows and secure authentication
- Handling infinite scroll with filters and search states
- Structuring a real-world full-stack application
