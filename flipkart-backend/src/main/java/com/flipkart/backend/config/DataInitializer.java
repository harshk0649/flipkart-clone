package com.flipkart.backend.config;

import com.flipkart.backend.model.Product;
import com.flipkart.backend.model.User;
import com.flipkart.backend.repository.ProductRepository;
import com.flipkart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Initialize demo user
        if (!userRepository.existsByEmail("demo@flipkart.com")) {
            User demoUser = new User();
            demoUser.setEmail("demo@flipkart.com");
            demoUser.setPassword(passwordEncoder.encode("demo123"));
            demoUser.setFirstName("John");
            demoUser.setLastName("Doe");
            demoUser.setPhone("+91 9876543210");
            userRepository.save(demoUser);
            System.out.println("Demo user created: demo@flipkart.com / demo123");
        }
        
        // Initialize sample products
        if (productRepository.count() == 0) {
            createSampleProducts();
            System.out.println("Sample products created");
        }
    }
    
    private void createSampleProducts() {
        // Electronics
        productRepository.save(new Product(
            "iPhone 15 Pro Max",
            "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
            new BigDecimal("1299.00"),
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
            "Electronics",
            "Apple"
        ));
        
        productRepository.save(new Product(
            "Samsung Galaxy S24 Ultra",
            "Premium Android smartphone with S Pen, 200MP camera, and AI features",
            new BigDecimal("1199.00"),
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
            "Electronics",
            "Samsung"
        ));
        
        productRepository.save(new Product(
            "MacBook Pro 16\"",
            "Powerful laptop with M3 Pro chip, perfect for professionals",
            new BigDecimal("2399.00"),
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
            "Electronics",
            "Apple"
        ));
        
        productRepository.save(new Product(
            "Sony WH-1000XM5",
            "Industry-leading noise canceling wireless headphones",
            new BigDecimal("349.00"),
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
            "Electronics",
            "Sony"
        ));
        
        // Fashion
        productRepository.save(new Product(
            "Nike Air Max 270",
            "Comfortable running shoes with Max Air cushioning",
            new BigDecimal("150.00"),
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
            "Fashion",
            "Nike"
        ));
        
        productRepository.save(new Product(
            "Levi's 501 Original Jeans",
            "Classic straight-leg jeans, the original blue jean since 1873",
            new BigDecimal("89.00"),
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
            "Fashion",
            "Levi's"
        ));
        
        // Home & Kitchen
        productRepository.save(new Product(
            "Instant Pot Duo 7-in-1",
            "Multi-functional pressure cooker, slow cooker, rice cooker, and more",
            new BigDecimal("99.00"),
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
            "Home",
            "Instant Pot"
        ));
        
        productRepository.save(new Product(
            "Dyson V15 Detect",
            "Powerful cordless vacuum with laser dust detection",
            new BigDecimal("749.00"),
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
            "Home",
            "Dyson"
        ));
        
        // Books
        productRepository.save(new Product(
            "The Psychology of Money",
            "Timeless lessons on wealth, greed, and happiness by Morgan Housel",
            new BigDecimal("15.99"),
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
            "Books",
            "Harriman House"
        ));
        
        productRepository.save(new Product(
            "Atomic Habits",
            "An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear",
            new BigDecimal("13.99"),
            "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500",
            "Books",
            "Avery"
        ));
        
        // Sports
        productRepository.save(new Product(
            "Yoga Mat Premium",
            "Non-slip exercise mat perfect for yoga, pilates, and fitness",
            new BigDecimal("29.99"),
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
            "Sports",
            "Gaiam"
        ));
        
        productRepository.save(new Product(
            "Adjustable Dumbbells Set",
            "Space-saving adjustable dumbbells for home workouts",
            new BigDecimal("299.00"),
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
            "Sports",
            "Bowflex"
        ));
    }
}
