"use client"
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {Product} from "@/types/Product";
import { saveViewedProduct } from "@/utils/localHistory";
import { useUser } from "@/hooks/useUser";
import { logProductView } from "@/utils/logProductView";



// Vista del producto individual
export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
   const {user} = useUser();

  useEffect(() => {
    async function fetchProduct() {
      if (params?.id) {
        try {
          const docRef = doc(db, "products", params.id as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
            
            if (!user) {              
              saveViewedProduct(docSnap.id); 
            }else{
              logProductView(user?.id, docSnap.id);
            }
          } else {
            setProduct(null);
          }
        } catch (error) {
          setProduct(null);
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchProduct();
  }, [params?.id]);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!product) {
    notFound();
  }
  
  const handleAdd = () => {
    addToCart({
      id: product?.id,
      name: product?.name,
      price: product?.price,      
      image: product?.image,
      quantity: 1,
    });
  };

  // if (!product) {
  //   notFound(); // Muestra la página 404 si no existe el producto
  // }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Image
          src={product.image}
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