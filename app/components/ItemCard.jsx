"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaDollarSign,
  FaArrowRight,
  FaTag,
  FaHeart,
  FaShoppingBasket,
} from "react-icons/fa";
import { useCart } from "./CartProvider";

export default function ItemCard({ product }) {
  const { _id, title, shortDesc, price, imageUrl, category } = product;
  const { toggleWishlist, isInWishlist, addToCart } = useCart();

  const isFavorite = isInWishlist(_id);

  return (
    <div className="group card w-full bg-base-100 border border-base-300 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/20">
      {/* Image Section */}
      <figure className="relative aspect-[4/3] overflow-hidden bg-base-200">
        <Image
          src={imageUrl || "/placeholder-image.jpg"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur shadow-sm transition-all hover:bg-white active:scale-90"
        >
          <FaHeart
            className={`text-lg ${
              isFavorite ? "text-red-500" : "text-gray-300"
            }`}
          />
        </button>

        {category && (
          <div className="absolute top-3 left-3">
            <div className="badge badge-secondary gap-1 font-medium shadow-sm">
              <FaTag className="text-[10px]" /> {category}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </figure>

      {/* Body Section */}
      <div className="card-body p-5 gap-1">
        <h2 className="card-title text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">
          {title}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] leading-relaxed">
          {shortDesc}
        </p>

        <div className="divider my-1 opacity-50"></div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-xs uppercase font-semibold text-gray-400">
              Price
            </span>
            <span className="text-2xl font-black text-primary flex items-center tracking-tight">
              <FaDollarSign className="text-lg mr-[-2px]" /> {price || "0.00"}
            </span>
          </div>

          <div className="flex gap-2">
            {/* Quick Add to Cart */}
            <button
              onClick={() => addToCart(product, 1)}
              className="btn btn-square btn-outline btn-primary btn-md rounded-xl hover:shadow-lg transition-all"
              title="Add to Cart"
            >
              <FaShoppingBasket />
            </button>

            {/* View Details */}
            <Link
              href={`/products/${_id}`}
              className="btn btn-primary btn-md rounded-xl px-4 group/btn shadow-lg shadow-primary/20 transition-all"
            >
              Details
              <FaArrowRight className="ml-1 text-xs transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
