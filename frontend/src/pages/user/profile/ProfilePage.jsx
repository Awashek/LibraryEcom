import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useAxiosAuth from '../../../utils/axios/useAxiosAuth';

const ProfilePage = () => {
  const { user, refetch } = useOutletContext();
  const axiosAuth = useAxiosAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    gender: user?.gender || '',
    address: user?.address || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset form data to original user data
    setFormData({
      name: user?.name || '',
      gender: user?.gender || '',
      address: user?.address || '',
    });
  };

  const handleSaveClick = () => {
    setIsLoading(true);
    axiosAuth
      .put('api/profile', formData)
      .then(() => {
        refetch()
          .then(() => {
            setIsEditing(false);
          })
          .catch((error) => {
            console.error('Error refetching user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        // You might want to add error handling here
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='pl-6'>
      <div className='flex justify-between items-center p-8'>
        <h1 className='text-5xl font-bold'>Profile</h1>
        <div className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
          </svg>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-8'>
        <div>
          <label className='block text-gray-500 mb-2'>Full Name</label>
          <input
            name='name'
            type='text'
            value={formData.name}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-md px-4 py-2'
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className='block text-gray-500 mb-2'>Gender</label>
          {isEditing ? (
            <select
              name='gender'
              value={formData.gender}
              onChange={handleInputChange}
              className='w-full border border-gray-300 rounded-md px-4 py-2'
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          ) : (
            <input
              type='text'
              value={formData.gender || 'Not specified'}
              className='w-full border border-gray-300 rounded-md px-4 py-2'
              readOnly
            />
          )}
        </div>

        <div>
          <label className='block text-gray-500 mb-2'>Email Address</label>
          <input
            type='email'
            value={user?.emailAddress || ''}
            className='w-full border border-gray-300 rounded-md px-4 py-2'
            readOnly
          />
        </div>

        <div>
          <label className='block text-gray-500 mb-2'>Address</label>
          <input
            name='address'
            type='text'
            value={formData.address}
            onChange={handleInputChange}
            className='w-full border border-gray-300 rounded-md px-4 py-2'
            readOnly={!isEditing}
            placeholder={!isEditing && !formData.address ? 'Not provided' : ''}
          />
        </div>
      </div>

      <div className='flex mt-2 space-x-4 justify-start p-8'>
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              disabled={isLoading}
              className='px-8 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50'
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancelClick}
              disabled={isLoading}
              className='px-8 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50'
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className='px-8 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition'
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
