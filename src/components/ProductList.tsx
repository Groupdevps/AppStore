"use client";
// import { products } from "@/components/products";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, doc, getDoc, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@/hooks/useUser";
import { Product } from "@/types/Product";
import { getViewedProducts } from "@/utils/localHistory";

export default function ProductList() {
  const { user } = useUser();
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  async function fetchProducts() {
    setLoading(true);

    // Best Sellers (máximo 6)
    const bestSellerQuery = query(collection(db, "products"), limit(10));
    const bestSellerSnap = await getDocs(bestSellerQuery);
    const bestSellerArr = bestSellerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)).slice(0, 6);
    setBestSellers(bestSellerArr);

    const localHistory = getViewedProducts().slice(-6).reverse();
    console.log("Local History:", localHistory);
    // Últimos vistos (máximo 6, solo si usuario logueado)
    if (user?.id) {
      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);
      const recentlyViewed: string[] = userSnap.exists() && userSnap.data().recentlyViewed
        ? userSnap.data().recentlyViewed.slice(-6).reverse()
        : [];

      if (recentlyViewed.length > 0) {
        // Trae los productos por ID
        const productsRef = collection(db, "products");
        const viewedQuery = query(productsRef, where("__name__", "in", recentlyViewed));
        const viewedSnap = await getDocs(viewedQuery);
        const viewedArr = viewedSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setViewedProducts(
          recentlyViewed
            .map(id => viewedArr.find(p => p.id === id))
            .filter(Boolean) as Product[]
        );
      } else if (localHistory.length > 0) {
        // Si no hay en Firebase, usa localHistory
        const productsRef = collection(db, "products");
        const localQuery = query(productsRef, where("__name__", "in", localHistory));
        const localSnap = await getDocs(localQuery);
        const localArr = localSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        setViewedProducts(
          localHistory
            .map(id => localArr.find(p => p.id === id))
            .filter(Boolean) as Product[]
        );
      } else {
        setViewedProducts([]);
      }
    } else if (localHistory.length > 0) {
      // Usuario no logueado, usa localHistory
      const productsRef = collection(db, "products");
      const localQuery = query(productsRef, where("__name__", "in", localHistory));
      const localSnap = await getDocs(localQuery);
      const localArr = localSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setViewedProducts(
        localHistory
          .map(id => localArr.find(p => p.id === id))
          .filter(Boolean) as Product[]
      );
    } else {
      setViewedProducts([]);
    }

    setLoading(false);
  }

  fetchProducts();
}, [user]);

  return (
    <section className="py-16 px-6 lg:px-20">
      {user && viewedProducts.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-10 text-center">Últimos Vistos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-12">
            {viewedProducts.map(product => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="relative group cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg shadow hover:scale-105 transition"
                  />
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <div className="text-pink-500 font-bold">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="text-3xl font-bold mb-10 text-center">Best Seller</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {bestSellers.map(product => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="relative group cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg shadow hover:scale-105 transition"
              />
              <div className="mt-4">
                <h3 className="font-medium text-gray-800">{product.name}</h3>
                <div className="text-pink-500 font-bold">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {loading && <div className="text-center mt-8">Cargando...</div>}
    </section>
  );
}