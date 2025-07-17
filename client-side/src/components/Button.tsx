import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export default function Button({ children, href, onClick, type = "button", disabled, className }: ButtonProps) {
  const base = "rounded px-5 py-2 font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400";
  if (href) {
    return (
      <Link href={href} className={`${base} inline-block text-center ${className || ""}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${className || ""}`} disabled={disabled}>
      {children}
    </button>
  );
} 