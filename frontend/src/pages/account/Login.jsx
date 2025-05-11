import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios/axios';
import { toast } from 'react-toastify';
import BackButton from '../../components/common/BackButton';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const signIn = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/authentication/login', {
        email,
        password,
        provider: 'WASM',
      })
      .then((response) => {
        const { token, userDetails, expiresIn = 3600 } = response.data.result;

        // Extract role from userDetails
        const userRole = userDetails?.roleName || 'User'; // Default to User if missing

        const success = signIn({
          auth: {
            token: token,
            type: 'Bearer',
            expiresIn: expiresIn, // seconds
          },
          userState: {
            ...userDetails,
            role: userRole,
          },
          remember: false, // Set to false since we removed the checkbox
        });

        if (success) {
          toast.success('Login successful');

          // Navigate based on role
          switch (userRole) {
            case 'Admin':
              navigate('/dashboard');
              break;
            case 'Staff':
              navigate('/StaffOrdersPanel');
              break;
            case 'User':
            default:
              navigate('/');
              break;
          }
        } else {
          toast.error('Failed to sign in');
        }
      })
      .catch((error) => {
        // Check if error response exists and has a message
        const errorMessage =
          error.response?.data?.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
      });
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <div className='bg-white overflow-hidden max-w-2xl w-full p-12 shadow-xl rounded-lg relative'>
        <div className='absolute inset-0 z-0 bg-white'></div>
        <div className='relative z-10'>
          <BackButton />
          <h2 className='text-2xl font-bold mb-1'>Hello there,</h2>
          <h1 className='text-3xl font-bold mb-6'>Welcome to Bookish</h1>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-6'>
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
                  className='w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block uppercase text-xs font-semibold mb-2'
                >
                  PASSWORD
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    className='w-full p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500 pr-10'
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type='button'
                    className='absolute right-2 top-2 text-gray-500 focus:outline-none'
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <Eye className='h-5 w-5' />
                    ) : (
                      <EyeOff className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex justify-end'>
                <Link
                  to='/reset-password'
                  className='text-sm text-gray-700 hover:underline'
                >
                  Forgot Password?
                </Link>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
                >
                  Login
                </button>
              </div>

              <div className='text-center text-sm text-gray-600'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='font-medium hover:underline cursor-pointer'
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
