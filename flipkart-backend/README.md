# Flipkart Clone Backend API

A comprehensive Spring Boot backend for the Flipkart Clone e-commerce application.

## 🚀 Features

- **JWT Authentication** - Secure login/signup with JSON Web Tokens
- **User Management** - User profiles, addresses, and account management
- **Product Catalog** - Product listing, search, and categorization
- **Order Management** - Order creation, tracking, and history
- **Wishlist System** - Save and manage favorite products
- **RESTful APIs** - Clean and well-documented API endpoints
- **Database Integration** - JPA/Hibernate with H2 (dev) and MySQL (prod)
- **Security** - Spring Security with CORS support
- **Data Validation** - Input validation and error handling

## 🛠️ Tech Stack

- **Java 17** - Latest LTS version
- **Spring Boot 3.2.0** - Latest Spring Boot
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database operations
- **JWT (jsonwebtoken)** - Token-based authentication
- **H2 Database** - In-memory database for development
- **MySQL** - Production database support
- **Maven** - Dependency management

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL (for production)

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
cd flipkart-backend
```

### 2. Run the Application
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

### 3. Access H2 Console (Development)
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:flipkart`
- Username: `sa`
- Password: `password`

## 📚 API Endpoints

### Authentication
```
POST /api/auth/login       - User login
POST /api/auth/signup      - User registration
GET  /api/auth/me          - Get current user
POST /api/auth/logout      - User logout
```

### Products
```
GET  /api/products         - Get all products
GET  /api/products/{id}    - Get product by ID
GET  /api/products/search  - Search products
GET  /api/products/category/{category} - Get products by category
```

### Users (Protected)
```
GET  /api/users/profile    - Get user profile
PUT  /api/users/profile    - Update user profile
```

### Orders (Protected)
```
GET  /api/orders           - Get user orders
POST /api/orders           - Create new order
GET  /api/orders/{id}      - Get order details
```

### Wishlist (Protected)
```
GET    /api/wishlist       - Get user wishlist
POST   /api/wishlist/{productId} - Add to wishlist
DELETE /api/wishlist/{productId} - Remove from wishlist
```

## 🔧 Configuration

### Application Properties
The application uses YAML configuration in `src/main/resources/application.yml`:

- **Server Port**: 8080
- **Context Path**: /api
- **Database**: H2 (development)
- **JWT Secret**: Configurable
- **CORS**: Enabled for frontend

### Environment Profiles
- **dev** (default) - H2 database, debug logging
- **prod** - MySQL database, optimized settings

## 🧪 Testing

### Demo Account
- **Email**: `demo@flipkart.com`
- **Password**: `demo123`

### Sample API Calls

#### Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@flipkart.com","password":"demo123"}'
```

#### Get Products
```bash
curl -X GET http://localhost:8080/api/products
```

#### Get User Profile (with JWT token)
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔗 Frontend Integration

Update your frontend API service (`src/services/api.js`) to use:
```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 📦 Database Schema

The application automatically creates the following tables:
- `users` - User accounts and profiles
- `products` - Product catalog
- `orders` - Order information
- `order_items` - Order line items
- `addresses` - User addresses
- `wishlist` - User wishlist items

## 🚀 Deployment

### Development
```bash
mvn spring-boot:run
```

### Production
```bash
mvn clean package
java -jar target/flipkart-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

## 🔒 Security Features

- **JWT Authentication** - Stateless token-based auth
- **Password Encryption** - BCrypt password hashing
- **CORS Support** - Cross-origin resource sharing
- **Input Validation** - Request validation and sanitization
- **Error Handling** - Comprehensive error responses

## 📝 API Response Format

All API responses follow a consistent format:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "error": null
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
