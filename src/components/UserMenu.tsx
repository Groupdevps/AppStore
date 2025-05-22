"use client";
import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setOpen(false);
    router.push("/login");
  };

  const handleLogin = () => {
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-2 text-gray-500 hover:text-black"
        onClick={() => setOpen((v) => !v)}
        aria-label="User menu"
      >
        <User size={20} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20">
          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </div>
  );
}