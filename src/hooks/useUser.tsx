import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "@/firebase";

export function useUser() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return { user };
}