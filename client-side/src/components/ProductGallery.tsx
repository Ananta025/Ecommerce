import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [mainIdx, setMainIdx] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="rounded-2xl overflow-hidden shadow-lg bg-forest-soft aspect-square relative">
        <Image
          src={images[mainIdx]}
          alt={title}
          fill
          sizes="100%"
          className="object-cover transition-all duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 justify-center">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => setMainIdx(idx)}
            className={`rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-square w-16 h-16 relative ${mainIdx === idx ? 'border-forest-accent' : 'border-transparent hover:border-forest-secondary'}`}
            aria-label={`Show image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${idx + 1}`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
