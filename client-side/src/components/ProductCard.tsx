import Link from "next/link";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product._id}`}
      className="block max-w-[250px] h-full rounded-xl shadow-md bg-white hover:scale-105 hover:bg-forest-light transition-all duration-300 overflow-hidden group"
      aria-label={`View details for ${product.name}`}
    >
      <div className="aspect-square bg-forest-soft flex items-center justify-center overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="250px"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-forest-accent truncate">{product.name}</h3>
        <div className="text-forest-secondary font-bold text-base">${product.price}</div>
        <button
          className="mt-2 w-full rounded-lg bg-gray-200 text-black py-1.5 font-medium hover:bg-gray-300 transition-colors"
          type="button"
        >
          View
        </button>
      </div>
    </Link>
  );
}
