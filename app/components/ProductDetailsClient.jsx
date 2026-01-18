"use client";
import { useState, useEffect } from "react";
import { useCart } from "./CartProvider";
import ItemCard from "./ItemCard";
import { FaShoppingCart, FaHeart, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function ProductDetailsClient({ productId }) {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        setLoading(true);
        // 1. Fetch main product
        const res = await fetch(
          `https://trendmart-server-six.vercel.app/products/${productId}`
        );
        const data = await res.json();
        setProduct(data);

        // 2. Fetch all products to filter "Related"
        const allRes = await fetch(
          `https://trendmart-server-six.vercel.app/products`
        );
        const allData = await allRes.json();

        const filteredRelated = allData
          .filter((p) => p.category === data.category && p._id !== productId)
          .slice(0, 4);
        setRelated(filteredRelated);

        // 3. Save to "Recently Viewed" in LocalStorage
        saveToRecent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFullData();
  }, [productId]);

  const saveToRecent = (prod) => {
    const recent = JSON.parse(localStorage.getItem("recent-products") || "[]");
    const filtered = recent.filter((p) => p._id !== prod._id);
    const updated = [prod, ...filtered].slice(0, 4); // Keep last 4
    localStorage.setItem("recent-products", JSON.stringify(updated));
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!product)
    return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/products" className="btn btn-ghost mb-8">
        <FaArrowLeft /> Back to Shop
      </Link>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="bg-base-200 rounded-3xl overflow-hidden flex justify-center p-8">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="max-h-[500px] object-contain hover:scale-105 transition-transform"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="badge badge-primary mb-2">{product.category}</span>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-2xl font-black text-primary mb-6">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="flex gap-4">
            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary flex-1 gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`btn btn-outline ${
                isInWishlist(product._id) ? "btn-secondary" : ""
              }`}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="mt-20 border-t pt-16">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ItemCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
