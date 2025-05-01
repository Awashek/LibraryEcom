import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Wishlist from './components/Wishlist';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/about" element={<div className="max-w-7xl mx-auto px-4 py-8">About Page Coming Soon</div>} />
            <Route path="/features" element={<div className="max-w-7xl mx-auto px-4 py-8">Features Page Coming Soon</div>} />
            <Route path="/pricing" element={<div className="max-w-7xl mx-auto px-4 py-8">Pricing Page Coming Soon</div>} />
            <Route path="/gallery" element={<div className="max-w-7xl mx-auto px-4 py-8">Gallery Page Coming Soon</div>} />
            <Route path="/team" element={<div className="max-w-7xl mx-auto px-4 py-8">Team Page Coming Soon</div>} />
            <Route path="/books" element={<div className="max-w-7xl mx-auto px-4 py-8">Books Page Coming Soon</div>} />
            <Route path="/categories" element={<div className="max-w-7xl mx-auto px-4 py-8">Categories Page Coming Soon</div>} />
            <Route path="/category/:id" element={<div className="max-w-7xl mx-auto px-4 py-8">Category Detail Page Coming Soon</div>} />
            <Route path="/basket" element={<div className="max-w-7xl mx-auto px-4 py-8">Basket Page Coming Soon</div>} />
            <Route path="/wishlist" element={<div className="max-w-7xl mx-auto px-4 py-8">Wishlist Page Coming Soon</div>} />
            <Route path="/account" element={<div className="max-w-7xl mx-auto px-4 py-8">Account Page Coming Soon</div>} />
            <Route path="/privacy-policy" element={<div className="max-w-7xl mx-auto px-4 py-8">Privacy Policy Page Coming Soon</div>} />
            <Route path="/terms-of-use" element={<div className="max-w-7xl mx-auto px-4 py-8">Terms of Use Page Coming Soon</div>} />
            <Route path="/sales-and-refunds" element={<div className="max-w-7xl mx-auto px-4 py-8">Sales and Refunds Page Coming Soon</div>} />
            <Route path="/legal" element={<div className="max-w-7xl mx-auto px-4 py-8">Legal Page Coming Soon</div>} />
            <Route path="*" element={<div className="max-w-7xl mx-auto px-4 py-8">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;