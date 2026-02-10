import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { menuItems } from '../data/menu';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  const item = menuItems.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Item not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-orange-500 hover:text-orange-600"
          >
            Go back to menu
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-96 bg-gray-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm mb-3">
                  {item.category}
                </span>
                <h1 className="text-3xl mb-3">{item.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{item.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">150+ reviews</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

              <div className="mb-6">
                <h3 className="text-sm text-gray-500 mb-2">Description</h3>
                <p className="text-gray-700">
                  Made with fresh, high-quality ingredients. Our chefs prepare each dish with care to ensure the best taste and quality. Perfect for any occasion.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-3xl text-orange-500">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-sm text-gray-500">Quantity</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl w-8 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart - ₹{(item.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems
              .filter((i) => i.category === item.category && i.id !== item.id)
              .slice(0, 3)
              .map((similarItem) => (
                <button
                  key={similarItem.id}
                  onClick={() => navigate(`/food/${similarItem.id}`)}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden text-left"
                >
                  <div className="h-40 bg-gray-100">
                    <ImageWithFallback
                      src={similarItem.image}
                      alt={similarItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{similarItem.name}</h3>
                    <p className="text-orange-500 font-semibold">
                      ₹{similarItem.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
