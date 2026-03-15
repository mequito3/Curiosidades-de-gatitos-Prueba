import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import { Copy, Eye, Check } from 'lucide-react';
import { useState } from 'react';

interface FactCardProps {
  fact: string;
  image: string;
  onCopy: () => void;
  onClick: () => void;
}

export default function FactCard({ fact, image, onCopy, onClick }: FactCardProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 sm:p-5 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 md:hover:-translate-y-2 flex flex-col h-full">
      <div className="relative h-40 sm:h-48 w-full mb-5 sm:mb-6 overflow-hidden rounded-[1.5rem] flex-shrink-0">
        <Image 
          src={image} 
          alt="Cat" 
          className="w-full h-full object-cover md:group-hover:scale-110 transition-transform duration-700"
          width={400} 
          height={300}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=400";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="px-1 flex flex-col flex-grow">
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-medium leading-relaxed mb-6 line-clamp-4 italic flex-grow">
          &quot;{fact}&quot;
        </p>
        
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={handleCopy} 
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all duration-300 active:scale-95 ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="text-sm sm:text-base">{copied ? t.card.copied : t.card.copy}</span>
          </button>
          
          <button 
            onClick={onClick} 
            className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors active:scale-95"
            title={t.card.details}
          >
            <Eye size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
