"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Invalid password');
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <h1 className="text-2xl font-semibold mb-2">Admin Access</h1>
        <p className="text-sm text-zinc-400 mb-6">Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 outline-none ring-0"
            autoFocus
          />
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button type="submit" className="w-full rounded-lg bg-white px-4 py-3 font-medium text-black">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
