import AuthProvider from "./components/AuthProvider";
import { CartProvider } from "./components/CartProvider"; // Import this
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast"; // npm install react-hot-toast
import "./globals.css";

export const metadata = {
  title: "TrendMart | Next.js Full-Stack E-commerce Solution",
  description:
    "A modern shopping solution featuring secure authentication and robust management tools.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          <CartProvider>
            <Toaster position="bottom-right" />
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
