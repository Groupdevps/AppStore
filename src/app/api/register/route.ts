import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { createSessionCookie } from '@/utils/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'Users', user.uid), {    
    name,
    email,
    password, // En produccion: no guardar la contrasena en texto plano
    oauth2: 'email'
  });

  const cookie = createSessionCookie(user.uid);
  return NextResponse.json({ success: true }, { headers: { 'Set-Cookie': cookie } });
}
