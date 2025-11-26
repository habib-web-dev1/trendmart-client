"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { fetchProducts } from "../lib/api";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products for management:", error);
        Swal.fire("Error", "Could not fetch product list.", "error");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [refreshKey]);

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/products/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          Swal.fire("Deleted!", "The product has been removed.", "success");

          setRefreshKey((prev) => prev + 1);
        } else {
          throw new Error("Failed to delete product on the server.");
        }
      } catch (error) {
        console.error("Deletion Error:", error);
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-500">
          No Products to Manage
        </h1>
        <p className="mt-4">
          Please add new products via the Add Product page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Manage Products ({products.length})
        </h1>
        <Link href="/add-product" className="btn btn-primary">
          + Add New Product
        </Link>
      </header>

      <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="font-semibold">{product.title}</td>
                <td>{product.category || "N/A"}</td>
                <td>${product.price?.toFixed(2)}</td>
                <td className="flex space-x-2">
                  <Link
                    href={`/edit-product/${product._id}`}
                    className="btn btn-sm btn-info text-white"
                  >
                    <FaEdit /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
