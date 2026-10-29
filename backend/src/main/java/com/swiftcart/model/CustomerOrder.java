package com.swiftcart.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer_orders")
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String customerName;
    private String email;
    @Column(length = 1000)
    private String deliveryAddress;
    private BigDecimal total;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    public CustomerOrder() {}

    public CustomerOrder(String customerName, String email,
                         String deliveryAddress, BigDecimal total) {
        this.customerName=customerName;
        this.email=email;
        this.deliveryAddress=deliveryAddress;
        this.total=total;
    }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    public Long getId(){return id;}
    public void setId(Long v){id=v;}
    public String getCustomerName(){return customerName;}
    public void setCustomerName(String v){customerName=v;}
    public String getEmail(){return email;}
    public void setEmail(String v){email=v;}
    public String getDeliveryAddress(){return deliveryAddress;}
    public void setDeliveryAddress(String v){deliveryAddress=v;}
    public BigDecimal getTotal(){return total;}
    public void setTotal(BigDecimal v){total=v;}
    public List<OrderItem> getItems(){return items;}
}
