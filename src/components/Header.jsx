import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  ChevronDownIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { categories } from "../data/products";
import SearchSuggestions from "./SearchSuggestions";
import LoginSimple from "./LoginSimple";
import Signup from "./Signup";

const Header = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    cartItemCount,
    selectedCategory,
    setCategory,
  } = useApp();
  const { isAuthenticated, user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const userMenuRef = useRef(null);
  const categoryMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target)
      ) {
        setIsCategoryMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    setShowSearchSuggestions(false);
    navigate("/");
  };

  const handleSearchInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
    setShowSearchSuggestions(true);
  };

  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  const handleSuggestionSelect = (suggestion) => {
    setLocalSearchQuery(suggestion);
    setSearchQuery(suggestion);
    setShowSearchSuggestions(false);
    navigate("/");
  };

  const handleCategorySelect = (categoryId) => {
    setCategory(categoryId);
    setIsCategoryMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-700 py-1">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPinIcon className="h-3 w-3 mr-1" />
              Deliver to: Mumbai 400001
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/seller" className="hover:text-yellow-300">
              Become a Seller
            </Link>
            <Link to="/more" className="hover:text-yellow-300">
              More
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-yellow-300">Flipkart</div>
            <div className="ml-1 text-xs italic">
              Explore <span className="text-yellow-300">Plus</span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={localSearchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleSearchFocus}
                placeholder="Search for products, brands and more"
                className="w-full px-4 py-2.5 pr-12 text-gray-900 bg-white rounded-sm border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-blue-600 rounded-r-sm hover:bg-yellow-500 transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              {/* Search Suggestions */}
              {showSearchSuggestions && (
                <SearchSuggestions
                  query={localSearchQuery}
                  onSelect={handleSuggestionSelect}
                  onClose={() => setShowSearchSuggestions(false)}
                />
              )}
            </form>
          </div>

          {/* Right side menu */}
          <div className="flex items-center space-x-6">
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryMenuRef}>
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
              >
                <span>Categories</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white text-gray-900 rounded-lg shadow-xl border z-50">
                  <div className="py-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3 ${
                          selectedCategory === category.id
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }`}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Account */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
              >
                <UserIcon className="h-5 w-5" />
                <span>
                  {isAuthenticated ? user?.firstName || "Account" : "Account"}
                </span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl border z-50">
                  <div className="py-2">
                    {isAuthenticated ? (
                      <>
                        {/* User Info */}
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="font-medium text-gray-900">
                            Hello, {user?.firstName}
                          </p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>

                        {/* Authenticated Menu Items */}
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <Link
                          to="/rewards"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Rewards
                        </Link>
                        <Link
                          to="/gift-cards"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Gift Cards
                        </Link>
                        <hr className="my-1" />
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Guest Menu Items */}
                        <button
                          onClick={() => {
                            setShowLogin(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-blue-600 font-medium"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => {
                            setShowSignup(true);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sign Up
                        </button>
                        <hr className="my-1" />
                        <div className="px-4 py-2 text-xs text-gray-500">
                          Please login to access your orders, wishlist and more.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center space-x-1 hover:text-yellow-300 transition-colors"
            >
              <HeartIcon className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 hover:text-yellow-300 transition-colors relative"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-2 overflow-x-auto">
            {categories.slice(1, 8).map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginSimple
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
    </header>
  );
};

export default Header;
