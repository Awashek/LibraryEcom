import { useState } from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function AdminLayout() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState('/dashboard');

  const inactiveLink =
    'flex items-center gap-3 p-3 transition-all duration-200 hover:bg-gray-800 rounded-lg';
  const activeLink =
    'flex items-center gap-3 p-3 bg-gray-800 text-white rounded-lg';

  const handleNavigation = (path) => {
    setActivePath(path);
    window.location.href = path;
  };

  const handleLogout = () => {
    signOut(); // This will clear the auth state and cookies
    toast.success('Logged out successfully');
    navigate('/homepage'); // Redirect to login page after logout
  };

  return (
    <aside className='bg-gray-900 text-gray-400 p-4 min-h-screen shadow-lg w-72'>
      <div className='flex items-center pl-14 pt-4 pb-4'>
          <Link to='' className='flex items-center'>
            <img
              className='h-5 w-auto'
              src='/images/BOOKISH.svg'
              alt='BookShop Logo'
            />
          </Link>
        </div>

      <nav className='flex flex-col gap-1'>
        <div className='text-xs uppercase tracking-wider py-3 px-2 text-gray-500 font-medium'>
          Main Menu
        </div>

        <a
          href='/dashboard'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/dashboard');
          }}
          className={activePath === '/' ? activeLink : inactiveLink}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
            />
          </svg>
          Dashboard
        </a>

        <a
          href='/books-management'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/books-management');
          }}
          className={
            activePath.includes('/books-management') ? activeLink : inactiveLink
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
            />
          </svg>
          Books Management
        </a>

        <a
          href='/announcement'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/announcement');
          }}
          className={
            activePath.includes('/categories') ? activeLink : inactiveLink
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            className='w-5 h-5'
          >
            <g
              fill='none'
              fillRule='evenodd'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              transform='translate(2 2)'
            >
              <path d='M14.2855094 9.76996262e-15L17.5521036 9.76996262e-15C18.9036211 9.76996262e-15 20 1.10589743 20 2.47018211L20 5.76410278C20 7.12735391 18.9036211 8.23428489 17.5521036 8.23428489L14.2855094 8.23428489C12.9329672 8.23428489 11.8365883 7.12735391 11.8365883 5.76410278L11.8365883 2.47018211C11.8365883 1.10589743 12.9329672 9.76996262e-15 14.2855094 9.76996262e-15zM2.44892104 9.76996262e-15L5.71449064 9.76996262e-15C7.06703281 9.76996262e-15 8.16341169 1.10589743 8.16341169 2.47018211L8.16341169 5.76410278C8.16341169 7.12735391 7.06703281 8.23428489 5.71449064 8.23428489L2.44892104 8.23428489C1.09637888 8.23428489 3.55271368e-15 7.12735391 3.55271368e-15 5.76410278L3.55271368e-15 2.47018211C3.55271368e-15 1.10589743 1.09637888 9.76996262e-15 2.44892104 9.76996262e-15zM2.44892104 11.7657151L5.71449064 11.7657151C7.06703281 11.7657151 8.16341169 12.8716125 8.16341169 14.2369308L8.16341169 17.5298179C8.16341169 18.8941026 7.06703281 20 5.71449064 20L2.44892104 20C1.09637888 20 3.55271368e-15 18.8941026 3.55271368e-15 17.5298179L3.55271368e-15 14.2369308C3.55271368e-15 12.8716125 1.09637888 11.7657151 2.44892104 11.7657151zM14.2855094 11.7657151L17.5521036 11.7657151C18.9036211 11.7657151 20 12.8716125 20 14.2369308L20 17.5298179C20 18.8941026 18.9036211 20 17.5521036 20L14.2855094 20C12.9329672 20 11.8365883 18.8941026 11.8365883 17.5298179L11.8365883 14.2369308C11.8365883 12.8716125 12.9329672 11.7657151 14.2855094 11.7657151z'></path>
            </g>
          </svg>
          Announcement
        </a>

        <a
          href='/UserManagement'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/UserManagement');
          }}
          className={
            activePath.includes('/adduser') ? activeLink : inactiveLink
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
            />
          </svg>
           Discount Management
        </a>

        <a
          href='/author-management'
          onClick={(e) => {
            e.preventDefault();
            handleNavigation('/author-management');
          }}
          className={
            activePath.includes('/add-author') ? activeLink : inactiveLink
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z'
            />
          </svg>
          Author Management
        </a>

        <div className='mt-auto'>
          <button
            onClick={handleLogout}
            className='flex items-center gap-3 p-3 w-full text-left transition-all duration-200 text-gray-400 hover:bg-gray-800 hover:text-red-400 rounded-lg'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
              />
            </svg>
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}
