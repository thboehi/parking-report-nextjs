'use client';

import { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = '/'; // Redirige après connexion réussie
    } else {
      const data = await res.json();
      setError(data.error || 'Une erreur est survenue');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded shadow-md dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded w-full mb-4 dark:bg-gray-800 dark:border-gray-700"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
          Se connecter
        </button>
      </form>
    </div>
  );
}