import { db } from '@/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const docRef = doc(db, 'products', params.id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = verifyJWT();
    const data = await req.json();
    const docRef = doc(db, 'products', params.id);
    await updateDoc(docRef, data);
    return NextResponse.json({ message: 'Updated' });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    verifyJWT();
    const docRef = doc(db, 'products', params.id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
