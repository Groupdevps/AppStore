import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function verifyJWT() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) throw new Error('No token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { uid: string };
    return true; // o return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
}
