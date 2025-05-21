"use client"
import { useCartContext } from "@/context/CartContext";

export const useCart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart,  updateQuantity, total, getTotalQuantity } = useCartContext();

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    total,
    getTotalQuantity,
  };
};
