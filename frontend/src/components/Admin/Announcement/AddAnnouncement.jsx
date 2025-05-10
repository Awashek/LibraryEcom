import React, { useState } from 'react';
import { ArrowLeft, Calendar, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';
import { toast } from 'react-toastify';

export default function AddAnnouncement() {
  const navigate = useNavigate();
  const axios = useAxiosAuth();

  // Form state and error handling
  const [formData, setFormData] = useState({
    message: '',
    startDate: '',
    endDate: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Convert dates to ISO 8601 format
    const formattedStartDate = new Date(formData.startDate).toISOString();
    const formattedEndDate = new Date(formData.endDate).toISOString();

    // Prepare the data with formatted dates
    const announcementData = {
      message: formData.message,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    axios
      .post('/api/announcements', announcementData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        toast.success('Announcement added sucessfully.');
        navigate('/announcement');
      })
      .catch((err) => {
        setError('An error occurred while creating the announcement.');
        toast.error('Error adding announcement.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />

      <div className='flex-1 p-6 lg:p-8'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center mb-6'>
            <button
              onClick={() => navigate(-1)}
              className='mr-4 p-2 rounded-md hover:bg-gray-100'
            >
              <ArrowLeft size={20} className='text-gray-600' />
            </button>
            <h1 className='text-2xl font-bold text-gray-800'>
              New Announcement
            </h1>
          </div>

          {error && (
            <div className='mb-6 p-4 bg-red-100 text-red-700 rounded-lg'>
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'
          >
            <h2 className='text-lg font-semibold mb-4 flex items-center'>
              <Bell size={18} className='mr-2' />
              Announcement Details
            </h2>

            <div className='space-y-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Message*
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full p-3 border border-gray-300 rounded-lg'
                  placeholder='Enter your announcement message'
                  rows={4}
                  required
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Start Date*
                  </label>
                  <div className='flex items-center'>
                    <Calendar
                      size={16}
                      className='text-gray-500 absolute ml-3'
                    />
                    <input
                      type='datetime-local'
                      name='startDate'
                      value={formData.startDate}
                      onChange={handleChange}
                      className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    End Date
                  </label>
                  <div className='flex items-center'>
                    <Calendar
                      size={16}
                      className='text-gray-500 absolute ml-3'
                    />
                    <input
                      type='datetime-local'
                      name='endDate'
                      value={formData.endDate}
                      onChange={handleChange}
                      className='w-full p-3 pl-10 border border-gray-300 rounded-lg'
                    />
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50'
                >
                  {isSubmitting ? 'Creating...' : 'Create Announcement'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
