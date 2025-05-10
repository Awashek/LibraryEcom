import { useState, useEffect } from 'react';
import {
  X, Calendar, Percent
} from 'lucide-react';

export default function DiscountModal({ isOpen, onClose, book, onSubmit }) {
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSaleFlag, setIsSaleFlag] = useState(false);

  useEffect(() => {
    if (book) {
      // Reset form on book change or modal open
      setDiscountPercentage('');
      setStartDate('');
      setEndDate('');
      setIsSaleFlag(false);
    }
  }, [book]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      bookId: book.id,
      discountPercentage: parseFloat(discountPercentage),
      startDate,
      endDate,
      isSaleFlag,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Add Discount for {book?.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage</label>
            <div className="relative">
              <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                min="0"
                max="100"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isSaleFlag"
              type="checkbox"
              checked={isSaleFlag}
              onChange={() => setIsSaleFlag(!isSaleFlag)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="isSaleFlag" className="text-sm text-gray-700">Mark as Sale</label>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Save Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
