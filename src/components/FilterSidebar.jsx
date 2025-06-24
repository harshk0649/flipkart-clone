import React from 'react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/products';
import { formatCurrency } from '../utils/helpers';

const FilterSidebar = ({ isOpen, onClose }) => {
  const { 
    selectedCategory, 
    setCategory, 
    priceRange, 
    setPriceRange, 
    sortBy, 
    setSortBy 
  } = useApp();

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'discount', label: 'Discount' },
    { value: 'newest', label: 'Newest First' }
  ];

  const priceRanges = [
    { min: 0, max: 1000, label: 'Under ₹1,000' },
    { min: 1000, max: 5000, label: '₹1,000 - ₹5,000' },
    { min: 5000, max: 10000, label: '₹5,000 - ₹10,000' },
    { min: 10000, max: 25000, label: '₹10,000 - ₹25,000' },
    { min: 25000, max: 50000, label: '₹25,000 - ₹50,000' },
    { min: 50000, max: 100000, label: 'Above ₹50,000' }
  ];

  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-64 lg:shadow-none lg:border-r lg:border-gray-200
      `}>
        <div className="h-full overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ✕
            </button>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={`${range.min}-${range.max}`} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange[0] === range.min && priceRange[1] === range.max}
                    onChange={() => handlePriceRangeChange(range.min, range.max)}
                    className="mr-3 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
            
            {/* Custom Price Range */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-medium text-gray-700 mb-2">Custom Range</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-xs text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                  className="w-20 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setCategory('all');
              setPriceRange([0, 100000]);
              setSortBy('relevance');
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
