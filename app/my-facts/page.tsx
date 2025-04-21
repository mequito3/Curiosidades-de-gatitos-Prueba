'use client';

import { useEffect, useState } from 'react';
import FactCard from '../components/FactCard'; 
import Modal from '../components/Modal';

export default function MisCuriosidades() {
  // Estado para almacenar las curiosidades guardadas
  const [savedFacts, setSavedFacts] = useState<{ fact: string, image: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFact, setSelectedFact] = useState<{ fact: string, image: string } | null>(null);

  useEffect(() => {
    // Obtener las curiosidades guardadas de localStorage
    const saved = JSON.parse(localStorage.getItem('savedFacts') || '[]');
    setSavedFacts(saved);
  }, []);

  const handleCopyFact = (fact: string) => {
    // Copiar la curiosidad al portapapeles
    navigator.clipboard.writeText(fact);
    alert('Curiosidad copiada al portapapeles');
  };

  const handleOpenModal = (fact: { fact: string, image: string }) => {
    setSelectedFact(fact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Mis Curiosidades</h1>

      {savedFacts.length === 0 ? (
        <p className="text-lg">No has guardado ninguna curiosidad aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedFacts.map((fact, index) => (
            <FactCard
              key={index}
              fact={fact.fact}
              image={fact.image}
              onCopy={() => handleCopyFact(fact.fact)}
              onClick={() => handleOpenModal(fact)}
            />
          ))}
        </div>
      )}

      {/* Modal para ver detalle de la curiosidad */}
      {selectedFact && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          fact={selectedFact.fact}
          image={selectedFact.image}
        />
      )}
    </div>
  );
}
