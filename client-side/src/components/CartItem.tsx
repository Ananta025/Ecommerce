'use client';

import Image from "next/image";

import { useCartStore } from "../lib/cartStore";

type CartItemType = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartItem({ item }: { item: CartItemType }) {
  const update = useCartStore((s) => s.update);
  const remove = useCartStore((s) => s.remove);

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow p-4">
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-forest-soft flex items-center justify-center">
      <Image
        src={item.image || "/placeholder.png"}
        alt={item.name}
        width={80}
        height={80}
        className="object-contain w-full h-full"
        loading="lazy"
      />
      </div>

      {/* Title + Price */}
      <div className="flex-1">
        <div className="font-semibold text-forest-accent text-lg truncate">{item.name}</div>
        <div className="text-forest-secondary font-bold">${item.price.toFixed(2)}</div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-full bg-forest-light text-forest-accent font-bold text-lg hover:bg-forest-soft transition"
          aria-label="Decrease quantity"
          onClick={() =>
            item.quantity > 1
              ? update(item.id, item.quantity - 1)
              : remove(item.id)
          }
        >
          -
        </button>

        <span className="px-2 font-medium">{item.quantity}</span>

        <button
          className="w-8 h-8 rounded-full bg-forest-light text-forest-accent font-bold text-lg hover:bg-forest-soft transition"
          aria-label="Increase quantity"
          onClick={() => update(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
}
