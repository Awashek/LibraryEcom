import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import TestConnection from '../pages/admin/TestConnection'; // adjust path
import Login from '../pages/account/Login';
import Register from '../pages/account/Register';
import HomePage from '../pages/user/HomePage';
import WishlistPage from '../pages/user/WishlistPage';
import CartPage from '../pages/user/CartPage';
import BookDetails from '../pages/user/BookDetails';
import ProfileLayout from '../layouts/ProfileLayout';
import ProfilePage from '../pages/user/profile/ProfilePage';
import RentedBooksPage from '../pages/user/profile/RentedBooksPage';
import BookedBooksPage from '../pages/user/profile/BookedBooksPage';
import SavedBooksPage from '../pages/user/profile/SavedBooksPage';
import BooksHistoryPage from '../pages/user/profile/BookHistoryPage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DashboardPage from '../pages/admin/DashboardPage';
import AllBooksPage from '../pages/user/AllBooksPage';
import GenresAndTheam from '../pages/user/GenresAndThem';
import ProtectedRoute from './ProtectedRoute';
import UserManagement from '../pages/admin/UserManagement';
import AnnouncementPage from '../pages/admin/AnnouncementPage';
import AddAnnouncement from '../components/Admin/Announcement/AddAnnouncement';
import AuthorDescription from '../pages/user/AuthorDescription';
import BooksManagementPage from '../pages/admin/BooksManagementPage';
import AddBook from '../components/Admin/BooksManagement/AddBook';
import AuthorsManagementPage from '../pages/admin/AuthorManagementPage';
import AddAuthor from '../components/Admin/AuthorManagement/AddAuthor';
import UpdateAuthor from '../components/Admin/AuthorManagement/UpdateAuthor';

const Layout = ({ children }) => {
  const location = useLocation();
  const authPages = [
    '/login',
    '/register',
    '/dashboard',
    '/books-management',
    '/add-book',
    '/announcement',
    '/add-announcement',
    '/UserManagement',
    '/author-management',
    '/add-author',
    '/edit-author',
  ];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className='flex flex-col min-h-screen'>
      {!isAuthPage && <Navbar />}
      <main className={`flex-grow ${!isAuthPage ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const Routing = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<HomePage />} />
          <Route path='/allbooks' element={<AllBooksPage />} />
          <Route path='/test-connection' element={<TestConnection />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='genresandthem' element={<GenresAndTheam />} />

          {/* Protected Routes for Users (regular users) */}
          <Route element={<ProtectedRoute allowedRoles={['User']} />} />
          <Route path='/wishlist' element={<WishlistPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/bookdetails' element={<BookDetails />} />
          <Route path='authordescription' element={<AuthorDescription />} />

          {/* Profile routes */}
          <Route path='/profile' element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path='rented' element={<RentedBooksPage />} />
            <Route path='booked' element={<BookedBooksPage />} />
            <Route path='saved' element={<SavedBooksPage />} />
            <Route path='history' element={<BooksHistoryPage />} />
          </Route>

          {/* Profile routes */}
          <Route path='/profile' element={<ProfileLayout />}>
            <Route index element={<ProfilePage />} />
            <Route path='rented' element={<RentedBooksPage />} />
            <Route path='booked' element={<BookedBooksPage />} />
            <Route path='saved' element={<SavedBooksPage />} />
            <Route path='history' element={<BooksHistoryPage />} />
          </Route>

          {/* Protected Routes for Admin only */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/books-management' element={<BooksManagementPage />} />
            <Route path='/add-book' element={<AddBook />} />
            <Route path='/announcement' element={<AnnouncementPage />} />
            <Route path='/add-announcement' element={<AddAnnouncement />} />
            <Route path='/UserManagement' element={<UserManagement />} />
            <Route
              path='/author-management'
              element={<AuthorsManagementPage />}
            />
            <Route path='/add-author' element={<AddAuthor />} />
            <Route path='/edit-author' element={<UpdateAuthor />} />
          </Route>

          {/* Static pages public */}
          <Route
            path='/about'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                About Page Coming Soon
              </div>
            }
          />
          <Route
            path='/features'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Features Page Coming Soon
              </div>
            }
          />
          <Route
            path='/pricing'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Pricing Page Coming Soon
              </div>
            }
          />
          <Route
            path='/gallery'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Gallery Page Coming Soon
              </div>
            }
          />
          <Route
            path='/team'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Team Page Coming Soon
              </div>
            }
          />
          <Route
            path='/books'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Books Page Coming Soon
              </div>
            }
          />
          <Route
            path='/categories'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Categories Page Coming Soon
              </div>
            }
          />
          <Route
            path='/category/:id'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Category Detail Page Coming Soon
              </div>
            }
          />
          <Route
            path='/basket'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Basket Page Coming Soon
              </div>
            }
          />
          {/* Removed duplicate wishlist route */}
          <Route
            path='/account'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Account Page Coming Soon
              </div>
            }
          />
          <Route
            path='/privacy-policy'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Privacy Policy Page Coming Soon
              </div>
            }
          />
          <Route
            path='/terms-of-use'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Terms of Use Page Coming Soon
              </div>
            }
          />
          <Route
            path='/sales-and-refunds'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Sales and Refunds Page Coming Soon
              </div>
            }
          />
          <Route
            path='/legal'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                Legal Page Coming Soon
              </div>
            }
          />
          <Route
            path='*'
            element={
              <div className='max-w-7xl mx-auto px-4 py-8'>
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

const StaticPage = ({ title }) => (
  <div className='max-w-7xl mx-auto px-4 py-8'>{title} Page Coming Soon</div>
);
export default Routing;
