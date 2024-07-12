package com.bej.services;

import com.bej.domain.Order;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    public Order addOrder(Order order);
    public Optional<Order> getOrderByOrderId(String orderId);
    public List<Order> fetchAll();

}
