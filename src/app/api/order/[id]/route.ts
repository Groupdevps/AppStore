import { db } from '@/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  const docRef = doc(db, 'orders', id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ id: snapshot.id, ...snapshot.data() });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = verifyJWT();
    const { id } = await params;
    const data = await req.json();
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, data);
    return NextResponse.json({ message: 'Updated' });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(
  req: NextRequest, { params }: { params: Promise<{ id: string }> } ) {
  try {
    verifyJWT();
    const { id } = await params;
    const docRef = doc(db, 'orders', id);
    await deleteDoc(docRef);
    return NextResponse.json({ message: 'Deleted' });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
