package com.swiftcart.dto;

public class OrderItemRequest {
    private Long productId;
    private Integer quantity;

    public OrderItemRequest() {}
    public Long getProductId(){return productId;}
    public void setProductId(Long v){productId=v;}
    public Integer getQuantity(){return quantity;}
    public void setQuantity(Integer v){quantity=v;}
}
