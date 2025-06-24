import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. 
          The page might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <HomeIcon className="h-5 w-5" />
            <span>Go Back Home</span>
          </Link>
          
          <Link
            to="/?search=true"
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span>Search Products</span>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our customer support:</p>
          <p className="font-medium text-blue-600">1800-XXX-XXXX</p>
        </div>

        {/* Popular Categories */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Link to="/?category=electronics" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
              Electronics
            </Link>
            <Link to="/?category=fashion" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
              Fashion
            </Link>
            <Link to="/?category=home" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
              Home & Kitchen
            </Link>
            <Link to="/?category=books" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
              Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
