'use client';
import { useEffect, useState } from 'react';

export default function NewFact() {
  const [fact, setFact] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      setFact(data.fact);

      const word = data.fact.split(" ")[0].toLowerCase();
      const imageUrl = `https://cataas.com/cat/says/${word}?size=50&color=white`;
      setImage(imageUrl);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setFact('Ocurrió un error al obtener la curiosidad.');
      setImage(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveFact = () => {
    if (fact && image) {
      const savedFacts = JSON.parse(localStorage.getItem('savedFacts') || '[]');
      savedFacts.push({ fact, image });
      localStorage.setItem('savedFacts', JSON.stringify(savedFacts));
      alert('Curiosidad guardada');
    }
  };

  const handleCopyToClipboard = () => {
    if (fact) {
      navigator.clipboard.writeText(fact);
      alert('Curiosidad copiada al portapapeles');
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Nueva curiosidad</h1>

      {image && (
        <img 
          src={image} 
          alt="Gato"
          className="mb-6 w-52 h-52 object-cover rounded-lg shadow-md"
        />
      )}

      {fact && (
        <p className="text-lg sm:text-xl text-center mb-6 px-4 sm:px-8">
          {fact}
        </p>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          onClick={handleSaveFact}
        >
          Guardar curiosidad
        </button>

        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          onClick={handleCopyToClipboard}
        >
          Copiar curiosidad
        </button>

        <button
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          onClick={fetchData}
        >
          Siguiente curiosidad
        </button>
      </div>
    </div>
  );
}
