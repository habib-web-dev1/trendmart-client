"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaSpinner, FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image"; // Added for better UI
import { fetchProducts } from "../lib/api";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Using a function to reload rather than a refreshKey for cleaner code
  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
      Swal.fire("Error", "Could not fetch product list.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Tailwind red-500
      cancelButtonColor: "#6B7280", // Tailwind gray-500
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // IMPORTANT: Use the environment variable instead of hardcoded link
        const baseUrl =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://trendmart-server-six.vercel.app";

        const response = await fetch(`${baseUrl}/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire("Deleted!", "Product has been removed.", "success");
          // Optimistic UI update: filter out the deleted product locally
          setProducts((prev) => prev.filter((p) => p._id !== productId));
        } else {
          throw new Error("Failed to delete");
        }
      } catch (error) {
        Swal.fire("Error", "Server error. Check CORS settings.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center h-[70vh] items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-gray-500 animate-pulse">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-base-content tracking-tight">
            Inventory Management
          </h1>
          <p className="text-gray-500">Manage your store's stock and pricing</p>
        </div>
        <Link
          href="/add-product"
          className="btn btn-primary rounded-xl shadow-lg shadow-primary/20"
        >
          <FaBoxOpen /> Add New Product
        </Link>
      </header>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
          <h2 className="text-2xl font-bold text-gray-400 text-center">
            No Products Found
          </h2>
          <Link href="/add-product" className="btn btn-ghost mt-4">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl border border-base-300">
          <table className="table w-full">
            <thead className="bg-base-200/50">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-base-200">
                          <img src={product.imageUrl} alt={product.title} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold line-clamp-1">
                          {product.title}
                        </div>
                        <div className="text-xs opacity-50 uppercase font-bold">
                          {product._id.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-medium">
                      {product.category || "General"}
                    </span>
                  </td>
                  <td className="font-bold text-primary">
                    ${product.price?.toFixed(2)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/edit-product/${product._id}`}
                        className="btn btn-square btn-sm btn-ghost hover:text-info"
                      >
                        <FaEdit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-square btn-sm btn-ghost hover:text-error"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
