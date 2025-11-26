"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "../lib/api";
import ItemCard from "../components/ItemCard";

export default function ItemListPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center h-64 items-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      );
    }

    if (allProducts.length === 0) {
      return (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-500">
            No products found in the database.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allProducts.map((product) => (
          <ItemCard key={product._id || product.title} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-primary mb-3">
          Explore TrendMart
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our curated catalog of high-quality, trendsetting gadgets and
          gear.
        </p>
      </header>

      <section className="mt-8">{renderContent()}</section>
    </div>
  );
}
