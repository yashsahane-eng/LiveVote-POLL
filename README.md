# Real-Time Poll Rooms

A full-stack web application that allows users to create live polls, share them via a link, and watch votes update instantly in real time.
Built to demonstrate real-time communication, fairness controls, and full production deployment.

---

## 🌐 Live Demo

**Public App URL:**
https://live-vote-poll.vercel.app

**Backend API:**
https://livevote-poll.onrender.com/health

---

## 📌 Objective

This project implements a real-time polling system where users can:

* Create a poll with multiple options
* Share a unique link with others
* Vote once on a poll
* See results update live without refreshing

The focus was on correctness, simplicity, and real-time synchronization.

---

## 🧱 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Socket.IO Client
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Socket.IO

### Deployment

* Frontend → Vercel
* Backend → Render

---

## ✅ Features (Assignment Success Criteria)

### 1. Poll Creation

Users can create a poll with:

* One question
* Minimum two options

After creation, the system generates a unique shareable link:

```
/poll/:pollId
```

---

### 2. Join by Link

Anyone with the link can:

* Open the poll
* Vote on one option (single-choice)

No account or login required.

---

### 3. Real-Time Results

When a vote occurs:

```
Backend updates MongoDB
→ Socket.IO emits event
→ All connected clients update instantly
```

Real-time communication is implemented using **Socket.IO rooms** based on poll IDs.

---

### 4. Fairness / Anti-Abuse Controls

Two mechanisms were implemented to reduce repeated or abusive voting:

#### ✅ Mechanism 1 — LocalStorage Vote Lock (Client-Side)

* Each poll stores a `voted_polls` key in localStorage.
* Prevents multiple submissions from the same browser session.

**Prevents:**

* Rapid repeat clicks
* Page refresh vote spam

**Limitation:**

* Can be bypassed by clearing browser storage.

---

#### ✅ Mechanism 2 — Server-Side Voter Tracking (IP Logging)

* Backend records voter identifiers for monitoring duplicate attempts.
* Helps identify suspicious voting patterns.

**Prevents:**

* Basic repeated voting attempts from same network.

**Known Limitation:**

* Mobile networks often share IP addresses (carrier NAT), so strict blocking was relaxed to avoid preventing legitimate users.

---

### 5. Persistence

All polls and votes are stored in MongoDB:

* Refreshing the page retains data.
* Share links remain valid long-term.
* Poll results are retrieved using poll IDs.

---

### 6. Deployment

The application is publicly accessible:

* Frontend deployed on **Vercel**
* Backend deployed on **Render**
* Real-time sockets operate over secure WebSocket connections (WSS).

---

## ⚠️ Edge Cases Handled

* Invalid poll ID handling
* Duplicate vote prevention (client side)
* Invalid option index validation
* Empty poll option prevention
* Rapid multi-click vote protection
* Backend cold start delays (Render free tier)

---

## 🚧 Known Limitations

* IP-based fairness is imperfect on shared networks.
* No authentication system (anonymous voting).
* Poll creator cannot edit/delete polls yet.
* UI error messages could be expanded further.

---

## 🔮 Possible Improvements

* Add user authentication for stronger fairness control.
* Poll expiration timers.
* Result analytics dashboard.
* Animated vote transitions.
* Rate limiting middleware.
* Poll creator admin controls.

---

## 🗂️ Project Structure

```
realtime-poll-rooms/
 ├── Backend/
 │    ├── controllers/
 │    ├── models/
 │    ├── routes/
 │    └── server.js
 │
 └── Frontend/frontend/
      ├── src/
      │    ├── context/
      │    └── pages/
      └── vite.config.js
```

---

## ▶️ Local Development

### Backend

```
cd Backend
npm install
npm run dev
```

### Frontend

```
cd Frontend/frontend
npm install
npm run dev
```

Create `.env` in frontend:

```
VITE_API_URL=http://localhost:5000
```

---

## 🧠 Design Notes

This project prioritizes:

* Simplicity over over-engineering
* Real-time responsiveness
* Practical fairness controls
* Clean separation between frontend and backend

The architecture uses Socket.IO rooms so only users viewing a specific poll receive updates, reducing unnecessary traffic.

---

## 📄 License

This project was built for educational and evaluation purposes.
