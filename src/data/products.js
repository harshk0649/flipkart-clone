export const categories = [
  { id: 'all', name: 'All Categories', icon: '🛍️' },
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'sports', name: 'Sports & Fitness', icon: '⚽' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: '💄' },
  { id: 'toys', name: 'Toys & Games', icon: '🧸' },
  { id: 'automotive', name: 'Automotive', icon: '🚗' }
];

export const products = [
  // Electronics
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'electronics',
    price: 134900,
    originalPrice: 159900,
    discount: 16,
    rating: 4.5,
    reviews: 2847,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
    ],
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Storage': '256GB',
      'Battery': 'Up to 29 hours video playback'
    },
    features: ['5G Ready', 'Face ID', 'Wireless Charging', 'Water Resistant'],
    inStock: true,
    fastDelivery: true,
    brand: 'Apple'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'electronics',
    price: 124999,
    originalPrice: 134999,
    discount: 7,
    rating: 4.4,
    reviews: 1923,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400'
    ],
    description: 'Premium Android smartphone with S Pen, advanced AI features, and exceptional camera.',
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto',
      'Storage': '256GB',
      'Battery': '5000mAh'
    },
    features: ['S Pen Included', '5G Ready', 'AI Photography', 'Fast Charging'],
    inStock: true,
    fastDelivery: true,
    brand: 'Samsung'
  },
  {
    id: 3,
    name: 'MacBook Air M3',
    category: 'electronics',
    price: 114900,
    originalPrice: 124900,
    discount: 8,
    rating: 4.6,
    reviews: 1456,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
    ],
    description: 'Ultra-thin laptop with M3 chip, all-day battery life, and stunning Retina display.',
    specifications: {
      'Chip': 'Apple M3',
      'Display': '13.6-inch Liquid Retina',
      'Memory': '8GB Unified Memory',
      'Storage': '256GB SSD',
      'Battery': 'Up to 18 hours'
    },
    features: ['Touch ID', 'Backlit Keyboard', 'Force Touch Trackpad', 'Thunderbolt Ports'],
    inStock: true,
    fastDelivery: false,
    brand: 'Apple'
  },

  // Fashion
  {
    id: 4,
    name: 'Nike Air Force 1',
    category: 'fashion',
    price: 7495,
    originalPrice: 8995,
    discount: 17,
    rating: 4.3,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400'
    ],
    description: 'Classic basketball shoe with timeless design and superior comfort.',
    specifications: {
      'Material': 'Leather Upper',
      'Sole': 'Rubber Outsole',
      'Closure': 'Lace-up',
      'Fit': 'True to size'
    },
    features: ['Air Cushioning', 'Durable Construction', 'Classic Design', 'Versatile Style'],
    inStock: true,
    fastDelivery: true,
    brand: 'Nike',
    sizes: ['6', '7', '8', '9', '10', '11', '12']
  },
  {
    id: 5,
    name: 'Levi\'s 511 Slim Jeans',
    category: 'fashion',
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    rating: 4.2,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400'
    ],
    description: 'Slim fit jeans with classic 5-pocket styling and comfortable stretch.',
    specifications: {
      'Fit': 'Slim',
      'Material': '99% Cotton, 1% Elastane',
      'Rise': 'Mid Rise',
      'Leg Opening': '14.5 inches'
    },
    features: ['Stretch Comfort', 'Classic 5-Pocket', 'Button Fly', 'Machine Washable'],
    inStock: true,
    fastDelivery: true,
    brand: 'Levi\'s',
    sizes: ['28', '30', '32', '34', '36', '38', '40']
  },

  // Home & Kitchen
  {
    id: 6,
    name: 'Instant Pot Duo 7-in-1',
    category: 'home',
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    rating: 4.5,
    reviews: 4567,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      'https://images.unsplash.com/photo-1585515656973-a0b8b2b4e4b2?w=400'
    ],
    description: 'Multi-functional electric pressure cooker that replaces 7 kitchen appliances.',
    specifications: {
      'Capacity': '6 Quart',
      'Functions': '7-in-1 (Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, Warmer)',
      'Material': 'Stainless Steel',
      'Power': '1000W'
    },
    features: ['14 Smart Programs', 'Dishwasher Safe', 'Energy Efficient', '10+ Safety Features'],
    inStock: true,
    fastDelivery: true,
    brand: 'Instant Pot'
  },

  // Books
  {
    id: 7,
    name: 'Atomic Habits by James Clear',
    category: 'books',
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4.7,
    reviews: 8934,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
    ],
    description: 'A proven framework for improving every day through tiny changes in your habits.',
    specifications: {
      'Author': 'James Clear',
      'Pages': '320',
      'Publisher': 'Avery',
      'Language': 'English',
      'Format': 'Paperback'
    },
    features: ['Bestseller', 'Self-Help', 'Practical Guide', 'Life-Changing'],
    inStock: true,
    fastDelivery: true,
    brand: 'Avery Publishing'
  },

  // Sports & Fitness
  {
    id: 8,
    name: 'Yoga Mat Premium',
    category: 'sports',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    rating: 4.4,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      'https://images.unsplash.com/photo-1506629905607-d9c297d3d2f5?w=400'
    ],
    description: 'High-quality yoga mat with superior grip and cushioning for all yoga practices.',
    specifications: {
      'Dimensions': '183cm x 61cm',
      'Thickness': '6mm',
      'Material': 'TPE (Eco-friendly)',
      'Weight': '1.2kg'
    },
    features: ['Non-slip Surface', 'Eco-friendly', 'Easy to Clean', 'Carrying Strap Included'],
    inStock: true,
    fastDelivery: true,
    brand: 'YogaLife'
  },

  // Beauty & Personal Care
  {
    id: 9,
    name: 'Lakme Absolute Skin Gloss',
    category: 'beauty',
    price: 899,
    originalPrice: 1200,
    discount: 25,
    rating: 4.1,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400'
    ],
    description: 'Lightweight foundation with natural finish and long-lasting coverage.',
    specifications: {
      'Type': 'Liquid Foundation',
      'Coverage': 'Medium to Full',
      'Finish': 'Natural',
      'Volume': '30ml'
    },
    features: ['Long-lasting', 'Natural Finish', 'SPF Protection', 'Suitable for All Skin Types'],
    inStock: true,
    fastDelivery: true,
    brand: 'Lakme'
  },

  // Toys & Games
  {
    id: 10,
    name: 'LEGO Creator 3-in-1 Deep Sea Creatures',
    category: 'toys',
    price: 2499,
    originalPrice: 2999,
    discount: 17,
    rating: 4.6,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=400'
    ],
    description: 'Build and rebuild 3 different sea creatures with this creative LEGO set.',
    specifications: {
      'Pieces': '230',
      'Age Range': '7-12 years',
      'Builds': '3 different models',
      'Dimensions': 'Varies by model'
    },
    features: ['3-in-1 Building', 'Creative Play', 'Educational', 'High Quality Bricks'],
    inStock: true,
    fastDelivery: true,
    brand: 'LEGO'
  }
];

export const banners = [
  {
    id: 1,
    title: 'Big Billion Days',
    subtitle: 'Biggest Sale of the Year',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    link: '/sale'
  },
  {
    id: 2,
    title: 'Electronics Fest',
    subtitle: 'Up to 80% Off on Electronics',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
    link: '/electronics'
  },
  {
    id: 3,
    title: 'Fashion Week',
    subtitle: 'Trending Styles at Best Prices',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    link: '/fashion'
  }
];

export const deals = [
  {
    id: 1,
    title: 'Deal of the Day',
    products: [1, 4, 6, 8],
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  },
  {
    id: 2,
    title: 'Lightning Deals',
    products: [2, 5, 7, 9],
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
  }
];
