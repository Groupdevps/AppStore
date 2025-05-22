import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export const createSessionCookie = (uid: string) => {
  const token = jwt.sign({ uid }, process.env.JWT_SECRET!, { expiresIn: '1d' });

  return serialize('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 86400,
  });
};
