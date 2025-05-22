'use client';

import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function OAuthButton() {
  const router = useRouter();

  const handleOAuth = async (providerType: 'google' | 'facebook') => {
    const provider = providerType === 'google' ? new GoogleAuthProvider() : new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, 'Users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'Users', user.uid), {
        code: uuidv4(),
        name: user.displayName,
        email: user.email,
        password: '',
        oauth2: providerType
      });
    }

    document.cookie = `session=${user.uid}; path=/;`; 

    // Redirigir a la página anterior
    router.back();
  };

  return (
    <div className="space-x-2">
      <button onClick={() => handleOAuth('google')} className="btn bg-red-500 text-white">Google</button>
      <button onClick={() => handleOAuth('facebook')} className="btn bg-blue-500 text-white">Facebook</button>
    </div>
  );
}
