import { auth } from "@/firebase";

const user = auth.currentUser;
const token = await user?.getIdToken();
await fetch("/api/auth", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
