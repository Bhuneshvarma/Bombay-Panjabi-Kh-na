import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Home, Package, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Navbar() {
  const location = useLocation();
  const { user, cart, logout } = useApp();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🍛</span>
            </div>
            <div>
              <span className="text-xl font-semibold text-gray-900 block leading-tight">Bombay-Punjabi</span>
              <span className="text-xs text-orange-500">Khana</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex flex-col items-center gap-1 ${
                isActive('/') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Link>

            <Link
              to="/cart"
              className={`flex flex-col items-center gap-1 relative ${
                isActive('/cart') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
              <span className="text-xs">Cart</span>
            </Link>

            {user && (
              <Link
                to="/orders"
                className={`flex flex-col items-center gap-1 ${
                  isActive('/orders') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                <Package className="w-5 h-5" />
                <span className="text-xs">Orders</span>
              </Link>
            )}

            <Link
              to="/feedback"
              className={`flex flex-col items-center gap-1 ${
                isActive('/feedback') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Feedback</span>
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-500">
                  <User className="w-5 h-5" />
                  <span className="text-xs">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 hidden group-hover:block">
                  <div className="p-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {user.email === 'owner@foodhub.com' && (
                    <Link
                      to="/owner"
                      className="block w-full px-4 py-2 text-left text-sm text-orange-600 hover:bg-gray-50"
                    >
                      Owner Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className={`flex flex-col items-center gap-1 ${
                  isActive('/login') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}