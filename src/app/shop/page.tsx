
import Link from "next/link";
import Image from "next/image";

export default function ShopPage() {
  return (
    <main className="bg-white text-gray-800 px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestra Tienda</h1>

      {/* Filtros simples */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-2 rounded-full bg-gray-100 hover:bg-pink-200 transition text-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={500}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p className="text-pink-600 font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

const categories = ["Todos", "Vestidos", "Blusas", "Accesorios", "Zapatos"];

const products = [
  {
    id: "1",
    name: "Vestido Floral",
    price: 79.99,
    imageUrl: "/images/floral-dress.jpg",
  },
  {
    id: "2",
    name: "Chaqueta Beige",
    price: 99.99,
    imageUrl: "/images/beige-jacket.jpg",
  },
  {
    id: "3",
    name: "Top Elegante",
    price: 49.99,
    imageUrl: "/images/elegant-top.jpg",
  },
  {
    id: "4",
    name: "Falda Casual",
    price: 59.99,
    imageUrl: "/images/casual-skirt.jpg",
  },
];
