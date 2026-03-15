'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Image from 'next/image';

export default function Navbar() {
  const { language, setLanguage, t, mounted } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  // Return a stable placeholder during server-side rendering or before mounting
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 dark:bg-gray-800 rounded-xl" />
            <div className="h-6 w-24 bg-gray-100 dark:bg-gray-800 rounded-lg" />
          </div>
        </div>
      </header>
    );
  }

  const navLinkClass = (path: string) => `
    relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300
    ${pathname === path 
      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}
  `;

  // Prevent hydration mismatch by using a stable initial state
  const currentLanguage = mounted ? language : 'es';
  const currentPathname = mounted ? pathname : '/';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-xl bg-white/50 dark:bg-white/10 p-1 flex items-center justify-center border border-gray-100/50 dark:border-white/10 shadow-lg shadow-black/5">
            <Image 
              src="/logo.webp" 
              alt="Logo" 
              width={60} 
              height={60} 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
          <span className="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-950 to-gray-700 dark:from-white dark:via-blue-100 dark:to-gray-300 tracking-tight">
            Gatitos
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/" className={navLinkClass('/')}>
            {t.nav.home}
          </Link>
          <Link href="/my-facts" className={navLinkClass('/my-facts')}>
            {t.nav.myFacts}
          </Link>
          
          <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-800 mx-4" />
          
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl border border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => setLanguage('es')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${currentLanguage === 'es' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              ES
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${currentLanguage === 'en' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
            <Link 
              href="/" 
              onClick={closeMenu} 
              className={`text-3xl font-bold transition-all ${currentPathname === '/' ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/my-facts" 
              onClick={closeMenu} 
              className={`text-3xl font-bold transition-all ${currentPathname === '/my-facts' ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}
            >
              {t.nav.myFacts}
            </Link>
            
            <div className="w-20 h-[2px] bg-gray-200 dark:bg-gray-800" />
            
            <div className="flex gap-4 w-full max-w-xs transition-opacity duration-300" style={{ opacity: mounted ? 1 : 0.5 }}>
              <button 
                onClick={() => { setLanguage('es'); closeMenu(); }}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 ${currentLanguage === 'es' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              >
                Español
              </button>
              <button 
                onClick={() => { setLanguage('en'); closeMenu(); }}
                className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 ${currentLanguage === 'en' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              >
                English
              </button>
            </div>
          </div>
          
          <button
            onClick={closeMenu}
            className="absolute top-8 right-8 p-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <X size={28} />
          </button>
        </div>
      )}
    </header>
  );
}
