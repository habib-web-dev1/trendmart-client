<div align="center">

# 🛒 TrendMart: Full-Stack E-commerce

### _A Modern Shopping Experience built with Next.js 16 & Express.js_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

[**🌐 Live Demo**](https://trendmart-client.vercel.app) | [**Client Repo**](https://github.com/habib-web-dev1/trendmart-client) | [**Server Repo**](https://github.com/habib-web-dev1/trendmart-server)

</div>

---

## 🌟 Project Overview

**TrendMart** is a high-performance, full-stack e-commerce application that delivers a seamless shopping experience.  
It features a rich product catalog, multi-method authentication, and a persistent shopping cart. Designed with a **mobile-first approach**, TrendMart ensures an intuitive interface for both customers and administrators.

---

## ✨ Key Features

- **🔐 Secure Authentication**: Firebase Auth supporting Email/Password and Google OAuth.
- **🛡️ Admin Management**: Protected routes for adding, updating, and managing inventory.
- **🛍️ Seamless Shopping Experience**: Real-time search, category filtering, and price sorting.
- **🛒 Persistent Cart & Wishlist**: Maintains user selections via `localStorage`.
- **🎨 Modern & Responsive UI**: Tailwind CSS 4 + DaisyUI 5, with skeleton loaders and toast notifications.
- **⚡ Optimized Performance**: Fast loading with pre-rendered pages and image optimization.

---

## 🛠️ Tech Stack

| Frontend                     | Backend            | Database & Tools      |
| :--------------------------- | :---------------- | :------------------ |
| **Next.js 16** (App Router)  | **Express.js 5.1** | **MongoDB 7.0**      |
| **React 19** (Client/Server) | **Node.js**        | **Firebase Admin**   |
| **Tailwind CSS 4**           | **CORS**           | **Lucide Icons**     |
| **DaisyUI 5**                | **Dotenv**         | **SweetAlert2**      |

---

## 🗺️ Navigation & Routes

### 🌐 Public Pages

- `/` — Landing page with hero section, testimonials, and featured products.
- `/products` — Full catalog with advanced search, filter, and sort.
- `/cart` & `/wishlist` — Personalized shopping collections.
- `/login` & `/register` — Authentication pages for users.

### 🔒 Admin Pages

- `/add-product` — Add new products to inventory.
- `/manage-products` — Admin dashboard for managing products (CRUD operations).

### 🔌 Primary API Endpoints

- `GET /products` — Fetch all products.
- `POST /products` — Create a new product (Admin only).
- `PUT /products/:id` — Update a product (Admin only).
- `DELETE /products/:id` — Delete a product (Admin only).
- `GET /users/role/:email` — Check user role (Admin verification).

---

## 🚀 Setup & Installation

### 1. Clone Repositories

```bash
git clone https://github.com/habib-web-dev1/trendmart-client.git
git clone https://github.com/habib-web-dev1/trendmart-server.git
