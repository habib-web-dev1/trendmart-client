"use client";
import { useState, useEffect, useMemo } from "react";
import { fetchProducts } from "../lib/api";
import ItemCard from "../components/ItemCard";
import { FaSearch, FaFilter, FaSortAmountDown, FaInbox } from "react-icons/fa";

export default function ItemListPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

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

  // Optimized Search, Filter, and Sort Logic
  const processedProducts = useMemo(() => {
    // 1. Filter
    let result = allProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 2. Sort (Spread [...] creates a copy to avoid mutating state)
    const sortedResult = [...result];

    if (sortBy === "price-low") {
      sortedResult.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "price-high") {
      sortedResult.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "newest") {
      sortedResult.sort((a, b) => b._id.localeCompare(a._id));
    }

    return sortedResult;
  }, [allProducts, searchQuery, selectedCategory, sortBy]);

  const categories = [
    "All",
    ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-primary mb-4 tracking-tight uppercase">
          Explore Inventory
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          High-performance gear for modern lifestyles.
        </p>
      </header>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-center justify-between bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200">
        <div className="relative w-full lg:max-w-xs">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search gadgets..."
            className="input input-bordered w-full pl-12 rounded-xl focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full lg:w-auto">
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <FaFilter className="text-gray-400" />
            <select
              className="select select-bordered w-full md:w-40 rounded-xl"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <FaSortAmountDown className="text-gray-400" />
            <select
              className="select select-bordered w-full md:w-44 rounded-xl font-medium"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      {!loading && (
        <div className="mb-8 px-2">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
            Showing {processedProducts.length} Results
          </p>
        </div>
      )}

      {/* Product Display Area */}
      <section>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-60 w-full rounded-2xl"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        ) : processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {processedProducts.map((product) => (
              <ItemCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
            <FaInbox className="text-6xl text-gray-300 mb-4" />
            <p className="text-xl font-bold text-gray-400">
              No matching products found.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="btn btn-ghost btn-sm mt-2 text-primary"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
