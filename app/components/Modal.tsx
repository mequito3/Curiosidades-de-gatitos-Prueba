import Image from 'next/image';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  fact: string;
  image: string;
}

export default function Modal({ isOpen, onClose, fact, image }: ModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 dark:text-gray-200">
          ✖
        </button>
        <Image src={image} alt="Cat" className="mb-4 w-full h-40 object-cover rounded-lg" />
        <p className="text-lg text-center mb-4">{fact}</p>
        <button onClick={() => navigator.clipboard.writeText(fact)} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Copiar
        </button>
      </div>
    </div>
  );
}
