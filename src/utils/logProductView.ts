import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";

export async function logProductView(userId: string, productId: string) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    recentlyViewed: arrayUnion(productId)
  });
}