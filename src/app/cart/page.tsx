"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ShippingForm from "@/components/ShippingForm";
import Paypal from "@/components/Paypal";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState(user?.infoPayment?.address || "");
  const [postalCode, setPostalCode] = useState(user?.infoPayment?.postalCode || "");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  // Buscar infoPayment en Firestore al cargar el usuario
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().infoPayment) {
          const info = userSnap.data().infoPayment;
          setAddress(info.address || "");
          setPostalCode(info.postalCode || "");
        }
      }
      setLoadingUserInfo(false);
    };
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleProceed = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    // Validar si el usuario ya tiene dirección y código postal guardados
    const userAddress = address;
    const userPostal = postalCode;
    if (!userAddress || !userPostal) {
      setShowAddressForm(true);
      return;
    }
    await handleCreateOrder();
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && postalCode) {
      // Aquí podrías guardar la dirección en el perfil del usuario si tienes backend
      setShowAddressForm(false);
    }
  };

  const handleCreateOrder = async () => {
    if (!user) return;
    // Crear la orden en Firestore
    // console.log("cartItems", cartItems) 
    const orderRef = await addDoc(collection(db, "orders"), {
      userId: user.uid ?? "",
      total,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        // image: item.image,
      })),
      createdAt: new Date(),
    });
    setOrderId(orderRef.id);
  };
  const handleProceedPay= async () =>{    
    setPaymentSuccess(true)
    clearCart(); // Limpiar el carrito después de proceder al pago
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      {loadingUserInfo ? (
        <div className="text-center py-16">Cargando información...</div>
      ) : paymentSuccess ? (
        <div className="text-green-600 text-center mt-6 font-bold">
          ¡Pago realizado con éxito!
        </div>
      ) : cartItems.length === 0 ? (
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
                <img
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
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
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline text-sm ml-4"
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
            <button
              className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
              onClick={handleProceed}
            >
              Proceder al Pago
            </button>
          </div>
            
          {showAddressForm && user && (
            <ShippingForm
              userId={user.uid}
              initialAddress={address}
              initialPostalCode={postalCode}
              onSaved={(addr, code) => {
                setAddress(addr);
                setPostalCode(code);
                setShowAddressForm(false);
              }}
            />
          )}

          {orderId && user && (
            <div className="mt-8">
              <Paypal
                amount={total}
                userId={user.uid}
                orderId={orderId}
                onSuccess={() => handleProceedPay()}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}
