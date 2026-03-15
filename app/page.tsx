'use client';

import Link from 'next/link';
import { useLanguage } from './components/LanguageContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const { t, mounted } = useLanguage();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a]" />
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] transition-all duration-700 overflow-hidden relative">
      {/* Abstract Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-indigo-500/10 blur-[80px] md:blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 flex flex-col items-center justify-center min-h-[90vh] text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold mb-8 border border-blue-100 dark:border-blue-800/50 animate-fade-in">
          <Sparkles size={16} />
          <span>{t.nav.home}</span>
        </div>
        
        <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.1] animate-fade-in [animation-delay:200ms]">
          {t.hero.title} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {t.hero.catLovers}
          </span>
        </h1>

        <p className="max-w-xl text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed animate-fade-in [animation-delay:400ms]">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto animate-fade-in [animation-delay:600ms]">
          <Link
            href="/new"
            className="group w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
          >
            {t.hero.cta}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/my-facts"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 flex items-center justify-center active:scale-95"
          >
            {t.nav.myFacts}
          </Link>
        </div>

        {/* Floating Icons Placeholder - Responsive gap */}
        <div className="mt-16 sm:mt-24 flex gap-8 sm:gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500 text-3xl sm:text-4xl">
          <span>🐾</span>
          <span>🧶</span>
          <span>🥛</span>
          <span>🐟</span>
        </div>
      </div>
    </div>
  );
}
