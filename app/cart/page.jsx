"use client";
import { useCart } from "../components/CartProvider";
import Link from "next/link";
import Image from "next/image";
import { FaTrash, FaArrowRight, FaShoppingBag } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, addToCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-base-200 rounded-full">
            <FaShoppingBag className="text-6xl text-gray-300" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/products" className="btn btn-primary px-8">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black mb-10 uppercase tracking-tight">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl border border-base-200 shadow-sm transition-hover hover:shadow-md"
            >
              <div className="relative w-32 h-32 flex-shrink-0 bg-base-100 rounded-xl overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{item.category}</p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <span className="text-lg font-bold text-primary">
                    ${item.price}
                  </span>
                  <span className="text-gray-400">×</span>
                  <span className="font-semibold">{item.quantity}</span>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-3">
                <p className="text-xl font-black">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-base-200 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-success font-semibold">Free</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between items-center text-2xl font-black">
                <span>Total</span>
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg w-full rounded-2xl shadow-lg shadow-primary/20 group">
              Checkout Now
              <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <span className="p-1 px-2 border rounded">Visa</span>
              <span className="p-1 px-2 border rounded">MasterCard</span>
              <span className="p-1 px-2 border rounded">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
