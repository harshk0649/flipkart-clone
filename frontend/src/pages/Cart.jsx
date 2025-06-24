import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ShoppingBagIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useApp } from "../context/AppContext";
import {
  formatCurrency,
  calculateDeliveryCharge,
  isFreeDelivery,
  getDeliveryDate,
} from "../utils/helpers";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, cartTotal, clearCart } =
    useApp();

  const deliveryCharge = calculateDeliveryCharge(cartTotal);
  const finalTotal = cartTotal + deliveryCharge;

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <Link to={`/products/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 block truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">
                        {formatCurrency(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Delivery Info */}
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <TruckIcon className="h-4 w-4 mr-1" />
                      <span>
                        Delivery by {getDeliveryDate(item.fastDelivery)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-2 border-x min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal (
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span className="font-medium">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className="font-medium">
                    {deliveryCharge === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      formatCurrency(deliveryCharge)
                    )}
                  </span>
                </div>

                {/* Free delivery message */}
                {!isFreeDelivery(cartTotal) && (
                  <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    Add {formatCurrency(500 - cartTotal)} more for FREE delivery
                  </div>
                )}

                <hr />

                {/* Total */}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>

                {/* Savings */}
                {cart.some((item) => item.originalPrice > item.price) && (
                  <div className="text-green-600 text-sm">
                    You will save{" "}
                    {formatCurrency(
                      cart.reduce(
                        (savings, item) =>
                          savings +
                          (item.originalPrice - item.price) * item.quantity,
                        0
                      )
                    )}{" "}
                    on this order
                  </div>
                )}
              </div>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ShieldCheckIcon className="h-4 w-4" />
                  <span>
                    Safe and Secure Payments. Easy returns. 100% Authentic
                    products.
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/"
                className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
