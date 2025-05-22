'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'

export default function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const user = userCredential.user

      // Actualizar el perfil con el nombre
      await updateProfile(user, { displayName: form.name })

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: form.name,
        email: form.email,
        createdAt: new Date(),
      })

      // Redireccionar a la página anterior
      router.back()
    } catch (err: any) {
      setError(err.message || 'Error al registrar usuario')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={form.name}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  )
}
