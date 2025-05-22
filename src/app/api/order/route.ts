import { db } from '@/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

const collectionRef = collection(db, 'orders');


export async function GET() {
  const snapshot = await getDocs(collectionRef);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(products);
}


export async function POST(req: NextRequest) {
  try {
    const user = verifyJWT();
    const data = await req.json();
    const docRef = await addDoc(collectionRef, {
      ...data,
      // createdBy: user.uid,
      createdAt: new Date().toISOString()
    });
    return NextResponse.json({ id: docRef.id });
  } catch (err) {
    console.log("err ", err)
    return NextResponse.json({ error: err || 'Unauthorized' }, { status: 401 });
  }
}
