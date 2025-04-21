'use client';

import Link from 'next/link'; // Importación de Link
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 gap-12 sm:gap-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-6 text-center sm:text-left">
          Curiosidades sobre los gatos
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 text-center sm:text-left">
          ¡Descubre cosas interesantes sobre los gatos y sorpréndete con cada dato!
        </p>
        <Link
          href="/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
        >
          Ver nueva curiosidad
        </Link>
      </div>
    </div>
  );
}
