// src/services/authService.ts
import { createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export async function registerUser(name: string, email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const code = uuidv4();
  await setDoc(doc(db, "Users", res.user.uid), {
    code,
    name,
    email,
    password,
    oauth2: "email",
  });
  return res.user;
}

// import { signInWithEmailAndPassword } from "firebase/auth";
// login with email and pass
export async function loginUser(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}

// import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { getDoc, doc, setDoc } from "firebase/firestore";

// login with google, facebook
export async function oauthLogin(providerType: "google" | "facebook") {
  const provider =
    providerType === "google" ? new GoogleAuthProvider() : new FacebookAuthProvider();

  const res = await signInWithPopup(auth, provider);
  const user = res.user;
  const userRef = doc(db, "Users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      code: uuidv4(),
      name: user.displayName,
      email: user.email,
      password: "",
      oauth2: providerType,
    });
  }

  return user;
}
