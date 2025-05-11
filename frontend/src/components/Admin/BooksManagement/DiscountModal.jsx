import { useState, useEffect } from 'react';
import { X, Calendar, Percent } from 'lucide-react';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';

export default function DiscountModal({ isOpen, onClose, book, onSubmit }) {
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isSaleFlag, setIsSaleFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDiscountId, setCurrentDiscountId] = useState(null);
  const axios = useAxiosAuth();

  useEffect(() => {
    if (book && book.validatedDiscount) {
      // If book has a discount, populate form for editing
      const discount = book.validatedDiscount;
      setDiscountPercentage(discount.discountPercentage.toString());
      setStartDate(discount.startDate);
      setEndDate(discount.endDate);
      setIsActive(discount.isActive);
      setIsSaleFlag(discount.isSaleFlag);
      setCurrentDiscountId(discount.id);
      setIsEditMode(true);
    } else {
      // Reset form for adding new discount
      resetForm();
      setIsEditMode(false);
    }
  }, [book]);

  const resetForm = () => {
    setDiscountPercentage('');
    setStartDate('');
    setEndDate('');
    setIsActive(true);
    setIsSaleFlag(false);
    setCurrentDiscountId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        bookId: book.id,
        discountPercentage: parseFloat(discountPercentage),
        startDate,
        endDate,
        isActive,
        isSaleFlag,
      };

      if (isEditMode) {
        await axios.put(`/api/discount/${currentDiscountId}`, payload);
        toast.success('Discount updated successfully!');
      } else {
        await axios.post('/api/discount', payload);
        toast.success('Discount added successfully!');
      }

      onSubmit(); // Refresh the discounts list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error saving discount:', error);
      toast.error(
        error.response?.data?.message ||
          `Failed to ${isEditMode ? 'update' : 'add'} discount`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentDiscountId) return;

    try {
      setIsLoading(true);
      await axios.delete(`/api/discount/${currentDiscountId}`);
      toast.success('Discount removed successfully!');
      onSubmit(); // Refresh the discounts list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error deleting discount:', error);
      toast.error(error.response?.data?.message || 'Failed to remove discount');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>
            {isEditMode ? 'Edit' : 'Add'} Discount for {book?.title}
          </h2>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-gray-700'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Discount Percentage
            </label>
            <div className='relative'>
              <Percent
                size={14}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <input
                type='number'
                min='1'
                max='100'
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                required
                className='pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full'
                placeholder='0-100%'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Start Date
              </label>
              <div className='relative'>
                <Calendar
                  size={14}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <input
                  type='date'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className='pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                End Date
              </label>
              <div className='relative'>
                <Calendar
                  size={14}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                />
                <input
                  type='date'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  min={startDate || new Date().toISOString().split('T')[0]}
                  className='pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full'
                />
              </div>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <input
                id='isSaleFlag'
                type='checkbox'
                checked={isSaleFlag}
                onChange={() => setIsSaleFlag(!isSaleFlag)}
                className='h-4 w-4 text-indigo-600 border-gray-300 rounded'
              />
              <label htmlFor='isSaleFlag' className='text-sm text-gray-700'>
                Sale Flag
              </label>
            </div>
          </div>

          <div className='flex justify-between gap-2 mt-6'>
            {isEditMode && (
              <button
                type='button'
                onClick={handleDelete}
                disabled={isLoading}
                className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400'
              >
                {isLoading ? 'Deleting...' : 'Remove Discount'}
              </button>
            )}
            <div className='flex gap-2 ml-auto'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 disabled:bg-teal-400'
              >
                {isLoading
                  ? isEditMode
                    ? 'Updating...'
                    : 'Saving...'
                  : isEditMode
                  ? 'Update Discount'
                  : 'Save Discount'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
