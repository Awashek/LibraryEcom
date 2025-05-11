import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Changed from FaHome to FaArrowLeft
import { ChevronLeft } from 'lucide-react';

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className='relative z-10'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 text-gray-700 hover:text-black transition-colors mb-6'
      >
        <ChevronLeft size={20} />
        <span className='font-medium'>Back</span>
      </button>
    </div>
  );
}

export default BackButton;
