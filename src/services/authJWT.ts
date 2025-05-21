import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

initializeApp({
  credential: applicationDefault(),
});

export default async function handler(req, res) {
  const token = req.headers.authorization?.split("Bearer ")[1];
  try {
    const decoded = await getAuth().verifyIdToken(token);
    res.status(200).json({ uid: decoded.uid });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
