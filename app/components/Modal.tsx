import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import { X, Copy } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fact: string;
  image: string;
}

export default function Modal({ isOpen, onClose, fact, image }: ModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-[100] p-4 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-[2.5rem] shadow-2xl max-w-xl w-full relative animate-in fade-in zoom-in duration-300 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <div className="relative h-64 w-full mb-8 overflow-hidden rounded-[1.5rem] shadow-lg">
          <Image src={image} alt="Cat" className="w-full h-full object-cover" fill />
        </div>

        <p className="text-xl text-gray-700 dark:text-gray-200 font-medium italic mb-8 leading-relaxed text-center">
          "{fact}"
        </p>

        <div className="flex gap-4">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(fact);
            }} 
            className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
          >
            <Copy size={20} />
            {t.card.copy}
          </button>
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
          >
            {t.nav.home} 
          </button>
        </div>
      </div>
    </div>
  );
}
