'use client';

import AuthForm from '@/components/LoginForm';
import OAuthButton from '@/components/OAuthButton';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Imagen izquierda */}
        <div className="w-1/2 bg-purple-200 flex items-center justify-center p-8">
          <img src="/security_image.png" alt="Signup" className="w-72" />
        </div>

        {/* Formulario derecho */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
          <div className="my-4 text-center">or</div>
          <OAuthButton />
          <AuthForm/>
          <p className="mt-4 text-sm text-center text-gray-600">
            Register an account? <a href="/register" className="text-purple-600">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
