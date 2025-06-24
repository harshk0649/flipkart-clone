package com.flipkart.backend.controller;

import com.flipkart.backend.dto.ApiResponse;
import com.flipkart.backend.model.Product;
import com.flipkart.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            if (page == 0 && size == 20) {
                // Return all products if default pagination
                List<Product> products = productService.getAllProducts();
                return ResponseEntity.ok(ApiResponse.success(products));
            } else {
                // Return paginated results
                Pageable pageable = PageRequest.of(page, size);
                Page<Product> productPage = productService.getAllProducts(pageable);
                return ResponseEntity.ok(ApiResponse.success(productPage.getContent()));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable Long id) {
        try {
            Optional<Product> product = productService.getProductById(id);
            if (product.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success(product.get()));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<Product>>> getProductsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            if (page == 0 && size == 20) {
                List<Product> products = productService.getProductsByCategory(category);
                return ResponseEntity.ok(ApiResponse.success(products));
            } else {
                Pageable pageable = PageRequest.of(page, size);
                Page<Product> productPage = productService.getProductsByCategory(category, pageable);
                return ResponseEntity.ok(ApiResponse.success(productPage.getContent()));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Product>>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> productPage = productService.searchProducts(q, pageable);
            return ResponseEntity.ok(ApiResponse.success(productPage.getContent()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
