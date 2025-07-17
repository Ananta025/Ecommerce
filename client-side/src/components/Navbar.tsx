'use client'
import Link from "next/link";
import { useCartStore } from "../lib/cartStore";

export default function Navbar() {
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  return (
    <nav className="sticky top-0 z-30 w-full bg-forest-background text-forest-primary shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
          <span role="img" aria-label="logo">🌿</span>
          ForestShop
        </Link>
        {/* Center: Search */}
        <div className="flex-1 mx-6 max-w-md">
          <label htmlFor="search" className="sr-only">Search products</label>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl bg-forest-soft/30 text-forest-accent px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-forest-primary transition-all duration-300"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-secondary">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-2-2"/></svg>
            </span>
          </div>
        </div>
        {/* Right: Links & Cart */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-forest-light transition-colors">Home</Link>
          <Link href="#" className="hover:text-forest-light transition-colors">Become a Seller</Link>
          <Link href="#" className="hover:text-forest-light transition-colors">Login</Link>
          <Link href="/cart" className="relative group">
            <span className="sr-only">Cart</span>
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="inline-block"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-forest-accent text-white text-xs rounded-full px-1.5 py-0.5 font-bold border-2 border-forest-background">{count}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
} 