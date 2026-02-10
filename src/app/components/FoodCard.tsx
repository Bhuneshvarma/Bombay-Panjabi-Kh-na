import { Link } from 'react-router-dom';
import { Star, Plus } from 'lucide-react';
import { MenuItem } from '../context/AppContext';
import { useApp } from '../context/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FoodCardProps {
  item: MenuItem;
}

export function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(item);
  };

  return (
    <Link to={`/food/${item.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xl font-bold text-orange-500">
              ₹{item.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
