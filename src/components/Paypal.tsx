"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

type Props = {
  amount: number;
  userId: string;
  orderId: string;
  onSuccess: (details: { payerName: string; paymentId: string }) => void;
};

export default function FakePaypal({ amount, userId, orderId, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handleFakePayment = async () => {
    setLoading(true);
    setTimeout(async () => {
      const fakePaymentId = "FAKE-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      // Guardar en payments de Firestore
      await addDoc(collection(db, "payments"), {
        userId,
        orderId,
        amount,
        paymentId: fakePaymentId,
        createdAt: new Date(),
      });
      onSuccess({ payerName: "Test User", paymentId: fakePaymentId });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="border p-4 rounded-lg shadow-md text-center">
      <p className="mb-4 text-lg font-medium">
        Simulated Payment of <span className="text-blue-600">${amount.toFixed(2)}</span>
      </p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleFakePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Simulated PayPal"}
      </button>
    </div>
  );
}
