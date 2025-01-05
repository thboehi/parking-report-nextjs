import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Utilisation de jose pour vérifier les JWT

export async function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Vérification du JWT avec jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Clé secrète
    await jwtVerify(token, secret); // Vérifie la validité du token

    return NextResponse.next(); // Continue si valide
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.redirect(new URL('/login', request.url)); // Redirige si invalide
  }
}

// Appliquer le middleware uniquement à certaines routes
export const config = {
  matcher: ['/'], // Ajouter les routes nécessitant une authentification
};