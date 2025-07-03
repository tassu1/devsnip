# CodeSnip ✂️

**CodeSnip** is your personal code snippet manager — built for developers who hate losing great code. Store, organize, edit, and reuse your code snippets with ease.

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 🧩 Add, View, Edit, and Delete Snippets
- 🔍 Filter snippets by language and tags
- 📋 One-click Copy to Clipboard
- 🌙 Dark Mode Ready
- 💾 Snippets stored securely in MongoDB

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Tailwind CSS + DaisyUI
- Framer Motion (animations)
- React Toastify (notifications)

**Backend**
- Node.js + Express.js
- MongoDB (Mongoose)
- JWT Authentication

---

## 📦 Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/tassu1/codesnip.git
cd codesnip


Backend Setup
cd backend
npm install
npm run dev

Create a .env file inside /backend:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key


Frontend Setup

cd frontend
npm install
npm run dev


