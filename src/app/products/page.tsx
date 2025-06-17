import Link from "next/link";
import Image from "next/image";

export default async function ProductsPage() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {data.products?.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          scroll={false}
          className="p-4 border-2 border-gray-500 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 h-full"
        >
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2 text-center min-h-[3rem]">
              {product.title}
            </h3>
            <Image
              alt="product image"
              width={200}
              height={200}
              src={product.images[0]}
              className="rounded-lg object-cover mb-4 mx-auto"
            />
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-grow mb-4">
              {product.description.slice(0, 80)}...
            </p>
          </div>

          <div className="flex flex-row justify-between items-center mt-auto pt-2 border-t border-gray-300 dark:border-gray-700">
            <span className="font-bold text-lg">₹{product.price}</span>
            <span className="text-green-500 text-sm">
              {product.discountPercentage}% Off
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
