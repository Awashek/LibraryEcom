import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../components/BackButton';
import axios from '../../utils/axios/axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    address: '',
    imageUrl: null,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('Name', formData.name);
      formDataToSend.append('Email', formData.email);
      formDataToSend.append('Password', formData.password);
      formDataToSend.append('ConfirmPassword', formData.confirmPassword);
      formDataToSend.append('Gender', formData.gender);
      if (formData.address) formDataToSend.append('Address', formData.address);
      if (formData.imageUrl)
        formDataToSend.append('ImageUrl', formData.imageUrl);

      const response = await axios.post(
        '/api/authentication/register/self',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toast.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className='bg-white overflow-hidden max-w-3xl w-full p-12 shadow-xl rounded-lg relative'>
        <div className='absolute inset-0 z-0 bg-white'></div>

        <div className='relative z-10'>
          <BackButton />
          <h1 className='text-3xl font-bold mb-6'>Welcome to Bookish</h1>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  FULL NAME
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className={`w-full p-2 border-b ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-gray-500`}
                  placeholder='Enter your full name'
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  EMAIL
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className={`w-full p-2 border-b ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-gray-500`}
                  placeholder='Enter your email address'
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  PASSWORD
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  className={`w-full p-2 border-b ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-gray-500`}
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className='text-xs text-gray-500 mt-1'>
                  Must be at least 8 characters
                </p>
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  CONFIRM PASSWORD
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  className={`w-full p-2 border-b ${
                    errors.confirmPassword
                      ? 'border-red-500'
                      : 'border-gray-300'
                  } focus:outline-none focus:border-gray-500`}
                  placeholder='Confirm your password'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='gender'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  GENDER
                </label>
                <select
                  id='gender'
                  name='gender'
                  className={`w-full p-2 border-b ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-gray-500`}
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value=''>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Other'>Other</option>
                </select>
                {errors.gender && (
                  <p className='text-red-500 text-xs mt-1'>{errors.gender}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor='address'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  ADDRESS (OPTIONAL)
                </label>
                <input
                  type='text'
                  id='address'
                  name='address'
                  className='w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500'
                  placeholder='Enter your address'
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor='imageUrl'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  PROFILE PICTURE (OPTIONAL)
                </label>
                <input
                  type='file'
                  id='imageUrl'
                  name='imageUrl'
                  className='w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-black file:text-white
                                        hover:file:bg-gray-800'
                  accept='image/*'
                  onChange={handleChange}
                />
                <p className='text-xs text-gray-500 mt-1'>Max file size: 5MB</p>
              </div>

              <div>
                <button
                  type='submit'
                  disabled={isLoading}
                  className='w-full bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-70'
                >
                  {isLoading ? 'Processing...' : 'Sign Up'}
                </button>
              </div>

              <div className='text-center text-sm text-gray-600'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium hover:underline cursor-pointer'
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
