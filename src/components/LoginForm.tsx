'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      router.back() // Redirige a la página anterior
    } catch (err: any) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
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
        Sign In
      </button>
    </form>
  )
}
