import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaShoppingBag,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer flex flex-col md:flex-row md:justify-between bg-neutral text-neutral-content p-10 mt-10">
      <aside>
        <div className="flex items-center text-3xl font-bold">
          <FaShoppingBag className="mr-2 text-primary" />
          <span className="text-white">TrendMart</span>
        </div>
        <p className="mt-4">
          TrendMart Industries Ltd.
          <br />
          Providing reliable tech since 2024.
        </p>
        <p className="mt-2 text-sm">
          Copyright © {currentYear} - All rights reserved.
        </p>
      </aside>

      <nav>
        <h6 className="footer-title">Quick Links</h6>
        <Link href="/" className="link link-hover">
          Home
        </Link>
        <Link href="/items" className="link link-hover">
          Shop All
        </Link>
        <Link href="/add-product" className="link link-hover">
          Sell With Us
        </Link>
        <Link href="/login" className="link link-hover">
          Account
        </Link>
      </nav>

      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About Us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press Kit</a>
      </nav>

      <nav>
        <h6 className="footer-title">Legal & Social</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>

        <div className="grid grid-flow-col gap-4 mt-2">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-primary transition-colors duration-200"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-primary transition-colors duration-200"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-primary transition-colors duration-200"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-primary transition-colors duration-200"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </nav>
    </footer>
  );
}
