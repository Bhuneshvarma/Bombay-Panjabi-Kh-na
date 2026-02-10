import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { FoodDetails } from './pages/FoodDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Orders } from './pages/Orders';
import { Feedback } from './pages/Feedback';
import { OwnerDashboard } from './pages/OwnerDashboard';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food/:id" element={<FoodDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/owner" element={<OwnerDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}