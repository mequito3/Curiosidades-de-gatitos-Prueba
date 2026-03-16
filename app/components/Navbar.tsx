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
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 h-20">
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <Link href="/" className="flex items-center group transition-transform active:scale-95">
          {/* Logo para fondo claro */}
          <Image 
            src="/logo.webp" 
            alt="Logo" 
            width={120} 
            height={120} 
            className="w-32 h-32 sm:w-44 sm:h-44 object-contain dark:hidden group-hover:scale-105 transition-transform duration-500"
            priority
          />
          {/* Logo para fondo oscuro */}
          <Image 
            src="/logo_blanco.png" 
            alt="Logo" 
            width={120} 
            height={120} 
            className="hidden dark:block w-32 h-32 sm:w-44 sm:h-44 object-contain group-hover:scale-105 transition-transform duration-500"
            priority
          />
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
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${language === 'es' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
            >
              ES
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${language === 'en' ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
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
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col pt-24 pb-12 px-8">
          <div className="flex flex-col gap-6">
            <Link 
              href="/" 
              onClick={closeMenu} 
              className={`text-4xl font-bold tracking-tight transition-all active:scale-95 ${pathname === '/' ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}
            >
              {t.nav.home}
            </Link>
            <Link 
              href="/my-facts" 
              onClick={closeMenu} 
              className={`text-4xl font-bold tracking-tight transition-all active:scale-95 ${pathname === '/my-facts' ? 'text-blue-600' : 'text-gray-900 dark:text-white'}`}
            >
              {t.nav.myFacts}
            </Link>
          </div>
          
          <div className="mt-auto">
            <div className="h-[1px] w-full bg-gray-100 dark:bg-gray-800 mb-10" />
            
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
              {t.nav.language}
            </p>
            
            <div className="flex gap-4 w-full">
              <button 
                onClick={() => { setLanguage('es'); closeMenu(); }}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-sm ${language === 'es' ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800'}`}
              >
                Español
              </button>
              <button 
                onClick={() => { setLanguage('en'); closeMenu(); }}
                className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-sm ${language === 'en' ? 'bg-blue-600 text-white shadow-blue-500/20' : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-800'}`}
              >
                English
              </button>
            </div>
          </div>
          
          <button
            onClick={closeMenu}
            className="absolute top-6 right-6 p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 active:scale-90 transition-transform"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </header>
  );
}
