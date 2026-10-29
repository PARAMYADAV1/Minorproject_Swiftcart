
package com.swiftcart.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swiftcart.repository.ProductRepository;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final ProductRepository productRepository;

    public CategoryController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<String> getAllCategories() {
        return productRepository.findAll()
                .stream()
                .map(product -> product.getCategory())
                .filter(category -> category != null && !category.isBlank())
                .distinct()
                .sorted()
                .toList();
    }
}

