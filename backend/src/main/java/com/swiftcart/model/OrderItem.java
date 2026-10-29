package com.swiftcart.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_order_id")
    private CustomerOrder order;

    public OrderItem() {}

    public OrderItem(Long productId, String productName,
                     Integer quantity, BigDecimal price) {
        this.productId=productId;
        this.productName=productName;
        this.quantity=quantity;
        this.price=price;
    }

    public Long getId(){return id;}
    public void setId(Long v){id=v;}
    public Long getProductId(){return productId;}
    public void setProductId(Long v){productId=v;}
    public String getProductName(){return productName;}
    public void setProductName(String v){productName=v;}
    public Integer getQuantity(){return quantity;}
    public void setQuantity(Integer v){quantity=v;}
    public BigDecimal getPrice(){return price;}
    public void setPrice(BigDecimal v){price=v;}
    public CustomerOrder getOrder(){return order;}
    public void setOrder(CustomerOrder v){order=v;}
}
