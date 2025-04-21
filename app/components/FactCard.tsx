import { useEffect, useState } from 'react';

export default function FactCard({ fact, image, onCopy, onClick }: any) {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <img src={image} alt="Cat" className="mb-4 w-full h-40 object-cover rounded-lg" />
      <p className="text-lg text-center mb-4">{fact}</p>
      <div className="flex justify-center gap-4">
        <button onClick={onCopy} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          {language === 'es' ? 'Copiar curiosidad' : 'Copy fact'}
        </button>
        <button onClick={onClick} className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
          {language === 'es' ? 'Ver detalle' : 'View detail'}
        </button>
      </div>
    </div>
  );
}
