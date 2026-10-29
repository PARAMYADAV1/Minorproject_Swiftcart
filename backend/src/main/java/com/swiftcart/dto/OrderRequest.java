package com.swiftcart.dto;

import java.util.List;

public class OrderRequest {
    private String customerName;
    private String email;
    private String deliveryAddress;
    private List<OrderItemRequest> items;

    public OrderRequest() {}
    public String getCustomerName(){return customerName;}
    public void setCustomerName(String v){customerName=v;}
    public String getEmail(){return email;}
    public void setEmail(String v){email=v;}
    public String getDeliveryAddress(){return deliveryAddress;}
    public void setDeliveryAddress(String v){deliveryAddress=v;}
    public List<OrderItemRequest> getItems(){return items;}
    public void setItems(List<OrderItemRequest> v){items=v;}
}
