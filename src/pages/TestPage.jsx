import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  ShoppingCart,
  Heart,
  Package,
} from "lucide-react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import SimpleLogin from "../components/SimpleLogin";

const TestPage = () => {
  const { isAuthenticated, user, login, signup, logout } = useAuth();
  const { cartItems, cartItemCount, showToast } = useApp();
  const [testResults, setTestResults] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showSimpleLogin, setShowSimpleLogin] = useState(false);

  const runTest = async (testName, testFunction) => {
    try {
      console.log(`Running test: ${testName}`);
      const result = await testFunction();
      setTestResults((prev) => ({
        ...prev,
        [testName]: {
          success: true,
          message: result || "Test passed",
          error: null,
        },
      }));
      console.log(`✅ ${testName}: PASSED`);
    } catch (error) {
      setTestResults((prev) => ({
        ...prev,
        [testName]: { success: false, message: null, error: error.message },
      }));
      console.error(`❌ ${testName}: FAILED`, error);
    }
  };

  const tests = {
    "Authentication Context": async () => {
      if (typeof isAuthenticated !== "boolean")
        throw new Error("isAuthenticated is not boolean");
      if (typeof login !== "function")
        throw new Error("login is not a function");
      if (typeof signup !== "function")
        throw new Error("signup is not a function");
      if (typeof logout !== "function")
        throw new Error("logout is not a function");
      return "Auth context loaded correctly";
    },

    "App Context": async () => {
      if (!Array.isArray(cartItems))
        throw new Error("cartItems is not an array");
      if (typeof cartItemCount !== "number")
        throw new Error("cartItemCount is not a number");
      if (typeof showToast !== "function")
        throw new Error("showToast is not a function");
      return "App context loaded correctly";
    },

    "Demo Login": async () => {
      if (isAuthenticated) {
        logout();
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      const result = await login("demo@flipkart.com", "demo123");
      if (!result.success) throw new Error("Demo login failed");
      return "Demo login successful";
    },

    "User Data": async () => {
      if (!isAuthenticated) throw new Error("User not authenticated");
      if (!user) throw new Error("User data not available");
      if (!user.firstName) throw new Error("User firstName missing");
      if (!user.email) throw new Error("User email missing");
      return `User: ${user.firstName} ${user.lastName} (${user.email})`;
    },

    "Toast Notification": async () => {
      showToast("Test notification", "success");
      return "Toast notification triggered";
    },

    "Local Storage": async () => {
      const savedUser = localStorage.getItem("flipkart_user");
      if (!savedUser) throw new Error("No user data in localStorage");
      const userData = JSON.parse(savedUser);
      if (!userData.email) throw new Error("Invalid user data in localStorage");
      return "localStorage working correctly";
    },

    Routing: async () => {
      // Test if we can access the current location
      if (!window.location) throw new Error("Window location not available");
      if (!window.location.pathname) throw new Error("Pathname not available");
      return `Current route: ${window.location.pathname}`;
    },
  };

  const runAllTests = async () => {
    setTestResults({});
    for (const [testName, testFunction] of Object.entries(tests)) {
      await runTest(testName, testFunction);
      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  const getTestIcon = (result) => {
    if (!result) return <AlertCircle className="w-5 h-5 text-gray-400" />;
    return result.success ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getTestColor = (result) => {
    if (!result) return "border-gray-200 bg-gray-50";
    return result.success
      ? "border-green-200 bg-green-50"
      : "border-red-200 bg-red-50";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Flipkart Clone - System Test
          </h1>
          <p className="text-gray-600 mb-4">
            Test all functionalities to ensure everything is working correctly
          </p>

          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-md">
              <User className="w-5 h-5 text-blue-600" />
              <span className="text-sm">
                Auth: {isAuthenticated ? "Logged In" : "Guest"}
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-md">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              <span className="text-sm">Cart: {cartItemCount} items</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-md">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="text-sm">User: {user?.firstName || "None"}</span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-md">
              <Package className="w-5 h-5 text-orange-600" />
              <span className="text-sm">
                Tests: {Object.keys(testResults).length}
              </span>
            </div>
          </div>

          <button
            onClick={runAllTests}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Run All Tests
          </button>
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Test Results
          </h2>

          <div className="space-y-3">
            {Object.entries(tests).map(([testName]) => {
              const result = testResults[testName];
              return (
                <div
                  key={testName}
                  className={`p-4 border rounded-md ${getTestColor(result)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getTestIcon(result)}
                      <span className="font-medium">{testName}</span>
                    </div>
                    <button
                      onClick={() => runTest(testName, tests[testName])}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Run Test
                    </button>
                  </div>

                  {result && (
                    <div className="mt-2 text-sm">
                      {result.success ? (
                        <span className="text-green-700">{result.message}</span>
                      ) : (
                        <span className="text-red-700">
                          Error: {result.error}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/"
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🏠</div>
              <div className="font-medium">Home Page</div>
            </Link>

            <Link
              to="/profile"
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">👤</div>
              <div className="font-medium">Profile</div>
            </Link>

            <Link
              to="/orders"
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📦</div>
              <div className="font-medium">Orders</div>
            </Link>

            <Link
              to="/wishlist"
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">❤️</div>
              <div className="font-medium">Wishlist</div>
            </Link>

            <Link
              to="/cart"
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🛒</div>
              <div className="font-medium">Cart</div>
            </Link>

            <button
              onClick={() => showToast("Test notification!", "success")}
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔔</div>
              <div className="font-medium">Test Toast</div>
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔐</div>
              <div className="font-medium">Test Login</div>
            </button>

            <button
              onClick={() => setShowSignup(true)}
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">📝</div>
              <div className="font-medium">Test Signup</div>
            </button>

            <button
              onClick={() => setShowSimpleLogin(true)}
              className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🔧</div>
              <div className="font-medium">Simple Login</div>
            </button>
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Debug Information
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Authentication State:
              </h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify({ isAuthenticated, user }, null, 2)}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Cart State:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(
                  { cartItemCount, cartItems: cartItems.slice(0, 3) },
                  null,
                  2
                )}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-2">Local Storage:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {JSON.stringify(
                  {
                    flipkart_user: localStorage.getItem("flipkart_user")
                      ? "Present"
                      : "Not found",
                    auth_token: localStorage.getItem("auth_token")
                      ? "Present"
                      : "Not found",
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
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

      {/* Simple Login Modal */}
      <SimpleLogin
        isOpen={showSimpleLogin}
        onClose={() => setShowSimpleLogin(false)}
      />
    </div>
  );
};

export default TestPage;
