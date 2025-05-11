import { Link, Outlet, useLocation } from 'react-router-dom';
import useAxios from '../utils/axios/useAxios';
import { useState, useRef } from 'react';
import useAxiosAuth from '../utils/axios/useAxiosAuth';

const ProfileLayout = () => {
  const location = useLocation();
  const axiosAuth = useAxiosAuth();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const navItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/profile/myorders', label: 'My Orders' },
    { path: '/profile/my-reviews', label: 'My Reviews' },
    { path: '/profile/wishlist', label: 'My Wishlist' },
  ];

  const { data: usersData, refetch } = useAxios('profile');
  const user = usersData?.result;

  const getImageUrl = () => {
    if (!user?.imageURL) return null;
    const cleanPath = user.imageURL.replace(/\/+/g, '/');
    return `http://localhost:7226/${cleanPath}`;
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('Image', file);

    setIsUploading(true);

    axiosAuth
      .put('api/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        refetch(); // Refresh user data
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        // Add error handling here
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <div className='flex min-h-screen max-w-7xl mx-auto my-10'>
      {/* Left Sidebar Navigation */}
      <div className='w-80 bg-white border-r'>
        <div className='flex flex-col items-center pt-8 pb-6'>
          <div className='w-32 h-32 rounded-full overflow-hidden mb-4 relative group cursor-pointer'>
            {isUploading ? (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                <span className='text-sm text-gray-500'>Uploading...</span>
              </div>
            ) : getImageUrl() ? (
              <>
                <img
                  src={getImageUrl()}
                  alt='Profile'
                  className='w-full h-full object-cover group-hover:opacity-75 transition-opacity'
                  onClick={handleImageClick}
                />
                <div
                  className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all'
                  onClick={handleImageClick}
                >
                  <span className='text-white text-sm font-medium'>
                    Change Photo
                  </span>
                </div>
              </>
            ) : (
              <div
                className='w-full h-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition'
                onClick={handleImageClick}
              >
                <span className='text-sm text-gray-500'>Add Photo</span>
              </div>
            )}
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept='image/*'
              className='hidden'
            />
          </div>
          <h2 className='text-2xl font-medium'>{user?.name || 'User'}</h2>
        </div>

        <nav className='mt-2'>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block py-4 px-6 text-lg relative ${
                    location.pathname === item.path
                      ? 'bg-gray-100 font-medium'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {location.pathname === item.path && (
                    <span className='absolute left-0 top-0 h-full w-1.5 bg-gray-800 rounded-r'></span>
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 bg-gray-50'>
        <Outlet context={{ user, refetch }} />
      </div>
    </div>
  );
};

export default ProfileLayout;
