'use client';
import { useState } from "react";
import Button from "../../components/Button";
import { useCartStore } from "../../lib/cartStore";
import { useRouter } from "next/navigation";
import { createOrder } from "../../lib/api";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [invoiceType, setInvoiceType] = useState("A4");
  const [error, setError] = useState<string | null>(null);
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = e.currentTarget;
    const orderData = {
      customerName: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      items,
    };
    try {
      const order = await createOrder(orderData);
      clear();
      toast.success("Order placed successfully!");
      router.push(`/success?orderId=${order._id}`);
    } catch (err: unknown) {
      setError((err as Error).message || "Order failed");
      toast.error((err as Error).message || "Order failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium">Name</label>
          <input id="name" name="name" type="text" required className="rounded-lg border border-forest-soft px-4 py-2 focus:ring-2 focus:ring-forest-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium">Email</label>
          <input id="email" name="email" type="email" required className="rounded-lg border border-forest-soft px-4 py-2 focus:ring-2 focus:ring-forest-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="address" className="font-medium">Address</label>
          <textarea id="address" name="address" required className="rounded-lg border border-forest-soft px-4 py-2 focus:ring-2 focus:ring-forest-primary" rows={2} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="invoiceType" className="font-medium">Invoice Type</label>
          <select
            id="invoiceType"
            name="invoiceType"
            value={invoiceType}
            onChange={e => setInvoiceType(e.target.value)}
            className="rounded-lg border border-forest-soft px-4 py-2 focus:ring-2 focus:ring-forest-primary"
          >
            <option value="A4">A4</option>
            <option value="Thermal">Thermal</option>
          </select>
        </div>
        {/* Order Summary */}
        <div className="bg-forest-soft/40 rounded-lg p-4">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <ul className="text-sm mb-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-forest-accent">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2"><span className="animate-spin h-4 w-4 border-2 border-forest-accent border-t-transparent rounded-full"></span>Processing...</span>
          ) : (
            "Place Order"
          )}
        </Button>
      </form>
    </div>
  );
} 