package com.example.RestaurantService.service;

import com.example.RestaurantService.exception.NoRestaurantAvailableException;
import com.example.RestaurantService.exception.RestaurantAlreadyExistException;
import com.example.RestaurantService.model.Dish;
import com.example.RestaurantService.model.Restaurant;

import java.util.List;

public interface IRestaurantService {

    public Restaurant registerRestaurant(Restaurant restaurant) throws RestaurantAlreadyExistException;
    public List<Restaurant> fetchAllRestaurants();
    public List<Restaurant> fetchRestaurantByCity(String resCity) throws NoRestaurantAvailableException;
    public List<Dish> fetchDishesByRestaurantId(String resId) throws NoRestaurantAvailableException;
    public List<Restaurant> fetchRestaurantByName(String resName) throws NoRestaurantAvailableException;
    public List<Restaurant> fetchRestaurantByCuisine(String resCuisine) throws NoRestaurantAvailableException;
    public Restaurant fetchRestaurantById(String redId) throws NoRestaurantAvailableException;
    public Restaurant updateRestaurantById(Restaurant restaurant,String resId)throws  NoRestaurantAvailableException;


}
