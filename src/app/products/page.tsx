// pages/products/index.tsx
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "Dresses",
    slug: "dresses",
    products: [
      {
        id: "1",
        name: "Floral Dress",
        price: 79.99,
        imageUrl: "/images/floral-dress.jpg",
      },
      {
        id: "2",
        name: "Black Maxi Dress",
        price: 99.99,
        imageUrl: "/images/black-maxi.jpg",
      },
    ],
  },
  {
    name: "Accessories",
    slug: "accessories",
    products: [
      {
        id: "3",
        name: "Golden Necklace",
        price: 29.99,
        imageUrl: "/images/golden-necklace.jpg",
      },
    ],
  },
  {
    name: "Shoes",
    slug: "shoes",
    products: [
      {
        id: "4",
        name: "Summer Sandals",
        price: 59.99,
        imageUrl: "/images/sandals.jpg",
      },
    ],
  },
];

export default function ProductsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Our Products</h1>

      {categories.map((category) => (
        <section key={category.slug} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block border border-gray-200 rounded-lg shadow hover:shadow-md transition"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={400}
                  height={500}
                  className="rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-pink-600 font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
