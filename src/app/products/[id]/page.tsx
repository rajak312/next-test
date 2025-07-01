import { Product } from "@/app/@types/products";
import { Metadata } from "next";
import Image from "next/image";

export interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product: Product = await res.json();
  return {
    title: product.title,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const products: Product[] = (await res.json()).products;
  return products?.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  const product: Product = await res.json();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images[0],
  };

  return (
    <div className="max-w-xl mx-auto p-6 border-2 border-gray-300 dark:border-gray-600 rounded-2xl shadow-md bg-white dark:bg-gray-800 my-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <h1 className="text-2xl font-bold mb-4 text-center">{product.title}</h1>

      <Image
        alt={product.title}
        src={product.images[0]}
        width={400}
        height={400}
        className="rounded-lg object-cover mx-auto mb-6"
      />

      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-center">
        {product.description}
      </p>

      <div className="flex flex-row justify-between items-center border-t pt-4 border-gray-200 dark:border-gray-700 text-lg font-semibold">
        <span className="text-blue-600 dark:text-blue-400">
          ₹{product.price}
        </span>
        <span className="text-green-500">
          {product.discountPercentage}% Off
        </span>
      </div>
    </div>
  );
}
