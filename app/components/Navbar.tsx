'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Curiosidades de Gatos</h1>
        </div>
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className={`text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition ${
              pathname === '/' ? 'border-b-2 border-blue-600' : ''
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/my-facts"
            className={`text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 transition ${
              pathname === '/my-facts' ? 'border-b-2 border-blue-600' : ''
            }`}
          >
            Mis curiosidades
          </Link>
        </div>
      </nav>
    </header>
  );
}
