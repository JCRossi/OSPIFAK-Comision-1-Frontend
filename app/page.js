"use client";

import Link from 'next/link';


export default function Home() {
  return (
    <main className="main-home">
          <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            <ul className="bottom-bar-links">
              <li><Link href="/login" className="bottom-bar-links">Iniciar sesión</Link></li>
              <li><Link href="/registrar" className="bottom-bar-links">¿No sos cliente? Registrate</Link></li>
            </ul>
        </div>
    </main>
  )
}
