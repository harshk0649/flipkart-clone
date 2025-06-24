import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';
import Signup from './Signup';

const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (isAuthenticated) {
    return children;
  }

  if (fallback) {
    return fallback;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600">
            Please sign in to access this page and enjoy all the features of Flipkart.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setShowLogin(true)}
            className="w-full bg-flipkart-blue text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In
          </button>
          <button
            onClick={() => setShowSignup(true)}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>Demo Account: demo@flipkart.com / demo123</p>
        </div>
      </div>

      {/* Login Modal */}
      <Login
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        switchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />

      {/* Signup Modal */}
      <Signup
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        switchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
};

export default ProtectedRoute;
