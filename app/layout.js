import AuthProvider from "./components/AuthProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
export const metadata = {
  title: "TrendMart | Next.js Full-Stack E-commerce Solution",
  description:
    "A modern shopping solution featuring secure user authentication, public product browsing, and robust admin management tools.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
