"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title || !formData.price || !formData.category) {
      Swal.fire(
        "Warning",
        "Please fill in all required fields (Title, Price, Category).",
        "warning"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://trendmart-server-six.vercel.app/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product added successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormData({
          title: "",
          shortDescription: "",
          fullDescription: "",
          price: "",
          category: "",
          imageUrl: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      Swal.fire("Error", `Failed to add product: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        🛒 Add New Product/Item
      </h1>

      <div className="card shadow-2xl bg-base-100 p-8">
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-bold">Title *</span>
            </label>

            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-bold">
                Short Description (1-2 lines) *
              </span>
            </label>

            <input
              type="text"
              name="shortDescription"
              placeholder="A brief summary"
              className="input input-bordered w-full"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-bold">Full Description *</span>
            </label>

            <textarea
              name="fullDescription"
              placeholder="The detailed description of the product"
              className="textarea textarea-bordered h-24 w-full"
              value={formData.fullDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Price ($) *</span>
              </label>

              <input
                type="number"
                name="price"
                placeholder="e.g., 99.99"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Category *</span>
              </label>

              <input
                type="text"
                name="category"
                placeholder="e.g., Electronics, Fashion"
                className="input input-bordered w-full"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image URL </span>
              </label>

              <input
                type="url"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-control mt-8">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
