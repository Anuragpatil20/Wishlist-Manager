import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from 'react-router-dom';
import WishlistForm from './Component/WishlistForm';
import WishlistList from './Component/WishlistList';
import UpdateWishlist from './Component/UpdateWishlist';

// Navbar Component
const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🎁 <span>Wishlist Manager</span>
        </h1>
        <div className="flex gap-6 text-lg">
          <Link
            to="/"
            className={`transition-all ${
              isActive('/')
                ? 'font-bold underline underline-offset-4'
                : 'hover:underline hover:underline-offset-4'
            }`}
          >
            Add Item
          </Link>
          <Link
            to="/wishlist"
            className={`transition-all ${
              isActive('/wishlist')
                ? 'font-bold underline underline-offset-4'
                : 'hover:underline hover:underline-offset-4'
            }`}
          >
            View Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<WishlistForm />} />
            <Route path="/wishlist" element={<WishlistList />} />
            <Route path="/update/:id" element={<UpdateWishlist />} />
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;

