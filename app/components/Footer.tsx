'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 px-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-gray-400 dark:text-gray-500 text-sm font-medium">
          © 2026 Americo Labs.
        </div>

        <Link 
          href="https://portafolio.americolabs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#f0fdf9] dark:bg-[#064e3b]/10 border border-[#ccfbf1] dark:border-[#0f766e]/20 hover:bg-[#e6fffa] dark:hover:bg-[#064e3b]/20 transition-all duration-300"
        >
          <span className="text-[9px] font-bold text-[#2dd4bf] dark:text-[#2dd4bf] uppercase tracking-[0.2em] leading-none mb-[1px]">
            Diseñado por
          </span>
          <span className="text-sm font-bold text-[#0f766e] dark:text-emerald-50 leading-none">
            Americo Labs
          </span>
          <ArrowUpRight size={14} className="text-[#0d9488] dark:text-[#2dd4bf] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ml-0.5" />
        </Link>
      </div>
    </footer>
  );
}
