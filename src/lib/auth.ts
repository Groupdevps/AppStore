import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export function verifyJWT() {
  const token = cookies().get('session')?.value;
  if (!token) throw new Error('No token');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { uid: string };
    return true// decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
}
