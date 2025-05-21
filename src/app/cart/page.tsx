"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
export default function CartPage() {
  const { cartItems:cartItemsCart, updateQuantity, removeFromCart, total:totalCart } = useCart();
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Vestido Floral",
      price: 79.99,
      quantity: 1,
      imageUrl: "/images/floral-dress.jpg",
    },
    {
      id: "2",
      name: "Top Elegante",
      price: 49.99,
      quantity: 2,
      imageUrl: "/images/elegant-top.jpg",
    },
  ]);

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-lg">
          Tu carrito está vacío.{" "}
          <Link href="/shop" className="text-pink-600 underline">
            Ver productos
          </Link>
        </p>
      ) : (
        <>
          <ul className="space-y-6 mb-8">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
               
                </div>
                <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
              </li>
            ))}
          </ul>

          <div className="text-right mb-6">
            <p className="text-xl font-semibold">
              Total: <span className="text-pink-600">${total.toFixed(2)}</span>
            </p>
          </div>

          <div className="text-right">
            <button className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition">
              Proceder al Pago
            </button>
          </div>
        </>
      )}
    </main>
  );
}
