package com.swiftcart.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    @Column(length = 2000)
    private String description;
    private BigDecimal price;
    private Integer stock;

    public Product() {}

    public Product(String name, String category, String description,
                   BigDecimal price, Integer stock) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}
    public String getName(){return name;}
    public void setName(String name){this.name=name;}
    public String getCategory(){return category;}
    public void setCategory(String category){this.category=category;}
    public String getDescription(){return description;}
    public void setDescription(String description){this.description=description;}
    public BigDecimal getPrice(){return price;}
    public void setPrice(BigDecimal price){this.price=price;}
    public Integer getStock(){return stock;}
    public void setStock(Integer stock){this.stock=stock;}
}
