import { useState } from "react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface ShippingFormProps {
  userId: string;
  initialAddress?: string;
  initialPostalCode?: string;
  onSaved: (address: string, postalCode: string) => void;
}

export default function ShippingForm({
  userId,
  initialAddress = "",
  initialPostalCode = "",
  onSaved,
}: ShippingFormProps) {
  const [address, setAddress] = useState(initialAddress);
  const [postalCode, setPostalCode] = useState(initialPostalCode);
  const [error, setError] = useState("");

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !postalCode.trim()) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError("");
    try {
        // console.log("userRef", userId, address, postalCode)
        if (!userId) {
            setError("No se encontró el usuario. Por favor, inicia sesión nuevamente.");
            return;
        }
        const userRef = doc(db, "users", userId);
        await setDoc(
            userRef,
            {
            infoPayment: {
                address,
                postalCode,
            },
            },
            { merge: true }
        );
        onSaved(address, postalCode);
    } catch (err) {
        // console.error("Error al guardar la dirección:", err);
      setError("Error al guardar la información. Intenta de nuevo.");
    }
  };

  return (
    <form
      onSubmit={handleSaveAddress}
      className="mt-8 bg-gray-50 p-6 rounded shadow max-w-md mx-auto"
    >
      <h2 className="text-lg font-semibold mb-4">Completa tu información de envío</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1">Dirección</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Código Postal</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
      >
        Guardar información
      </button>
    </form>
  );
}