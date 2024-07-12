package com.example.RestaurantService.repository;

import com.example.RestaurantService.model.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RestaurantRepo extends MongoRepository <Restaurant,String> {

    public List<Restaurant> findByResCity(String resCity);

}
