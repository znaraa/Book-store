# 📚 Book Store

A simple, full-stack Book Store app where you can create, read, update, and delete (CRUD) books. Deployed on Vercel.

**Live Demo:** https://book-store-t3ai.vercel.app

---

## ✨ Features

- Add new books with title, author, and year
- Edit/update existing books
- Delete books
- List all books
- Basic validation & error handling
- Ready for cloud deployment

---

## 🧰 Tech Stack

- **Frontend:** React (Vite or CRA), Fetch/Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Deployment:** Vercel (frontend), any Node host for API (Render/Railway/Vercel serverless)

> If your API is also on Vercel (serverless functions) or in a separate `server` folder, see the **Project Structure** and **Environment Variables** below.

---
1. **Clone repo**
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
# frontend
cd client
npm install

# backend
cd ../server
npm install

# start backend
cd server
npm run dev

# start frontend
cd ../client
npm run dev


