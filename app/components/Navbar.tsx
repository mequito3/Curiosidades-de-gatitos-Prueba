'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = (path: string) =>
    `block text-lg font-semibold transition-colors px-3 py-2 rounded-md ${
      pathname === path
        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
        : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
    }`;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 left-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          Curiosidades de Gatos
        </div>

        {/* Menú hamburguesa para móviles */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 dark:text-gray-200 focus:outline-none"
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menú en pantallas grandes */}
        <div className="hidden sm:flex space-x-6">
          <Link href="/" className={navLinkClass('/')}>
            Inicio
          </Link>
          <Link href="/my-facts" className={navLinkClass('/my-facts')}>
            Mis curiosidades
          </Link>
        </div>
      </nav>

      {/* Menú desplegable en móvil */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 bg-white dark:bg-gray-800 shadow-md">
          <Link href="/" onClick={closeMenu} className={navLinkClass('/')}>
            Inicio
          </Link>
          <Link href="/my-facts" onClick={closeMenu} className={navLinkClass('/my-facts')}>
            Mis curiosidades
          </Link>
        </div>
      )}
    </header>
  );
}
