import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';
import  { auth } from '@/firebase';
import { createSessionCookie } from '@/utils/auth';
// import { verifyJWT } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const cookie = createSessionCookie(user.uid);
  return NextResponse.json({ success: true }, { headers: { 'Set-Cookie': cookie } });
}
