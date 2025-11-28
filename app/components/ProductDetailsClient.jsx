"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaDollarSign, FaTag, FaInfoCircle } from "react-icons/fa";

import { useAuth } from "./AuthProvider";
import { fetchProductById } from "../lib/api";

export default function ProductDetailsClient({ productId }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=${window.location.pathname}`);
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!productId || authLoading || !user) return;

    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [productId, authLoading, user]);

  if (authLoading || (loading && !product)) {
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-500">Product Not Found</h1>
        <p className="text-xl text-gray-600 mt-4">
          The product does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-12">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2 flex justify-center items-center p-4 bg-base-200 rounded-xl shadow-inner">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="object-contain max-h-[500px] w-full"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <header className="mb-8 border-b pb-6 border-gray-200">
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {product.category || "Uncategorized"}
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                {product.title}
              </h1>

              <p className="mt-3 text-xl text-gray-600 max-w-4xl">
                {product.shortDesc ||
                  "Explore the features of this trendsetting product."}
              </p>
            </header>

            <div className="flex items-center space-x-6 mb-6">
              <span className="text-4xl font-bold text-primary flex items-center">
                <FaDollarSign className="text-2xl mr-1" />
                {product.price?.toFixed(2) || "N/A"}
              </span>

              <span className="badge badge-lg badge-outline text-gray-600 flex items-center">
                <FaTag className="mr-1" /> {product.category || "Uncategorized"}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
              <FaInfoCircle className="mr-2 text-primary" /> Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-8 border-l-4 border-primary pl-4">
              {product.description ||
                product.shortDesc ||
                "No detailed description available."}
            </p>

            <div className="flex gap-4">
              <button className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition duration-200">
                Add to Cart
              </button>
              <button className="btn btn-outline btn-primary btn-lg">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
