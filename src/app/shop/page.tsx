
'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs, query, limit, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Product } from "@/types/Product";

export default function ShopPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [loading, setLoading] = useState(true);

  // Obtener categorías desde Firebase
  useEffect(() => {
    async function fetchCategories() {
      const catSnap = await getDocs(collection(db, "categories"));
      const catArr = catSnap.docs.map(doc => doc.data().name as string);
      setCategories(["Todos", ...catArr]);
    }
    fetchCategories();
  }, []);

  // Obtener productos desde Firebase (limitado a 8, filtrando por categoría si aplica)
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      let q;
      if (selectedCategory === "Todos") {
        q = query(collection(db, "products"), limit(8));
      } else {
        q = query(
          collection(db, "products"),
          where("category", "==", selectedCategory),
          limit(8)
        );
      }
      const prodSnap = await getDocs(q);
      const prodArr = prodSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prodArr);
      setLoading(false);
    }
    fetchProducts();
  }, [selectedCategory]);

  return (
    <main className="bg-white text-gray-800 px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestra Tienda</h1>

      {/* Filtros de categorías */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full transition text-sm ${
              selectedCategory === cat
                ? "bg-pink-500 text-white"
                : "bg-gray-100 hover:bg-pink-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div className="text-center py-16">Cargando productos...</div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No hay productos en esta categoría.
            </div>
          )}
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-pink-600 font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

const categories = ["Todos", "Vestidos", "Blusas", "Accesorios", "Zapatos"];

const products = [
  {
    id: "1",
    name: "Vestido Floral",
    price: 79.99,
    image: "/images/floral-dress.jpg",
  },
  {
    id: "2",
    name: "Chaqueta Beige",
    price: 99.99,
    image: "/images/beige-jacket.jpg",
  },
  {
    id: "3",
    name: "Top Elegante",
    price: 49.99,
    image: "/images/elegant-top.jpg",
  },
  {
    id: "4",
    name: "Falda Casual",
    price: 59.99,
    image: "/images/casual-skirt.jpg",
  },
];
