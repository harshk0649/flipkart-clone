import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Heart, ShoppingCart, Trash2, Star, Share2 } from 'lucide-react';

// Mock wishlist data (in real app, this would come from user context)
const mockWishlistItems = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    rating: 4.8,
    reviews: 1250,
    inStock: true,
    discount: 7
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    rating: 4.7,
    reviews: 890,
    inStock: true,
    discount: 8
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    price: 2399,
    originalPrice: 2499,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    rating: 4.9,
    reviews: 567,
    inStock: false,
    discount: 4
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5',
    price: 349,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    rating: 4.6,
    reviews: 2340,
    inStock: true,
    discount: 13
  }
];

const Wishlist = () => {
  const { user } = useAuth();
  const { addToCart, showToast } = useApp();
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(items => items.filter(item => item.id !== itemId));
    showToast('Item removed from wishlist', 'success');
  };

  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
    showToast('Item moved to cart', 'success');
  };

  const shareItem = (item) => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `Check out this ${item.name} for ₹${item.price.toLocaleString()}`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard', 'success');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>

          {/* Wishlist Content */}
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">
                Save items you love to your wishlist and never lose track of them!
              </p>
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  {/* Product Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {item.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {item.discount}% OFF
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white text-gray-900 px-3 py-1 rounded font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(item.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {item.rating} ({item.reviews.toLocaleString()})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price.toLocaleString()}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <button
                        onClick={() => moveToCart(item)}
                        disabled={!item.inStock}
                        className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md font-medium transition-colors ${
                          item.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        <span>{item.inStock ? 'Move to Cart' : 'Out of Stock'}</span>
                      </button>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Trash2 size={14} />
                          <span className="text-sm">Remove</span>
                        </button>
                        <button
                          onClick={() => shareItem(item)}
                          className="flex-1 flex items-center justify-center space-x-1 py-2 px-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Share2 size={14} />
                          <span className="text-sm">Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Actions */}
          {wishlistItems.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Wishlist Actions</h3>
                  <p className="text-gray-600">Manage all your wishlist items at once</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const inStockItems = wishlistItems.filter(item => item.inStock);
                      inStockItems.forEach(item => addToCart(item));
                      setWishlistItems(items => items.filter(item => !item.inStock));
                      showToast(`${inStockItems.length} items moved to cart`, 'success');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Move All to Cart
                  </button>
                  <button
                    onClick={() => {
                      setWishlistItems([]);
                      showToast('Wishlist cleared', 'success');
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Clear Wishlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Wishlist;
