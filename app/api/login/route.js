import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();

  // Vérifie le mot de passe
  if (password !== process.env.PAGE_PASS) {
    return new NextResponse(JSON.stringify({ error: 'Mot de passe incorrect' }), { status: 401 });
  }

  // Génère un token JWT
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
    expiresIn: '7d', // Expire dans 7 jours
  });

  // Définir le token dans un cookie sécurisé
  const response = NextResponse.json({ success: true });
  response.cookies.set('auth-token', token, {
    httpOnly: true, // Empêche l'accès via JavaScript
    secure: process.env.NODE_ENV === 'production', // Utiliser uniquement HTTPS en prod
    maxAge: 7 * 24 * 60 * 60, // Expire dans 7 jours
    path: '/',
  });

  return response;
}