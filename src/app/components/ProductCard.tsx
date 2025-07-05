"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "../@types/products";

export default function ProductCard({ product }: { product: Product }) {
  const navigation = useRouter();

  const handleCardClick = (id: number) => navigation.push(`/products/${id}`);

  return (
    <div
      key={product.id}
      className="m-4 p-4 border-2 border-gray-500 rounded-2xl justify-center items-center min-w-[400px]"
      onClick={() => handleCardClick(product.id)}
    >
      <h3>{product.title}</h3>
      <Image
        alt="product image"
        width={100}
        height={150}
        src={product.images[0]}
      />
      <div className="flex flex-row justify-between">
        <span className="font-bold">Price: {product.price}</span>

        <span>{product.discountPercentage}%</span>
      </div>
    </div>
  );
}
