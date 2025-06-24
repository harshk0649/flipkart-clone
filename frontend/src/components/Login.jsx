import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { X, Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = ({ isOpen, onClose, switchToSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const { login, loading, error, clearError } = useAuth();

  useEffect(() => {
    if (isOpen) {
      clearError();
      setFormData({ email: "", password: "" });
    }
  }, [isOpen, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login form submitted with:", formData);

    try {
      const result = await login(formData.email, formData.password);
      console.log("Login result:", result);

      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();
    setFormData({
      email: "demo@flipkart.com",
      password: "demo123",
    });
  };

  if (!isOpen) return null;

  console.log("Login modal is open, formData:", formData);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Login</h2>
            <p className="text-sm text-gray-600 mt-1">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Demo Login Info */}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm font-medium">Demo Account:</p>
            <p className="text-blue-600 text-xs">
              Email: demo@flipkart.com | Password: demo123
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="text-blue-600 text-xs underline hover:text-blue-800 mt-1"
            >
              Use Demo Credentials
            </button>
            <button
              type="button"
              onClick={() => {
                console.log("Test button clicked!");
                alert("Button works!");
              }}
              className="ml-4 bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              Test Click
            </button>
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onClick={() => console.log("Email input clicked")}
              onFocus={() => console.log("Email input focused")}
              onInput={(e) => console.log("Email input event:", e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "3px solid #ff0000",
                borderRadius: "4px",
                fontSize: "16px",
                backgroundColor: "#ffff00",
                position: "relative",
                zIndex: 99999,
                outline: "none",
              }}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onClick={() => console.log("Password input clicked")}
              onFocus={() => console.log("Password input focused")}
              onInput={(e) =>
                console.log("Password input event:", e.target.value)
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "3px solid #ff0000",
                borderRadius: "4px",
                fontSize: "16px",
                backgroundColor: "#ffff00",
                position: "relative",
                zIndex: 99999,
                outline: "none",
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-flipkart-blue text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New to Flipkart?{" "}
              <button
                type="button"
                onClick={switchToSignup}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Create an account
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
