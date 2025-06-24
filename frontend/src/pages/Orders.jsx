import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Package, Truck, CheckCircle, Clock, Search, Filter } from 'lucide-react';

// Mock orders data (in real app, this would come from API)
const mockOrders = [
  {
    id: 'ORD001',
    date: '2024-06-20',
    status: 'delivered',
    total: 2499,
    items: [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100',
        price: 1299,
        quantity: 1
      },
      {
        id: 2,
        name: 'AirPods Pro',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100',
        price: 249,
        quantity: 1
      }
    ],
    deliveryAddress: '123 Main Street, Mumbai 400001'
  },
  {
    id: 'ORD002',
    date: '2024-06-18',
    status: 'shipped',
    total: 899,
    items: [
      {
        id: 3,
        name: 'Samsung Galaxy Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100',
        price: 299,
        quantity: 1
      }
    ],
    deliveryAddress: '123 Main Street, Mumbai 400001',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD003',
    date: '2024-06-15',
    status: 'processing',
    total: 1599,
    items: [
      {
        id: 4,
        name: 'MacBook Air M2',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100',
        price: 1199,
        quantity: 1
      }
    ],
    deliveryAddress: '123 Main Street, Mumbai 400001'
  }
];

const Orders = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders] = useState(mockOrders);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p className="text-gray-600">Track and manage your orders</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'You haven\'t placed any orders yet. Start shopping to see your orders here!'
                  }
                </p>
                <a
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Shopping
                </a>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center space-x-4 mb-2 md:mb-0">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className="font-semibold text-gray-900">Order #{order.id}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span className="font-semibold">₹{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Delivery Address:</p>
                          <p className="text-gray-900">{order.deliveryAddress}</p>
                          {order.trackingNumber && (
                            <p className="text-sm text-gray-600 mt-2">
                              Tracking: <span className="font-mono">{order.trackingNumber}</span>
                            </p>
                          )}
                        </div>
                        <div className="mt-4 md:mt-0 flex space-x-3">
                          {order.status === 'shipped' && (
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                              Track Order
                            </button>
                          )}
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
                              Rate & Review
                            </button>
                          )}
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Orders;
