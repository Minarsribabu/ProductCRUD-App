package com.Backend.DemoProduct.repository;

import com.Backend.DemoProduct.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface repoDB extends JpaRepository<Product, Integer> {
}
