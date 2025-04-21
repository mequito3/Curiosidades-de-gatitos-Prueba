import Image from 'next/image';
// Definimos la interfaz para las propiedades del componente
interface FactCardProps {
  fact: string;
  image: string;
  onCopy: () => void;
  onClick: () => void;
}

export default function FactCard({ fact, image, onCopy, onClick }: FactCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
      <Image src={image} alt="Cat" className="mb-4 w-full h-40 object-cover rounded-lg" />
      <p className="text-lg text-center mb-4">{fact}</p>
      <div className="flex justify-center gap-4">
        <button onClick={onCopy} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Copiar
        </button>
        <button onClick={onClick} className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700">
          Ver detalle
        </button>
      </div>
    </div>
  );
}
