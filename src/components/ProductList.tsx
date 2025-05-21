import { products } from "@/components/products";

export default function ProductList() {
  return (
    <section className="py-16 px-6 lg:px-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Best Seller</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            {/* Badge */}
            {product.badge && (
              <span className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {product.badge}
              </span>
            )}

            {/* Product image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg shadow hover:scale-105 transition"
            />

            {/* Info */}
            <div className="mt-4">
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <div className="text-pink-500 font-bold">
                ${product.salePrice.toFixed(2)}{" "}
                <span className="line-through text-gray-400 text-sm ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}