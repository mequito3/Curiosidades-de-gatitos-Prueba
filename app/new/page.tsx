'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { Sparkles, Save, Copy, RefreshCw, Check } from 'lucide-react';
import Image from 'next/image';

export default function NewFact() {
  const { t, language, translate, mounted } = useLanguage();
  const [originalFact, setOriginalFact] = useState<string | null>(null);
  const [fact, setFact] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setSaved(false);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      
      setOriginalFact(data.fact);
      const translatedFact = await translate(data.fact);
      setFact(translatedFact);

      const word = data.fact.split(" ")[0].toLowerCase();
      const imageUrl = `https://cataas.com/cat/says/${word}?size=50&color=white`;
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFact(t.common.error);
      setImage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Re-translate if language changes
  useEffect(() => {
    if (originalFact) {
      translate(originalFact).then(setFact);
    }
  }, [language, originalFact]);

  const handleSaveFact = () => {
    if (fact && image) {
      const savedFacts = JSON.parse(localStorage.getItem('savedFacts') || '[]');
      savedFacts.push({ fact, image });
      localStorage.setItem('savedFacts', JSON.stringify(savedFacts));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleCopyToClipboard = () => {
    if (fact) {
      navigator.clipboard.writeText(fact);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-[#0a0a0a]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <div className="mt-4 text-blue-500 font-medium animate-pulse">{t.common.loading}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] pt-24 sm:pt-32 pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full animate-pulse [animation-delay:2s]" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold mb-6 border border-blue-100 dark:border-blue-800/50">
          <Sparkles size={16} />
          <span>{t.hero.catLovers}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12 text-center leading-tight">
          {t.hero.cta}
        </h1>

        <div className="w-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row shadow-blue-500/5">
          <div className="md:w-1/2 relative h-[250px] sm:h-[350px] md:h-auto">
            {image && (
              <Image 
                src={image} 
                alt="Cat" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                fill
                priority
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600";
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/60 md:from-gray-900/40 to-transparent" />
          </div>

          <div className="md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-6 sm:mb-8">
              <span className="text-3xl sm:text-4xl">🐾</span>
              <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-200 font-medium italic leading-relaxed">
                "{fact}"
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  onClick={handleSaveFact}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 active:scale-95 ${
                    saved 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-[1.02]'
                  }`}
                >
                  {saved ? <Check size={20} /> : <Save size={20} />}
                  <span className="text-sm sm:text-base">{saved ? t.card.copied : (language === 'es' ? 'Guardar' : 'Save')}</span>
                </button>

                <button
                  onClick={handleCopyToClipboard}
                  className={`px-4 sm:px-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 font-bold transition-all duration-300 active:scale-95 ${
                    copied 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>

              <button
                onClick={fetchData}
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95 group"
              >
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-sm sm:text-base">{language === 'es' ? 'Siguiente dato' : 'Next fact'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
