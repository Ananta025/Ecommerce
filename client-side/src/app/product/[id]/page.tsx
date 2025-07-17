'use client';
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById, Product } from "../../../lib/api"; 
import ProductGallery from "../../../components/ProductGallery";
import Button from "../../../components/Button";
import { useCartStore } from "../../../lib/cartStore";
import toast from "react-hot-toast";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  console.log('Product page id:', id);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const add = useCartStore((s) => s.add);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    getProductById(id)
      .then((prod) => {
        setProduct(prod);
        console.log('Fetched product:', prod);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    add({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success("Added to cart!");
  }

  function handleBuyNow() {
    if (!product) return;
    add({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    router.push("/checkout");
  }

  if (loading) return <div className="p-8">Loading...</div>;
  if (error || !product) return <div className="p-8 text-red-600">{error || "Product not found."}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <ProductGallery images={[product.image]} title={product.name} />
      {/* Product Info */}
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-forest-accent">{product.name}</h1>
        <div className="text-2xl font-bold text-forest-secondary">₹{product.price}</div>
        <div className="text-sm font-medium">
          <span className="text-green-600">In Stock</span>
        </div>
        <p className="text-forest-soft leading-relaxed">{product.description}</p>
        <div className="flex gap-4 mt-4">
          <Button onClick={handleAddToCart}>Add to Cart</Button>
          <Button onClick={handleBuyNow}>Buy Now</Button>
        </div>
      </div>
    </div>
  );
} 