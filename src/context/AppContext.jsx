import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial state
const initialState = {
  cart: [],
  user: null,
  searchQuery: "",
  selectedCategory: "all",
  priceRange: [0, 100000],
  sortBy: "relevance",
  isLoading: false,
  error: null,
};

// Action types
export const ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  UPDATE_CART_QUANTITY: "UPDATE_CART_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
  SET_CART: "SET_CART",
  SET_USER: "SET_USER",
  SET_SEARCH_QUERY: "SET_SEARCH_QUERY",
  SET_CATEGORY: "SET_CATEGORY",
  SET_PRICE_RANGE: "SET_PRICE_RANGE",
  SET_SORT_BY: "SET_SORT_BY",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART: {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case ACTIONS.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case ACTIONS.CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case ACTIONS.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ACTIONS.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    case ACTIONS.SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case ACTIONS.SET_PRICE_RANGE:
      return {
        ...state,
        priceRange: action.payload,
      };

    case ACTIONS.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("flipkart-cart");
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        // Set the entire cart at once instead of adding items one by one
        if (cartData.length > 0) {
          dispatch({ type: "SET_CART", payload: cartData });
        }
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("flipkart-cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Helper functions
  const addToCart = (product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    dispatch({
      type: ACTIONS.UPDATE_CART_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const setCategory = (category) => {
    dispatch({ type: ACTIONS.SET_CATEGORY, payload: category });
  };

  const setPriceRange = (range) => {
    dispatch({ type: ACTIONS.SET_PRICE_RANGE, payload: range });
  };

  const setSortBy = (sortBy) => {
    dispatch({ type: ACTIONS.SET_SORT_BY, payload: sortBy });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  // Calculate cart totals
  const cartTotal = state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartItemCount = state.cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    setLoading,
    setError,
    cartTotal,
    cartItemCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default AppContext;
