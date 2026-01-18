"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useCart } from "./CartProvider"; // Import the Cart/Wishlist context
import {
  FaUserCircle,
  FaBars,
  FaPlus,
  FaTasks,
  FaSignOutAlt,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { logout } from "../lib/firebaseConfig";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();
  const { cartCount, wishlist } = useCart(); // Get counts from Context
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire("Success", "Logged out successfully!", "success");
    } catch (error) {
      console.error("Logout failed:", error);
      Swal.fire("Error", "Failed to log out.", "error");
    }
  };

  const getNavLinkClass = (href) => {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));
    return `hover:text-primary transition-colors duration-200 ${
      isActive
        ? "text-primary font-bold border-b-2 border-primary"
        : "text-gray-700"
    }`;
  };

  const NavLinks = (
    <>
      <li>
        <Link href="/" className={getNavLinkClass("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/products" className={getNavLinkClass("/products")}>
          Products
        </Link>
      </li>
      {user && (
        <>
          <li>
            <Link
              href="/add-product"
              className={getNavLinkClass("/add-product")}
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              href="/manage-products"
              className={getNavLinkClass("/manage-products")}
            >
              Manage
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-2 lg:px-8">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBars className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {NavLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl font-bold gap-2">
          <FaShoppingBag className="text-primary" />
          <span className="hidden sm:inline">TrendMart</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">
          {NavLinks}
        </ul>
      </div>

      <div className="navbar-end gap-2 md:gap-4">
        {/* Wishlist Link */}
        <Link
          href="/wishlist"
          className="btn btn-ghost btn-circle relative"
          title="Wishlist"
        >
          <div className="indicator">
            <FaHeart className="h-5 w-5 text-gray-600" />
            {wishlist?.length > 0 && (
              <span className="badge badge-xs badge-secondary indicator-item font-bold">
                {wishlist.length}
              </span>
            )}
          </div>
        </Link>

        {/* Cart Link */}
        <Link
          href="/cart"
          className="btn btn-ghost btn-circle relative"
          title="Cart"
        >
          <div className="indicator">
            <FaShoppingCart className="h-5 w-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="badge badge-xs badge-primary indicator-item font-bold">
                {cartCount}
              </span>
            )}
          </div>
        </Link>

        {/* Auth Profile Section */}
        {user ? (
          <div className="dropdown dropdown-end ml-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden"
            >
              {user.photoURL ? (
                <div className="w-10">
                  <Image
                    src={user.photoURL}
                    alt="profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ) : (
                <FaUserCircle className="h-8 w-8 text-primary" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-2xl w-56 border border-base-200"
            >
              <li className="px-4 py-2 border-b border-base-200 mb-2">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">
                  Account
                </span>
                <span className="font-semibold truncate">{user.email}</span>
              </li>
              <li>
                <Link href="/add-product">
                  <FaPlus /> Add Product
                </Link>
              </li>
              <li>
                <Link href="/manage-products">
                  <FaTasks /> My Inventory
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <a onClick={handleLogout} className="text-error font-semibold">
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary rounded-xl px-6">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
