import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { products, categories, deals } from "../data/products";
import { filterProducts, formatTimeRemaining } from "../utils/helpers";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import {
  ChevronRightIcon,
  FireIcon,
  ClockIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const { searchQuery, selectedCategory, priceRange, sortBy } = useApp();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [dealTimeLeft, setDealTimeLeft] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on current filters
  useEffect(() => {
    const filtered = filterProducts(products, {
      searchQuery,
      category: selectedCategory,
      priceRange,
      sortBy,
    });
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Update deal countdown timers
  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft = {};
      deals.forEach((deal) => {
        newTimeLeft[deal.id] = formatTimeRemaining(deal.endTime);
      });
      setDealTimeLeft(newTimeLeft);
    };

    updateTimers();
    const timer = setInterval(updateTimers, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.slice(0, 8);
  const topRatedProducts = products.filter((p) => p.rating >= 4.5).slice(0, 6);
  const onSaleProducts = products.filter((p) => p.discount > 20).slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="mb-8">
        <Banner />
      </section>

      {/* Categories Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                to={`/?category=${category.id}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FireIcon className="h-6 w-6" />
                      <h3 className="text-xl font-bold">{deal.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-3 py-1">
                      <ClockIcon className="h-4 w-4" />
                      <span className="font-mono text-sm">
                        {dealTimeLeft[deal.id]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {deal.products.slice(0, 4).map((productId) => {
                      const product = products.find((p) => p.id === productId);
                      return product ? (
                        <ProductCard
                          key={product.id}
                          product={product}
                          className="h-full"
                        />
                      ) : null;
                    })}
                  </div>
                  <Link
                    to={`/deals/${deal.id}`}
                    className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All Deals{" "}
                    <ChevronRightIcon className="inline h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All <ChevronRightIcon className="inline h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Rated Products
            </h2>
            <Link
              to="/products?sort=rating"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All <ChevronRightIcon className="inline h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {topRatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Big Discounts */}
      <section className="mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Big Discounts</h2>
            <Link
              to="/products?sort=discount"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All <ChevronRightIcon className="inline h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {onSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Search Results (when searching) */}
      {(searchQuery || selectedCategory !== "all") && (
        <section className="mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : `${
                      categories.find((c) => c.id === selectedCategory)?.name ||
                      "Products"
                    }`}
                <span className="text-gray-500 text-lg ml-2">
                  ({filteredProducts.length} products)
                </span>
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            <div className="flex">
              {/* Filter Sidebar */}
              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
              />

              {/* Products Grid */}
              <div className="flex-1 lg:ml-6">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
