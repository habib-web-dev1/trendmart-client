# TrendMart: Full-Stack E-commerce Project

## 🌟 Project Description

**TrendMart** is a full-stack e-commerce application built to showcase modern web development practices using the MERN stack variations and a polished user interface. The application features public-facing pages for browsing products and protected pages for product management, secured by Firebase Authentication. The UI is clean, responsive, and consistent, built with Tailwind CSS and DaisyUI.

### Key Features:

- **User Authentication:** Secure user sign-up and login via Email/Password and Google Social Login (using Firebase Auth).
- **Protected Routes:** Restricted access to product management pages (`/add-product`, `/manage-products`).
- **Product Catalog:** Dynamically loads product data from the Express.js server and MongoDB.
- **Polished UI:** Implemented using **Tailwind CSS** and **DaisyUI** for responsiveness and clean design.
- **CRUD Operations:** Full functionality to **Create**, **Read**, and **Delete** products via API endpoints.

---

## 🛠️ Technologies Used

| Category           | Technology                       | Purpose                                                |
| :----------------- | :------------------------------- | :----------------------------------------------------- |
| **Frontend**       | **Next.js** (App Router)         | React framework for client-side rendering and routing. |
| **Styling**        | **Tailwind CSS**, **DaisyUI**    | Utility-first CSS framework and component library.     |
| **Authentication** | **Firebase Auth**                | Email/Password and Google Social Login.                |
| **Icons & Alerts** | **React Icons**, **SweetAlert2** | UI enhancements and interactive notifications.         |
| **Backend**        | **Express.js**                   | Server framework for handling API requests.            |
| **Database**       | **MongoDB**                      | NoSQL database for product data storage.               |

---

---

## 🗺️ Route Summary

### Client Routes (Frontend)

| URL                | Type          | Description                                              |
| :----------------- | :------------ | :------------------------------------------------------- |
| `/`                | Public        | Landing Page with Hero, Features, and Featured Products. |
| `/products`        | Public        | Full Product Catalog with Search and Filter UI.          |
| `/products/[id]`   | Public        | Detail Page for a specific product.                      |
| `/login`           | Public        | Login/Registration page using Firebase Auth.             |
| `/add-product`     | **Protected** | Form to submit a new product to the database.            |
| `/manage-products` | **Protected** | List of products with options to View and Delete.        |

### Server API Endpoints (Backend - `https://trendmart-server-six.vercel.app/`)

| Method   | Endpoint        | Description                                                               |
| :------- | :-------------- | :------------------------------------------------------------------------ |
| `GET`    | `/products`     | Retrieves all products from the MongoDB `products` collection.            |
| `GET`    | `/products/:id` | Retrieves a single product by its MongoDB `_id`.                          |
| `POST`   | `/products`     | Adds a new product to the database (used by `/add-product` page).         |
| `DELETE` | `/products/:id` | Deletes a product by its MongoDB `_id` (used by `/manage-products` page). |
