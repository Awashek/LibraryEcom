import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';

const UpdateAuthor = ({ isOpen, onClose, author, onSave, axios }) => {
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    birthDate: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when author changes
  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || '',
        biography: author.biography || '',
        birthDate: author.birthDate
          ? new Date(author.birthDate).toISOString().slice(0, 16)
          : '',
      });
    }
  }, [author]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formattedData = {
        name: formData.name,
        biography: formData.biography,
        birthDate: formData.birthDate
          ? new Date(formData.birthDate).toISOString()
          : null,
      };

      await axios.put(`/api/author/${author.id}`, formattedData);
      toast.success('Author updated successfully');
      if (typeof onSave === 'function') {
        onSave(); // Call the refetch function
      }
      onClose();
    } catch (err) {
      console.error('Error updating author:', err);
      setError('Failed to update author');
      toast.error('Error updating author');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !author) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div
          className='fixed inset-0 transition-opacity'
          aria-hidden='true'
          onClick={onClose}
        >
          <div className='absolute inset-0 bg-black opacity-75 backdrop-blur-3xl'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='flex justify-between items-start'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Edit Author
              </h3>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-500'
              >
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm'>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name*
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg'
                  placeholder='Enter author name'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Biography
                </label>
                <textarea
                  name='biography'
                  value={formData.biography}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg'
                  placeholder='Enter author biography'
                  rows={4}
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Birth Date
                </label>
                <input
                  type='datetime-local'
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg'
                />
              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <button
                  type='button'
                  className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAuthor;
