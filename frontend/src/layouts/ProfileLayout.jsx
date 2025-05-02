import { Link, Outlet, useLocation } from 'react-router-dom';

const ProfileLayout = () => {
  const location = useLocation();
  const navItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/profile/rented', label: 'Rented Books' },
    { path: '/profile/booked', label: 'Booked Books' },
    { path: '/profile/saved', label: 'Saved Books' },
    { path: '/profile/history', label: 'Books History' },
  ];
  
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar Navigation */}
      <div className="w-80 bg-white border-r">
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img 
              src="/api/placeholder/150/150" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-medium">Full Name</h2>
        </div>
        
        <nav className="mt-2">
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
                    <span className="absolute left-0 top-0 h-full w-1.5 bg-gray-800 rounded-r"></span>
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;