import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';

const SearchSuggestions = ({ query, onSelect, onClose }) => {
  const { setSearchQuery } = useApp();
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('flipkart-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      // Generate suggestions based on product names, brands, and categories
      const productSuggestions = products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
        .map(product => ({
          type: 'product',
          text: product.name,
          brand: product.brand,
          category: product.category,
          id: product.id
        }));

      // Add brand suggestions
      const brands = [...new Set(products.map(p => p.brand))]
        .filter(brand => brand.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(brand => ({
          type: 'brand',
          text: brand
        }));

      // Add category suggestions
      const categories = [...new Set(products.map(p => p.category))]
        .filter(category => category.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3)
        .map(category => ({
          type: 'category',
          text: category
        }));

      setSuggestions([...productSuggestions, ...brands, ...categories]);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    const searchText = suggestion.text;
    
    // Add to recent searches
    const newRecentSearches = [
      searchText,
      ...recentSearches.filter(item => item !== searchText)
    ].slice(0, 10);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('flipkart-recent-searches', JSON.stringify(newRecentSearches));
    
    setSearchQuery(searchText);
    onSelect(searchText);
    onClose();
  };

  const handleRecentSearchClick = (searchText) => {
    setSearchQuery(searchText);
    onSelect(searchText);
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('flipkart-recent-searches');
  };

  if (query.length === 0 && recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      {/* Recent Searches */}
      {query.length === 0 && recentSearches.length > 0 && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">Recent Searches</h3>
            <button
              onClick={clearRecentSearches}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-1">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearchClick(search)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-3"
              >
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-700">{search}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Suggestions */}
      {query.length > 0 && suggestions.length > 0 && (
        <div className="p-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-3"
            >
              <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 truncate">
                  {suggestion.text}
                </div>
                {suggestion.brand && suggestion.type === 'product' && (
                  <div className="text-xs text-gray-500">
                    in {suggestion.brand} • {suggestion.category}
                  </div>
                )}
                {suggestion.type === 'brand' && (
                  <div className="text-xs text-gray-500">Brand</div>
                )}
                {suggestion.type === 'category' && (
                  <div className="text-xs text-gray-500">Category</div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No suggestions */}
      {query.length > 0 && suggestions.length === 0 && (
        <div className="p-4 text-center text-gray-500 text-sm">
          No suggestions found for "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
