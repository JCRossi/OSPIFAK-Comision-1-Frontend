"use client";

import Link from 'next/link';


export default function Home() {
  return (
    <main className="main-home">
          <div class="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
            <ul className="bottom-bar-links">
              <li><Link href="/login" className="bottom-bar-links">Iniciar sesión</Link></li>
            </ul>
        </div>
    </main>
  )
}
