# Flipkart Clone - React E-commerce Application

A fully functional e-commerce application built with React, featuring a modern UI similar to Flipkart with complete shopping functionality.

## 🚀 Features

### Core Functionality

- **Product Catalog**: Browse products across multiple categories
- **Search & Filters**: Advanced search with suggestions and filtering options
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout Process**: Multi-step checkout with address and payment
- **Product Details**: Detailed product pages with specifications and reviews
- **Responsive Design**: Mobile-first responsive design

### UI/UX Features

- **Modern Design**: Clean, professional interface inspired by Flipkart
- **Interactive Elements**: Hover effects, animations, and transitions
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton screens and loading indicators
- **Search Suggestions**: Smart search with recent searches and autocomplete

### Technical Features

- **State Management**: React Context API for global state
- **Local Storage**: Persistent cart and search history
- **Routing**: React Router for navigation
- **Icons**: Heroicons for consistent iconography
- **Styling**: Tailwind CSS for utility-first styling

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons
- **Vite** - Fast build tool and development server

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd flipkart-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Main navigation header
│   ├── Footer.jsx      # Site footer
│   ├── ProductCard.jsx # Product display card
│   ├── Banner.jsx      # Hero banner carousel
│   ├── FilterSidebar.jsx # Product filtering
│   ├── SearchSuggestions.jsx # Search autocomplete
│   ├── Toast.jsx       # Notification system
│   └── LoadingSpinner.jsx # Loading indicators
├── pages/              # Page components
│   ├── Home.jsx        # Homepage with products
│   ├── ProductDetail.jsx # Individual product page
│   ├── Cart.jsx        # Shopping cart
│   ├── Checkout.jsx    # Checkout process
│   └── NotFound.jsx    # 404 error page
├── context/            # React Context for state management
│   └── AppContext.jsx  # Global application state
├── data/               # Mock data and constants
│   └── products.js     # Product catalog data
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions
└── App.jsx             # Main application component
```

## 🎯 Key Features Breakdown

### 1. Product Management

- **Categories**: Electronics, Fashion, Home & Kitchen, Books, Sports, Beauty, Toys, Automotive
- **Product Details**: Images, specifications, ratings, reviews, pricing
- **Inventory**: Stock status and fast delivery options

### 2. Shopping Experience

- **Cart Management**: Add, remove, update quantities
- **Price Calculation**: Subtotal, delivery charges, discounts
- **Checkout Flow**: Address entry, payment selection, order review
- **Order Confirmation**: Success page with order details

### 3. Search & Discovery

- **Smart Search**: Product names, brands, categories
- **Filters**: Price range, category, rating, discount
- **Sorting**: Price, rating, discount, newest
- **Suggestions**: Recent searches and autocomplete

### 4. User Interface

- **Header**: Logo, search bar, navigation, cart icon
- **Footer**: Links, payment methods, company information
- **Responsive**: Mobile, tablet, and desktop layouts
- **Animations**: Smooth transitions and hover effects

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors

- **Primary**: Blue (#2563eb)
- **Secondary**: Yellow (#fbbf24)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography

- **Font Family**: System fonts (Inter, sans-serif)
- **Headings**: Bold weights for hierarchy
- **Body**: Regular weight for readability

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Future Enhancements

- User authentication and profiles
- Wishlist functionality
- Product reviews and ratings
- Order history and tracking
- Payment gateway integration
- Admin panel for product management
- Real-time inventory updates
- Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. All design inspiration from Flipkart is acknowledged.

## 🙏 Acknowledgments

- Design inspiration from Flipkart
- Icons by Heroicons
- Images from Unsplash
- Built with React and Vite
