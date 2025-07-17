"use client";
import { useEffect, useState } from "react";
import { getAllProducts, Product } from "../lib/api";
import ProductCard from "../components/ProductCard";
import CategoryGrid from "../components/CategoryGrid";

const mockCategories = [
  { name: "Drinkware", icon: "🍵" },
  { name: "Bags", icon: "👜" },
  { name: "Stationery", icon: "📒" },
  { name: "Home", icon: "🏡" },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Grid */}
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      {/* Category Section */}
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <CategoryGrid categories={mockCategories} />
    </div>
  );
}
