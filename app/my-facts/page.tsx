'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import FactCard from '../components/FactCard'; 
import Modal from '../components/Modal';
import { Sparkles, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function MisCuriosidades() {
  const { t, language } = useLanguage();
  const [savedFacts, setSavedFacts] = useState<{ fact: string, image: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFact, setSelectedFact] = useState<{ fact: string, image: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = JSON.parse(localStorage.getItem('savedFacts') || '[]');
    setSavedFacts(saved);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pt-24 sm:pt-32 pb-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-medium">{t.common.loading}</div>
      </div>
    );
  }

  const handleOpenModal = (fact: string, image: string) => {
    setSelectedFact({ fact, image });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFact(null);
  };

  const clearAllFacts = () => {
    if (confirm(language === 'es' ? '¿Borrar todo?' : 'Clear all?')) {
      localStorage.removeItem('savedFacts');
      setSavedFacts([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pt-24 sm:pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[40%] left-[-10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />

      <div className="max-w-6xl mx-auto relative z-10 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
              {t.nav.myFacts}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {language === 'es' 
                ? 'Tu colección personal de sabiduría felina.' 
                : 'Your personal collection of feline wisdom.'}
            </p>
          </div>

          {savedFacts.length > 0 && (
            <button
              onClick={clearAllFacts}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-all active:scale-95 border border-red-100 dark:border-red-900/30"
            >
              <Trash2 size={18} />
              {language === 'es' ? 'Borrar todo' : 'Clear all'}
            </button>
          )}
        </div>

        {savedFacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-[3rem] shadow-sm">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center text-4xl mb-6">
              📁
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 italic">
              {t.myFacts.empty}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
              {language === 'es' 
                ? '¡Empieza a guardar tus curiosidades favoritas para verlas aquí!' 
                : 'Start saving your favorite facts to see them here!'}
            </p>
            <Link 
              href="/new" 
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              {t.hero.cta}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedFacts.map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <FactCard
                  fact={item.fact}
                  image={item.image}
                  onCopy={() => navigator.clipboard.writeText(item.fact)}
                  onClick={() => handleOpenModal(item.fact, item.image)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        fact={selectedFact?.fact || ''}
        image={selectedFact?.image || ''}
      />
    </div>
  );
}
