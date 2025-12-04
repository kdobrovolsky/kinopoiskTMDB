# 🎬 Kinopoisk TMDB — Movie Explorer

A modern movie discovery app built with **React**, **TypeScript**, **RTK Query**, and **Feature-Sliced Design**, styled with **CSS Modules** and deployed to **Vercel**.

👉 **Live Demo:**  
https://pet-project-kinopoisk.vercel.app/

---

## 🌟 Features

- 🔎 Browse movie categories (Popular, Trending, Top Rated)  
- 🎯 Advanced filters: genres, rating range, sorting  
- 📱 Fully responsive and adaptive layout  
- 🧩 Mobile-friendly filter panel  
- 🎥 Movie details: description, cast, trailers, similar movies  
- 💡 Light / Dark mode  
- ⚡ Skeleton loading states  
- 🚀 Super-fast API requests via RTK Query  
- 🎞 Pagination, loading states and error handling  
- 📦 Clean architecture via FSD  

---

## 🛠 Tech Stack

### **Core**
- **React 19**
- **TypeScript**
- **React Router v7**
- **Redux Toolkit**
- **RTK Query**

### **Styling**
- **CSS Modules**
- **Adaptive / Responsive layout**
- **Skeleton loading**

### **Architecture**
- **Feature-Sliced Design (FSD)**
- Entities, Features, Widgets, Pages, Shared

### **Tooling**
- **Vite**
- **Prettier**
- **ESLint**
- **pnpm**
- **Vercel Deployment**

### **Other libraries**
- **React Hook Form**
- **React Toastify**
- **React Loading Skeleton**
- **MUI (partial usage)**

---

## 🧱 Project Architecture (FSD)

src/
├── app/ # App initialization, router, providers
├── pages/ # Route-level pages
├── widgets/ # UI blocks (Header, FilterPanel, Footer, etc.)
├── features/ # Logic of user interactions (filters, sorting)
├── entities/ # Business entities (Movie, Genre)
└── shared/ # UI components, helpers, API, config

---

## 🚀 Getting Started

```bash
git clone https://github.com/USERNAME/REPO.git
cd REPO
pnpm install
pnpm run dev
