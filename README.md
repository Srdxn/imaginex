# 🎨 Imaginex — AI-Powered Text-to-Image Generator

![Imaginex Homepage](https://github.com/Srdxn/imaginex/blob/c57c988e96d93fb2ddf8411aabe5ab02be280fe6/Home%20pg.png) 

**Imaginex** is a full-stack MERN application that allows users to generate stunning images from text prompts using the **ClipDrop AI API**. It features personalized user accounts with a credit system, seamless Razorpay payment integration, responsive design, and smooth animations powered by **Framer Motion**.

---

## 🚀 Live Demo

🔗 Try It Out Here —> [Click Here](https://srdxn.github.io/imaginex)

---

## 🔍 Features

- ✨ Generate high-quality images from any prompt using **AI**
- 🔒 Full **user authentication** (Signup / Login)
- 💳 Real-time **credit tracking** and secure transactions
- 💾 Download generated images directly to your device
- 💡 Subtle, modern **animations** with **Framer Motion**
- 📱 Fully **responsive UI** with **Tailwind CSS**

---

## 🛠️ Tech Stack

| Category     | Technology               |
|--------------|---------------------------|
| Frontend     | React, Tailwind CSS, Framer Motion |
| Backend      | Node.js, Express.js       |
| Database     | MongoDB (via Mongoose)    |
| AI Service   | ClipDrop API              |
| Payments     | Razorpay Payment Gateway  |
| Deployment   | Render (Server), GitHub Pages (Frontend) |

---


## 📚 What I Learned

- 🔐 Implementing complete **user authentication**
- 💳 Integrating **real-time payments** with Razorpay
- 🧠 Managing **credit-based features** per user
- ⚙️ Working with external APIs (ClipDrop)
- 🖼️ Designing smooth, **animated interfaces** using Framer Motion
- 🚀 Deploying a full-stack project using **Render** and **GitHub Pages**

---

## 🖼️ Screenshots

| Image Generator | Pricing & Credits |
|------------------|-------------------|
| ![ImageGen](https://github.com/Srdxn/imaginex/blob/c57c988e96d93fb2ddf8411aabe5ab02be280fe6/Generate%20Image%20pg.png)   | ![Pricing](https://github.com/Srdxn/imaginex/blob/c57c988e96d93fb2ddf8411aabe5ab02be280fe6/Pricing%20pg.png)     |

---

## 📦 Setup & Installation

```bash
# Clone the repo
git clone https://github.com/srdxn/imaginex.git
cd imaginex

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Start backend server (with nodemon)
npm run server

# Start frontend in another terminal
cd ../client
npm run dev
```

> ⚠️ **Note:** You’ll need to set up your own environment variables (`.env`) including Razorpay keys, ClipDrop API key, MongoDB URI, etc.
