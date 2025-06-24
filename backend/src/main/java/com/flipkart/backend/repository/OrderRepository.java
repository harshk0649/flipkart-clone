package com.flipkart.backend.repository;

import com.flipkart.backend.model.Order;
import com.flipkart.backend.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    List<Order> findByUser(User user);
    
    Page<Order> findByUser(User user, Pageable pageable);
    
    List<Order> findByUserAndStatus(User user, Order.OrderStatus status);
    
    Page<Order> findByUserAndStatus(User user, Order.OrderStatus status, Pageable pageable);
    
    List<Order> findByStatus(Order.OrderStatus status);
}
