// pages/checkout.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import FakePaypal from "@/components/Paypal";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function CheckoutPage() {
  const { total, clearCart } = useCart();
  const router = useRouter();
  const { user } = useUser();

  const handleSuccess = (details: { payerName: string; paymentId: string }) => {
    alert(`Payment successful by ${details.payerName} (ID: ${details.paymentId})`);
    clearCart();
    router.push("/success"); // optional success page
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-6">Total to pay: <strong>${total.toFixed(2)}</strong></p>
      <FakePaypal
        amount={total}
        userId={user?.uid || ""}
        orderId={""}
        onSuccess={handleSuccess}
      />
    </main>
  );
}
