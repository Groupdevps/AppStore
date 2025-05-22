"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/firebase";
import { Product } from "@/types/Product";
import { Category } from "@/types/Category";
export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Obtener categorías
      const catSnap = await getDocs(collection(db, "categories"));
      const catArr = catSnap.docs.map(doc => ({
        name: doc.data().name,
        slug: doc.id,
      }));
      setCategories(catArr);

      // Obtener productos por categoría (máximo 4 por categoría)
      const productsObj: Record<string, Product[]> = {};
      for (const cat of catArr) {
        const prodQuery = query(
          collection(db, "products"),
          where("category", "==", cat.name),
          limit(4)
        );
        const prodSnap = await getDocs(prodQuery);
        productsObj[cat.slug] = prodSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Product));
      }
      setProductsByCategory(productsObj);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-10">Our Products</h1>
      {loading && <div className="text-center py-16">Cargando...</div>}
      {!loading && categories.map((category) => (
        <section key={category.slug} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(productsByCategory[category.slug] || []).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block border border-gray-200 rounded-lg shadow hover:shadow-md transition"
              >
                <img
                  src={product.image}
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