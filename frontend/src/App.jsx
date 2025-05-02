import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';


// Component that conditionally renders Navbar and Footer
const AppLayout = () => {
  const location = useLocation();
  const authPages = ['/login', '/register'];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className={`flex-grow ${!isAuthPage ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
         

          {/* Static */}
          <Route path="/about" element={<div className="max-w-7xl mx-auto px-4 py-8">About Page Coming Soon</div>} />
          <Route path="/features" element={<div className="max-w-7xl mx-auto px-4 py-8">Features Page Coming Soon</div>} />
          <Route path="/pricing" element={<div className="max-w-7xl mx-auto px-4 py-8">Pricing Page Coming Soon</div>} />
          <Route path="/gallery" element={<div className="max-w-7xl mx-auto px-4 py-8">Gallery Page Coming Soon</div>} />
          <Route path="/team" element={<div className="max-w-7xl mx-auto px-4 py-8">Team Page Coming Soon</div>} />
          <Route path="/books" element={<div className="max-w-7xl mx-auto px-4 py-8">Books Page Coming Soon</div>} />
          <Route path="/categories" element={<div className="max-w-7xl mx-auto px-4 py-8">Categories Page Coming Soon</div>} />
          <Route path="/category/:id" element={<div className="max-w-7xl mx-auto px-4 py-8">Category Detail Page Coming Soon</div>} />
          <Route path="/basket" element={<div className="max-w-7xl mx-auto px-4 py-8">Basket Page Coming Soon</div>} />
          {/* Removed duplicate wishlist route */}
          <Route path="/account" element={<div className="max-w-7xl mx-auto px-4 py-8">Account Page Coming Soon</div>} />
          <Route path="/privacy-policy" element={<div className="max-w-7xl mx-auto px-4 py-8">Privacy Policy Page Coming Soon</div>} />
          <Route path="/terms-of-use" element={<div className="max-w-7xl mx-auto px-4 py-8">Terms of Use Page Coming Soon</div>} />
          <Route path="/sales-and-refunds" element={<div className="max-w-7xl mx-auto px-4 py-8">Sales and Refunds Page Coming Soon</div>} />
          <Route path="/legal" element={<div className="max-w-7xl mx-auto px-4 py-8">Legal Page Coming Soon</div>} />
          <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-8">404 - Page Not Found</div>} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;