import { notFound } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
type ProductPageProps = {
  params: {
    id: string;
  };
};
// Simulación de productos (en la vida real vendría de una base de datos o API)
const products = [
  {
    id: "1",
    name: "Floral Dress",
    description: "Elegant floral dress perfect for spring.",
    price: 79.99,
    imageUrl: "/images/floral-dress.jpg",
  },
  {
    id: "2",
    name: "Black Maxi Dress",
    description: "Classic and timeless black maxi dress.",
    price: 99.99,
    imageUrl: "/images/black-maxi.jpg",
  },
];

// 👇 Función para obtener datos por ID
function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

// ✅ Vista del producto individual
export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);
  const { addToCart } = useCart();
  const handleAdd = () => {
    addToCart({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      imageUrl: product?.imageUrl,
      quantity: 1,
    });
  };

  if (!product) {
    notFound(); // Muestra la página 404 si no existe el producto
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={600}
          className="rounded-lg object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-pink-600 text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>

          <button onClick={handleAdd} className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}