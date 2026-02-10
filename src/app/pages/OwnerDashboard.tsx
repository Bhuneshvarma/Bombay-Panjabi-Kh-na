import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  IndianRupee,
  Users,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, orders } = useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');

  // Check if user is owner (simple check for demo)
  if (!user || user.email !== 'owner@foodhub.com') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Owner login required to view this page</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Login as Owner
          </button>
        </div>
      </div>
    );
  }

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing');
  const completedOrders = orders.filter(o => o.status === 'delivered');
  
  const todayRevenue = orders
    .filter(o => o.date === new Date().toISOString().split('T')[0])
    .reduce((sum, o) => sum + o.total, 0);
  
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalCustomers = new Set(orders.map(o => o.id)).size;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Bombay-Punjabi Khana Management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-orange-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Today's Revenue</p>
            <p className="text-2xl">₹{todayRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl">{totalOrders}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl">₹{totalRevenue.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Customers</p>
            <p className="text-2xl">{totalCustomers}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg">Pending Orders</h3>
            </div>
            <p className="text-3xl text-yellow-600">{pendingOrders.length}</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg">Completed Today</h3>
            </div>
            <p className="text-3xl text-green-600">{completedOrders.length}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg">Avg Order Value</h3>
            </div>
            <p className="text-3xl text-orange-600">
              ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0}
            </p>
          </div>
        </div>

        {/* Orders Management */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 px-6 py-4 text-center transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Pending Orders ({pendingOrders.length})</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`flex-1 px-6 py-4 text-center transition-colors ${
                  activeTab === 'completed'
                    ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Completed ({completedOrders.length})</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'pending' && (
              <div className="space-y-4">
                {pendingOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No pending orders</p>
                  </div>
                ) : (
                  pendingOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          {order.status === 'pending' ? 'New Order' : 'Preparing'}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Items:</p>
                        <div className="space-y-1">
                          {order.items.map((item) => (
                            <p key={item.id} className="text-sm text-gray-900">
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-lg text-orange-500">₹{order.total.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                            Accept
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-4">
                {completedOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No completed orders yet</p>
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Delivered
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Items:</p>
                        <div className="space-y-1">
                          {order.items.map((item) => (
                            <p key={item.id} className="text-sm text-gray-900">
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-lg text-green-600">₹{order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
