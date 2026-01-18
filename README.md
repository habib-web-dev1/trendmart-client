<div align="center">

# 🛒 TrendMart: Full-Stack E-commerce

### _A Modern Shopping Experience built with Next.js 16 & Express.js_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

[**Live Demo**](https://your-demo-url.vercel.app) | [**Client Repo**](https://github.com/habib-web-dev1/trendmart-client) | [**Server Repo**](https://github.com/habib-web-dev1/trendmart-server)

</div>

---

## 🌟 Project Description

**TrendMart** is a high-performance full-stack e-commerce application. It features a comprehensive product catalog, secure multi-method authentication, and a persistent shopping experience. Designed with a mobile-first approach, it offers a seamless interface for both customers and store administrators.

---

## ✨ Key Features

- **🔐 Secure Authentication**: Firebase Auth supporting Email/Password and Google OAuth.
- **🛡️ Admin Governance**: Protected routes for adding and managing product inventory.
- **🛍️ Seamless Shopping**: Real-time search, category filtering, and price sorting.
- **🛒 Persistent Cart**: Shopping cart and wishlist with `localStorage` persistence.
- **🎨 Modern UI**: Built with Tailwind CSS 4 and DaisyUI 5, featuring skeleton loaders and toast notifications.
- **📱 Fully Responsive**: Flawless experience across mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

| Frontend                     | Backend            | Database & Tools   |
| :--------------------------- | :----------------- | :----------------- |
| **Next.js 16** (App Router)  | **Express.js 5.1** | **MongoDB 7.0**    |
| **React 19** (Client/Server) | **Node.js**        | **Firebase Admin** |
| **Tailwind CSS 4**           | **CORS**           | **Lucide Icons**   |
| **DaisyUI 5**                | **Dotenv**         | **SweetAlert2**    |

---

## 🗺️ Navigation & API

### 🌐 Public Routes

- `/` — Landing page with Hero, Testimonials, and Featured items.
- `/products` — Full catalog with advanced search/filter.
- `/cart` & `/wishlist` — User-specific product collections.
- `/login` & `/register` — Authentication gateway.

### 🔒 Admin Routes (Auth Required)

- `/add-product` — Inventory creation form.
- `/manage-products` — Dashboard for CRUD operations.

### 🔌 Primary API Endpoints

- `GET /products` — Fetch all products.
- `POST /products` — Create new inventory (Admin).
- `DELETE /products/:id` — Remove items (Admin).
- `GET /users/role/:email` — Verify user permissions.

---

## 🚀 Setup & Installation

### 1. Clone the Repositories

```bash
git clone [https://github.com/habib-web-dev1/trendmart-client.git](https://github.com/habib-web-dev1/trendmart-client.git)
git clone [https://github.com/habib-web-dev1/trendmart-server.git](https://github.com/habib-web-dev1/trendmart-server.git)
```

---

## 🔧 Development Notes

- **⚛️ React 19 Ecosystem**: Leverages the cutting-edge features of React 19, including the `use` hook for cleaner data fetching and `startTransition` for non-blocking UI updates.
- **🚀 Optimized Performance**:
  - **Static Generation**: Product pages are pre-rendered for lightning-fast load times and SEO.
  - **Image Optimization**: Next.js `<Image />` component utilized for lazy loading and automatic resizing.
- **🧩 Component Architecture**: Built using an **Atomic Design** approach. Components are modular, reusable, and styled consistently using **DaisyUI** and **Tailwind CSS**.

---

## 📬 Contact & Support

<div align="center">

**I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ahsan-habib-coder/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/habib-web-dev1)
[![Email](https://img.shields.io/badge/Email-habibmdahsan08%40gmail.com-EE4B2B?style=for-the-badge&logo=gmail&logoColor=white)](mailto:habibmdahsan08@gmail.com)

<br/>

**Md Ahsan Habib** _MERN Stack Developer_

</div>
