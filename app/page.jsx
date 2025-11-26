"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBolt,
  FaShieldAlt,
  FaHeadset,
  FaShoppingBag,
  FaStar,
  FaQuoteRight,
} from "react-icons/fa";
import { fetchProducts } from "./lib/api";
import ItemCard from "./components/ItemCard";

const HeroSection = () => (
  <div
    className="hero min-h-[70vh] bg-cover bg-center"
    style={{
      backgroundImage: "url(https://i.ibb.co.com/Gf5ZQq12/table.png)",
    }}
  >
    <div className="hero-overlay bg-opacity-70 bg-gray-900"></div>
    <div className="hero-content text-center text-neutral-content py-16">
      <div className="max-w-3xl">
        <h1 className="mb-5 text-5xl md:text-6xl font-extrabold leading-tight">
          Discover the <span className="text-primary">Next Big Thing</span> in
          Tech
        </h1>
        <p className="mb-8 text-xl">
          Curated selection of the hottest gadgets and essentials for the modern
          lifestyle.
        </p>
        <Link
          href="/products"
          className="btn btn-primary btn-lg shadow-lg hover:shadow-xl"
        >
          Shop All Products
        </Link>
      </div>
    </div>
  </div>
);

//  Feature Section
const FeatureSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Why Choose TrendMart?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: FaBolt,
            title: "Blazing Fast Shipping",
            desc: "Get your order in 1-3 business days guaranteed.",
          },
          {
            icon: FaShieldAlt,
            title: "Secure Payments",
            desc: "100% encrypted and safe transactions for peace of mind.",
          },
          {
            icon: FaHeadset,
            title: "24/7 Premium Support",
            desc: "Our dedicated team is ready to assist you anytime.",
          },
          {
            icon: FaShoppingBag,
            title: "Quality Guaranteed",
            desc: "Hand-picked, high-quality products only.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="group card bg-base-100 shadow-lg border-t-4 border-primary/50 p-6 text-center
                       transition-all duration-500 hover:border-primary hover:shadow-2xl
                       hover:bg-gradient-to-br from-primary/5 to-base-100"
          >
            <div className="flex justify-center mb-4">
              <feature.icon className="w-10 h-10 text-primary transition-colors duration-500 group-hover:text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedItemsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();

      setProducts(data.slice(0, 6));
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Our Bestsellers
        </h2>

        {loading ? (
          <div className="flex justify-center h-48 items-center">
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ItemCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-lg btn-secondary">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

const BannerSection = () => (
  <section className="py-20 bg-accent text-accent-content">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
        Don't Miss Out on Exclusive Deals!
      </h2>
      <p className="text-xl mb-8">
        Sign up for our newsletter and get 15% off your first purchase.
      </p>
      <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-accent">
        Subscribe Now
      </button>
    </div>
  </section>
);

const TestimonialSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            quote:
              "The best quality gadgets I've found online. Fast shipping and excellent support!",
            author: "Alex R.",
          },
          {
            quote:
              "TrendMart is my go-to for all new tech releases. Highly recommend the Smartwatch Pro X.",
            author: "Sam K.",
          },
          {
            quote:
              "Consistent product quality and a beautiful, easy-to-use website. A five-star experience.",
            author: "Jia L.",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="card border border-base-300 p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/50"
          >
            <FaQuoteRight className="w-6 h-6 text-primary mb-4 opacity-70" />
            <p className="italic mb-4 text-gray-700">"{testimonial.quote}"</p>
            <div className="flex items-center justify-between">
              <div className="flex text-yellow-500">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="text-yellow-300" />
              </div>
              <p className="font-semibold text-right text-gray-800">
                — {testimonial.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <FeaturedItemsSection />
      <BannerSection />
      <TestimonialSection />
    </>
  );
}
