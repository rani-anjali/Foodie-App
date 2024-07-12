package com.bej.repository;

import com.bej.domain.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepo extends MongoRepository<Order,String> {
}
