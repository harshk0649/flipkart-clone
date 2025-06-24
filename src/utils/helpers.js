// Format currency to Indian Rupees
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format number with Indian numbering system (lakhs, crores)
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Calculate discount percentage
export const calculateDiscount = (originalPrice, currentPrice) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Filter products based on search query, category, price range
export const filterProducts = (products, filters) => {
  const { searchQuery, category, priceRange, sortBy } = filters;
  
  let filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = category === 'all' || product.category === category;
    
    // Price range filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  switch (sortBy) {
    case 'price-low-high':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      filteredProducts.sort((a, b) => b.discount - a.discount);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    default: // relevance
      break;
  }

  return filteredProducts;
};

// Get product by ID
export const getProductById = (products, id) => {
  return products.find(product => product.id === parseInt(id));
};

// Get products by category
export const getProductsByCategory = (products, category, limit = null) => {
  const filtered = products.filter(product => product.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
};

// Get related products (same category, excluding current product)
export const getRelatedProducts = (products, currentProduct, limit = 4) => {
  return products
    .filter(product => 
      product.category === currentProduct.category && 
      product.id !== currentProduct.id
    )
    .slice(0, limit);
};

// Generate star rating display
export const generateStarRating = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    fullStars,
    hasHalfStar,
    emptyStars,
    rating
  };
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Format time remaining for deals
export const formatTimeRemaining = (endTime) => {
  const now = new Date();
  const timeLeft = endTime - now;
  
  if (timeLeft <= 0) {
    return 'Deal Expired';
  }
  
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Check if product is on sale
export const isOnSale = (product) => {
  return product.originalPrice > product.price;
};

// Calculate savings amount
export const calculateSavings = (originalPrice, currentPrice) => {
  return originalPrice - currentPrice;
};

// Format delivery date
export const getDeliveryDate = (fastDelivery = false) => {
  const today = new Date();
  const deliveryDays = fastDelivery ? 1 : 3;
  const deliveryDate = new Date(today.getTime() + deliveryDays * 24 * 60 * 60 * 1000);
  
  return deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Check if delivery is free
export const isFreeDelivery = (cartTotal, threshold = 500) => {
  return cartTotal >= threshold;
};

// Calculate estimated delivery charge
export const calculateDeliveryCharge = (cartTotal, fastDelivery = false) => {
  if (isFreeDelivery(cartTotal)) return 0;
  return fastDelivery ? 100 : 50;
};

// Local storage helpers
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};
