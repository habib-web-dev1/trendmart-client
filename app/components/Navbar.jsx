"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import {
  FaUserCircle,
  FaBars,
  FaPlus,
  FaTasks,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";

import Swal from "sweetalert2";
import { logout } from "../lib/firebaseConfig";
import Image from "next/image";

export default function Navbar() {
  const { user } = useAuth();
  const currentPath = usePathname();
  const pathname = usePathname();
  const isProductsActive = pathname.startsWith("/products");

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
    const isActive = currentPath === href;

    let classes = "hover:text-primary transition-colors duration-200";
    if (isActive) {
      classes += "text-primary font-semibold border-b-2 border-primary";
    }
    return classes;
  };

  const PublicLinks = (
    <>
      <li>
        <Link href="/" className={getNavLinkClass("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/products"
          className={`
      hover:text-primary transition-colors duration-200
      ${
        isProductsActive
          ? "hover:text-primary transition-colors duration-200 text-primary font-semibold border-b-2 border-primary"
          : "text-gray-700 hover:text-primary"
      }           // Default styles
    `}
        >
          Products
        </Link>
      </li>
    </>
  );

  const UserLinks = (
    <>
      <li>
        <Link href="/add-product" className={getNavLinkClass("/add-product")}>
          Add Product
        </Link>
      </li>
      <li>
        <Link
          href="/manage-products"
          className={getNavLinkClass("/manage-products")}
        >
          Manage Products
        </Link>
      </li>
    </>
  );

  const AllLinks = (
    <>
      {PublicLinks}
      {user && UserLinks}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
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
            {AllLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          <FaShoppingBag className="mr-2 text-primary" />
          TrendMart
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{AllLinks}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user.photoURL ? (
                <div className="w-10 rounded-full">
                  <Image
                    src={user.photoURL}
                    alt={user.email || "user"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <FaUserCircle className="h-6 w-6 text-primary" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                Welcome, {user.email?.split("@")[0] || "User"}
              </li>

              <li>
                <Link href="/add-product">
                  <FaPlus /> Add Product
                </Link>
              </li>
              <li>
                <Link href="/manage-products">
                  <FaTasks /> Manage Products
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          /* Login/Register Button */
          <Link href="/login" className="btn btn-primary">
            Login / Register
          </Link>
        )}
      </div>
    </div>
  );
}
