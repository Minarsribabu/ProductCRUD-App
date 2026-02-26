package com.Backend.DemoProduct.service;

import com.Backend.DemoProduct.Product;
import com.Backend.DemoProduct.repository.repoDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class service {
    @Autowired
    private repoDB repo;
    public List<Product> getProducts() {
        return repo.findAll();
    }

    public Product getProduct(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product pr) {
        return repo.save(pr);
    }

    public Product setProduct(Product pr) {
        if (!repo.existsById(pr.getId())) {
            throw new RuntimeException("Product not found");
        }
        return repo.save(pr);
    }

    public Product deleteProduct(int id) {
        Product pr =repo.findById(id).orElse(null);
        repo.deleteById(id);
        return pr;
    }
}
