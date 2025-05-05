import { useState } from 'react';
import { Search, UserPlus, Filter, X, ChevronDown } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';

export default function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      role: 'Member',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'Staff',
    },
    {
      id: 3,
      firstName: 'Robert',
      lastName: 'Johnson',
      email: 'robert.j@example.com',
      role: 'Member',
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Williams',
      email: 'emily.w@example.com',
      role: 'Staff',
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.b@example.com',
      role: 'Member',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Member',
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    const newUserWithId = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
    };
    setUsers([...users, newUserWithId]);
    setIsModalOpen(false);
    setNewUser({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'Member',
    });
  };

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <AdminLayout />
      <div className='flex-1 p-6 lg:p-8 overflow-x-auto'>
        <div className='w-full mx-auto'>
          {/* Header */}
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
            <div>
              <h1 className='text-2xl font-bold text-gray-800'>
                User Management
              </h1>
              <p className='text-gray-600'>Manage your organization users</p>
            </div>

            <div className='flex flex-wrap gap-3 w-full lg:w-auto'>
              <div className='relative w-full lg:w-72'>
                <Search
                  size={16}
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                />
                <input
                  type='text'
                  placeholder='Search users...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 pr-4 py-2 border border-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300'
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className='flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-700'
              >
                <Filter size={16} />
                <span>Filters</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    showFilters ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className='flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap'
              >
                <UserPlus size={16} />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className='bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200'>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='font-medium text-gray-700'>Filter Options</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <X size={18} />
                </button>
              </div>
              <div className='flex flex-wrap gap-4'>
                <div className='flex flex-col w-full sm:w-auto'>
                  <label className='mb-1 text-sm text-gray-500'>
                    User Role
                  </label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  >
                    <option value='All'>All Roles</option>
                    <option value='Member'>Member</option>
                    <option value='Staff'>Staff</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div className='p-4 border-b border-gray-200'>
              <h2 className='text-lg font-medium text-gray-800'>Users</h2>
              <p className='text-gray-500 text-sm'>
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>

            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Email
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className='hover:bg-gray-50 transition-colors'
                    >
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium mr-3'>
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </div>
                          <div className='text-sm font-medium text-gray-900'>
                            {user.firstName} {user.lastName}
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                        {user.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                        {user.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add User Modal */}
          {isModalOpen && (
            <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
              <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                  Add New User
                </h3>
                <div className='grid gap-4'>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={newUser.firstName}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded-md p-2'
                  />
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={newUser.lastName}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded-md p-2'
                  />
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={newUser.email}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded-md p-2'
                  />
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={newUser.password}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded-md p-2'
                  />
                  <select
                    name='role'
                    value={newUser.role}
                    onChange={handleInputChange}
                    className='border border-gray-300 rounded-md p-2'
                  >
                    <option value='Member'>Member</option>
                    <option value='Staff'>Staff</option>
                  </select>
                </div>

                <div className='mt-6 flex justify-end gap-3'>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
