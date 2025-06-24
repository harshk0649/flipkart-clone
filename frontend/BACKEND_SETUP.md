
# 🚀 Java Spring Boot Backend Setup for Flipkart Clone

## 📋 Complete Tech Stack

### Frontend (Current)
- **React 19.1.0** - Modern React with latest features
- **Vite 6.3.5** - Ultra-fast build tool and dev server
- **React Router DOM 7.6.2** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React & Heroicons** - Icon libraries

### Backend (Recommended)
- **Java 17+** - Latest LTS version
- **Spring Boot 3.2+** - Latest Spring Boot
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database operations
- **MySQL/PostgreSQL** - Production database
- **H2** - Development database
- **Maven** - Dependency management

## 🛠️ Backend Setup Steps

### 1. Create Spring Boot Project

```bash
# Use Spring Initializr
curl https://start.spring.io/starter.zip \
  -d dependencies=web,data-jpa,security,validation,h2,mysql \
  -d type=maven-project \
  -d language=java \
  -d bootVersion=3.2.0 \
  -d baseDir=flipkart-backend \
  -d groupId=com.flipkart \
  -d artifactId=flipkart-backend \
  -o flipkart-backend.zip
```

### 2. Project Structure

```
flipkart-backend/
├── src/main/java/com/flipkart/backend/
│   ├── FlipkartBackendApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── CorsConfig.java
│   │   └── JwtConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── UserController.java
│   │   ├── ProductController.java
│   │   ├── OrderController.java
│   │   └── WishlistController.java
│   ├── model/
│   │   ├── User.java
│   │   ├── Product.java
│   │   ├── Order.java
│   │   ├── OrderItem.java
│   │   ├── Address.java
│   │   └── Wishlist.java
│   ├── repository/
│   │   ├── UserRepository.java
│   │   ├── ProductRepository.java
│   │   ├── OrderRepository.java
│   │   └── WishlistRepository.java
│   ├── service/
│   │   ├── AuthService.java
│   │   ├── UserService.java
│   │   ├── ProductService.java
│   │   ├── OrderService.java
│   │   └── WishlistService.java
│   ├── dto/
│   │   ├── LoginRequest.java
│   │   ├── SignupRequest.java
│   │   ├── UserResponse.java
│   │   └── ApiResponse.java
│   └── exception/
│       ├── GlobalExceptionHandler.java
│       └── CustomExceptions.java
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   └── application-prod.yml
└── pom.xml
```

### 3. Key Dependencies (pom.xml)

```xml
<dependencies>
    <!-- Spring Boot Starters -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- JWT -->
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
        <version>0.11.5</version>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-impl</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-jackson</artifactId>
        <version>0.11.5</version>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Password Encoding -->
    <dependency>
        <groupId>org.springframework.security</groupId>
        <artifactId>spring-security-crypto</artifactId>
    </dependency>
</dependencies>
```

### 4. API Endpoints Design

```
Authentication:
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/logout
GET  /api/auth/me

Users:
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/addresses
POST   /api/users/addresses
PUT    /api/users/addresses/{id}
DELETE /api/users/addresses/{id}

Products:
GET    /api/products
GET    /api/products/{id}
GET    /api/products/search?q={query}
GET    /api/products/category/{category}

Orders:
GET    /api/orders
POST   /api/orders
GET    /api/orders/{id}
PUT    /api/orders/{id}/status

Wishlist:
GET    /api/wishlist
POST   /api/wishlist/{productId}
DELETE /api/wishlist/{productId}
```

### 5. Database Schema

```sql
-- Users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    image_url VARCHAR(500),
    category VARCHAR(100),
    brand VARCHAR(100),
    rating DECIMAL(2,1) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    in_stock BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'PROCESSING',
    delivery_address TEXT,
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items table
CREATE TABLE order_items (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Wishlist table
CREATE TABLE wishlist (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE KEY unique_user_product (user_id, product_id)
);

-- Addresses table
CREATE TABLE addresses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address_line TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔗 Frontend-Backend Integration

### 1. Update Frontend API Service

Create `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // Auth methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async signup(userData) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Product methods
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products?${queryString}`);
  }

  // Order methods
  async getOrders() {
    return this.request('/orders');
  }

  // Wishlist methods
  async getWishlist() {
    return this.request('/wishlist');
  }
}

export default new ApiService();
```

### 2. Update AuthContext to use API

Replace mock data with real API calls in `src/context/AuthContext.jsx`.

## 🚀 Next Steps

1. **Set up Spring Boot backend** using the structure above
2. **Implement JWT authentication** with Spring Security
3. **Create REST APIs** for all functionalities
4. **Update frontend** to use real API calls
5. **Add database integration** with JPA/Hibernate
6. **Implement proper error handling**
7. **Add API documentation** with Swagger
8. **Set up CORS** for frontend-backend communication

Would you like me to create the actual Spring Boot backend files or fix the current frontend issues first?
