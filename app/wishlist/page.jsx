"use client";
import { useCart } from "../components/CartProvider"; // Assuming wishlist logic is here
import ItemCard from "../components/ItemCard";
import Link from "next/link";
import {
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaShoppingBasket,
} from "react-icons/fa";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaHeart className="text-9xl text-base-200" />
            <FaRegHeart className="text-4xl text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
        </div>
        <h2 className="text-3xl font-black mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Save items you love here! They will be waiting for you when you're
          ready to buy.
        </p>
        <Link href="/products" className="btn btn-primary rounded-xl px-10">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <Link
            href="/products"
            className="text-primary flex items-center gap-2 mb-2 hover:underline font-medium"
          >
            <FaArrowLeft size={12} /> Back to Shopping
          </Link>
          <h1 className="text-4xl font-black tracking-tight">MY WISHLIST</h1>
          <p className="text-gray-500">{wishlist.length} items saved</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((product) => (
          <div key={product._id} className="relative group">
            {/* Remove from Wishlist Button Overlay */}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 z-20 p-3 bg-white/90 backdrop-blur shadow-md rounded-full text-red-500 transition-transform active:scale-90"
            >
              <FaHeart />
            </button>

            {/* Reuse your existing ItemCard but with extra action */}
            <div className="flex flex-col h-full">
              <ItemCard product={product} />

              <button
                onClick={() => addToCart(product, 1)}
                className="btn btn-primary btn-sm mt-2 rounded-xl gap-2 shadow-lg shadow-primary/10"
              >
                <FaShoppingBasket size={14} /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
