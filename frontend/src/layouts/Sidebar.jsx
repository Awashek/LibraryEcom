import { useAppContext } from '../../context/AppContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const menuItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'rented', label: 'Rented Books' },
    { id: 'booked', label: 'Booked Books' },
    { id: 'saved', label: 'Saved Books' },
    { id: 'history', label: 'Books History' }
  ];

  return (
    <nav className="mt-8">
      {menuItems.map((item) => (
        <div 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`px-6 py-4 cursor-pointer hover:bg-gray-100 ${activeTab === item.id ? 'border-l-4 border-blue-500 bg-gray-100' : ''}`}
        >
          <span className="text-gray-800 font-medium">{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;