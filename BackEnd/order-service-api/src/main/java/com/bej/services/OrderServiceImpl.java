package com.bej.services;

import com.bej.domain.Order;
import com.bej.proxy.CustomerProxy;
import com.bej.repository.OrderRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private CustomerProxy customerProxy;


    @Override
    public Order addOrder(Order order) {
        Order fetchedOrder=orderRepo.save(order);
        if(!(fetchedOrder.getOrderId().isEmpty()))
        {
            ResponseEntity<?> proxyResponse=customerProxy.addOrder(fetchedOrder.getCustomerId(),fetchedOrder.getOrderId());
        }
        return fetchedOrder;
    }

    @Override
    public Optional<Order> getOrderByOrderId(String orderId) {
        return orderRepo.findById(orderId);
    }

    @Override
    public List<Order> fetchAll() {
        return orderRepo.findAll();
    }
}
