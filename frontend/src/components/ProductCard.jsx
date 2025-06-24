import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { useApp } from "../context/AppContext";
import { formatCurrency, generateStarRating } from "../utils/helpers";

const ProductCard = ({ product, className = "" }) => {
  const { addToCart } = useApp();
  const starRating = generateStarRating(product.rating);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);

    // Show toast notification
    if (window.showToast) {
      window.showToast(`${product.name} added to cart!`, "success");
    }
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement wishlist functionality
    console.log("Added to wishlist:", product.name);

    // Show toast notification
    if (window.showToast) {
      window.showToast(`${product.name} added to wishlist!`, "info");
    }
  };

  return (
    <Link to={`/products/${product.id}`} className={`block ${className}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
              {product.discount}% OFF
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <HeartIcon className="h-4 w-4 text-gray-600" />
          </button>

          {/* Fast Delivery Badge */}
          {product.fastDelivery && (
            <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
              Fast Delivery
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Brand */}
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </div>

          {/* Product Name */}
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(starRating.fullStars)].map((_, i) => (
                <StarIconSolid key={i} className="h-3 w-3 text-yellow-400" />
              ))}
              {starRating.hasHalfStar && (
                <div className="relative">
                  <StarIcon className="h-3 w-3 text-gray-300" />
                  <div className="absolute inset-0 overflow-hidden w-1/2">
                    <StarIconSolid className="h-3 w-3 text-yellow-400" />
                  </div>
                </div>
              )}
              {[...Array(starRating.emptyStars)].map((_, i) => (
                <StarIcon key={i} className="h-3 w-3 text-gray-300" />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviews.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
