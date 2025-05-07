import React from 'react';
import { X } from 'lucide-react';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';

const AddAuthorModal = ({ isOpen, onClose, onSave }) => {
  const axios = useAxiosAuth();
  const [formData, setFormData] = React.useState({
    name: '',
    biography: '',
    birthDate: '',
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form when modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        biography: '',
        birthDate: '',
      });
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Don't try to convert empty dates
    let authorData = { ...formData };

    if (formData.birthDate) {
      // Convert birthDate to ISO string for backend
      try {
        const dateOnly = formData.birthDate.split('T')[0]; // Extract YYYY-MM-DD
        authorData = {
          ...formData,
          birthDate: dateOnly,
        };
      } catch (err) {
        setError('Invalid date format');
        setIsSubmitting(false);
        return;
      }
    }

    axios
      .post('/api/author', authorData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        // notify the parent that an author was added successfully
        onSave();
        onClose();
        // Reset the form
        setFormData({
          name: '',
          biography: '',
          birthDate: '',
        });
      })
      .catch((error) => {
        console.error('Error adding author:', error);
        setError('An error occurred while creating the author');
        toast.error('Error adding author');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
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
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-medium text-gray-900'>
                Add New Author
              </h3>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-gray-500'
              >
                <X size={20} />
              </button>
            </div>
            {error && <div className='mb-4 text-red-600 text-sm'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='biography'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Biography
                </label>
                <textarea
                  id='biography'
                  name='biography'
                  rows={3}
                  value={formData.biography}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='birthDate'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Birth Date
                </label>
                <input
                  type='datetime-local'
                  id='birthDate'
                  name='birthDate'
                  value={formData.birthDate}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
              <div className='mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Adding...' : 'Add Author'}
                </button>
                <button
                  type='button'
                  onClick={onClose}
                  disabled={isSubmitting}
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAuthorModal;