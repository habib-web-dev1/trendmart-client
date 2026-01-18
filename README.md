# TrendMart: Full-Stack E-commerce Application

## 🌟 Project Description

**TrendMart** is a modern full-stack e-commerce application built with Next.js 16 (App Router) and Express.js. The application features a comprehensive product catalog, secure authentication, shopping cart functionality, and protected admin pages for product management. The UI is responsive and polished, built with Tailwind CSS and DaisyUI.

### ✨ Key Features

- **🔐 Authentication**: Firebase Auth with Email/Password and Google OAuth
- **🛡️ Protected Routes**: Secure access control for admin features
- **🛍️ Shopping Experience**: Product browsing, search, filtering, cart, and wishlist
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS + DaisyUI
- **⚡ Modern Stack**: Next.js 16, React 19, Express.js, MongoDB
- **🎨 Rich UI**: Toast notifications, modals, loading states, and animations
- **🔄 Real-time Updates**: Dynamic cart/wishlist with localStorage persistence

---

## 🛠️ Technologies Used

### Frontend

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library with latest features
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **DaisyUI 5.5.5** - Component library for Tailwind
- **Firebase 12.6.0** - Authentication and user management

### Backend

- **Express.js 5.1.0** - Node.js web framework
- **MongoDB 7.0.0** - NoSQL database
- **CORS** - Cross-origin resource sharing

### UI/UX Libraries

- **React Icons** - Icon library
- **Lucide React** - Modern icon set
- **SweetAlert2** - Beautiful alerts and modals
- **React Hot Toast** - Toast notifications

---

## 🗺️ Route Summary

### 🌐 Public Routes

| Route            | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| `/`              | Landing page with hero, features, testimonials, and featured products |
| `/products`      | Product catalog with search, filter, and sort functionality           |
| `/products/[id]` | Individual product details with related products                      |
| `/login`         | User authentication (email/password + Google OAuth)                   |
| `/register`      | User registration with profile setup                                  |
| `/cart`          | Shopping cart with quantity management                                |
| `/wishlist`      | Saved products for later                                              |

### 🔒 Protected Routes (Authentication Required)

| Route              | Description                                   |
| ------------------ | --------------------------------------------- |
| `/add-product`     | Form to add new products to inventory         |
| `/manage-products` | Product management dashboard with edit/delete |

### 🔌 API Endpoints (Backend)

| Method   | Endpoint             | Description                |
| -------- | -------------------- | -------------------------- |
| `GET`    | `/products`          | Fetch all products         |
| `GET`    | `/products/:id`      | Fetch single product by ID |
| `POST`   | `/products`          | Create new product         |
| `DELETE` | `/products/:id`      | Delete product by ID       |
| `POST`   | `/users`             | Save user to database      |
| `GET`    | `/users/role/:email` | Get user role              |

---

## 📋 Implemented Features

### ✅ Core Features (Fully Implemented)

- **Landing Page**: 7 sections including Hero, Features, Featured Products, Banner, Testimonials, Navbar, and Footer
- **Authentication**: Mock login with hardcoded credentials + Firebase Auth (email/password + Google)
- **Product Catalog**: Public product listing with search, category filter, and price sorting
- **Product Details**: Individual product pages with full details and related products
- **Protected Admin Pages**: Add and manage products (authentication required)
- **Shopping Cart**: Add/remove items, quantity management, localStorage persistence
- **Wishlist**: Save products for later with toggle functionality
- **Toast Notifications**: Success/error feedback for all user actions
- **Responsive Design**: Mobile-first approach with modern UI components

### 🎯 Additional Enhancements

- **User Profile Management**: Display user info in navbar with logout
- **Recently Viewed**: Track and display recently viewed products
- **Advanced Filtering**: Category-based filtering and price sorting
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **SEO Optimization**: Static generation for product pages
- **Performance**: Image optimization and lazy loading

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- Firebase project for authentication

### 1. Clone the Repository

```bash
git clone <repository-url>
cd trendmart
```

### 2. Setup Client (Frontend)

```bash
cd trendmart-client
npm install
```

Create `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### 3. Setup Server (Backend)

```bash
cd trendmart-server
npm install
```

Create `.env` file:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### 4. Run the Application

```bash
# Start the backend server
cd trendmart-server
npm run dev

# Start the frontend (in another terminal)
cd trendmart-client
npm run dev
```

Visit `http://localhost:3000` to view the application.

### 5. Demo Login (Optional)

For quick testing, you can use the demo credentials:

- **Email**: demo@trendmart.com
- **Password**: demo123

_Note: You'll need to create this user in your Firebase console or register it through the app first._

---

## 🎯 Brief Feature Explanations

### Authentication System

- **Firebase Integration**: Secure authentication with email/password and Google OAuth
- **Protected Routes**: Automatic redirection for unauthenticated users accessing admin pages
- **User Sync**: User data synchronized between Firebase and MongoDB

### Product Management

- **Dynamic Catalog**: Products fetched from Express.js API connected to MongoDB
- **Search & Filter**: Real-time search with category filtering and price sorting
- **CRUD Operations**: Full create, read, and delete functionality for products
- **Image Handling**: URL-based image storage with optimization

### Shopping Experience

- **Cart System**: Persistent shopping cart with quantity management
- **Wishlist**: Save products for later with visual feedback
- **Product Details**: Comprehensive product pages with related items
- **Responsive Design**: Optimized for all device sizes

### Admin Features

- **Product Addition**: Rich form for adding new products with validation
- **Inventory Management**: View, edit, and delete products with confirmation dialogs
- **User Management**: Backend support for user roles and permissions

---

## 🔧 Development Notes

- **Next.js App Router**: Utilizes the latest Next.js routing system
- **Server Components**: Mix of server and client components for optimal performance
- **State Management**: Context API for authentication and cart state
- **Error Boundaries**: Comprehensive error handling throughout the application
- **TypeScript Ready**: JSConfig setup for enhanced development experience
