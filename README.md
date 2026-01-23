# online-voting-platform
A full-stack Online Voting Platform built using React (Vite), Node.js, Express, MongoDB, and JWT authentication, with support for:

-> Email & Password authentication
-> Google OAuth 2.0
-> LinkedIn OAuth
-> Secure voting (one vote per user)
-> Real-time candidate & voter data

🚀 Tech Stack
Frontend
-> React (Vite + TypeScript)
-> React Router
-> Axios
-> Tailwind CSS

Backend
-> Node.js
-> Express.js
-> MongoDB (Mongoose)
-> Passport.js
-> JWT Authentication

Authentication
-> Email & Password
-> Google OAuth 2.0
-> LinkedIn OAuth

📁 Project Structure

online-voting-platform/
│
├── online-voting-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
├── online-voting-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── config/
│   ├── .env
│   └── package.json

🔧 Backend Setup (LOCAL)

1️⃣ Install dependencies

cd online-voting-backend
npm install

2️⃣ Create .env file

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/voting_app

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

3️⃣ Start backend server

npm run dev
Backend runs at: http://localhost:5000

🎨 Frontend Setup (LOCAL)

1️⃣ Install dependencies
cd online-voting-frontend
npm install

2️⃣ Create .env file
VITE_API_URL=http://localhost:5000/api

3️⃣ Start frontend

npm run dev
Frontend runs at: http://localhost:5173

🔐 Google OAuth Setup (LOCAL)

Google Cloud Console → OAuth Client
Authorized JavaScript Origins
http://localhost:5173
Authorized Redirect URIs
http://localhost:5000/api/auth/google/callback
⚠️ Remove all production URLs while testing locally.

🔐 LinkedIn OAuth Setup (LOCAL)

LinkedIn Developer Portal
Authorized Redirect URL
http://localhost:5000/api/auth/linkedin/callback

🛡️ Security Features

JWT-based authentication
Protected routes with middleware
Password hashing using bcrypt
OAuth handled securely via Passport

🗳️ Voting Rules

A user can vote only once
Vote status (hasVoted) is enforced from backend
Voter list visible only after voting
