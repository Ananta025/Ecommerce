'use client'; 
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import { useCartStore } from "../../lib/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="flex flex-col gap-6 mb-8">
        {items.length === 0 ? (
          <div className="text-forest-soft">Your cart is empty.</div>
        ) : (
          items.map((item) => <CartItem key={item.id} item={item} />)
        )}
      </div>
      <div className="flex items-center justify-between border-t border-forest-soft pt-6 mb-6">
        <span className="font-semibold text-lg">Subtotal</span>
        <span className="text-xl font-bold text-forest-accent">₹{subtotal}</span>
      </div>
      <Button href="/checkout" className="w-full">Proceed to Checkout</Button>
    </div>
  );
} 