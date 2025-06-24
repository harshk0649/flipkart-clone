import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHome = () => {
  console.log('SimpleHome component is rendering');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Flipkart Clone</h1>
          <p className="text-gray-600 mt-2">Your one-stop shop for everything</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Flipkart Clone</h2>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
          <div className="space-x-4">
            <Link
              to="/debug"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Debug Page
            </Link>
            <Link
              to="/test"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Test Page
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { name: 'Electronics', icon: '📱', color: 'bg-blue-100' },
            { name: 'Fashion', icon: '👕', color: 'bg-pink-100' },
            { name: 'Home', icon: '🏠', color: 'bg-green-100' },
            { name: 'Books', icon: '📚', color: 'bg-yellow-100' },
            { name: 'Sports', icon: '⚽', color: 'bg-red-100' },
            { name: 'Beauty', icon: '💄', color: 'bg-purple-100' },
          ].map((category, index) => (
            <div
              key={index}
              className={`${category.color} rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: 'iPhone 15 Pro', price: '$999', image: '📱' },
              { name: 'MacBook Air', price: '$1299', image: '💻' },
              { name: 'AirPods Pro', price: '$249', image: '🎧' },
              { name: 'Apple Watch', price: '$399', image: '⌚' },
            ].map((product, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-blue-600 font-bold text-lg">{product.price}</p>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 Flipkart Clone. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link to="/debug" className="text-blue-400 hover:text-blue-300">Debug</Link>
            <Link to="/test" className="text-blue-400 hover:text-blue-300">Test</Link>
            <Link to="/profile" className="text-blue-400 hover:text-blue-300">Profile</Link>
            <Link to="/orders" className="text-blue-400 hover:text-blue-300">Orders</Link>
            <Link to="/wishlist" className="text-blue-400 hover:text-blue-300">Wishlist</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleHome;
