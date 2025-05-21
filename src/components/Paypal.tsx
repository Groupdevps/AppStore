// FakePaypal
"use client";

import { useState } from "react";

type Props = {
  amount: number;
  onSuccess: (details: { payerName: string; paymentId: string }) => void;
};

export default function FakePaypal({ amount, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const handleFakePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const fakePaymentId = "FAKE-" + Math.random().toString(36).substring(2, 10).toUpperCase();
      onSuccess({ payerName: "Test User", paymentId: fakePaymentId });
      setLoading(false);
    }, 2000); // simulate delay
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
