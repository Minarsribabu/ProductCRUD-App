package com.Backend.DemoProduct.controller;

import com.Backend.DemoProduct.Product;
import com.Backend.DemoProduct.service.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/backend")
public class homeController {
    @Autowired
    private service serv;
    @GetMapping("/hello")
    public String hello(){
        return "Hello, Wolrd";
    }

    @GetMapping("/Products")
    public List<Product> Products(){
        return serv.getProducts();
    }

    @GetMapping("/Product/{id}")
    public Product product(@PathVariable int id){
        return serv.getProduct(id);
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product pr){
        return serv.addProduct(pr);
    }

    @PutMapping("/Product")
    public Product updateProduct(@RequestBody Product pr){
        return serv.setProduct(pr);
    }

    @DeleteMapping("/Product/{id}")
    public Product deleteProduct(@PathVariable int id){
        return serv.deleteProduct(id);
    }
}
