package com.example.RestaurantService.model;

public class Dish {
    private String dishName;
    private String dishImage;
    private String dishRating;
    private double dishPrice;
    private String dishDescription;
    private String dishCategory;
    private Boolean veg;

    public Dish() {
    }

    public Dish(String dishName, String dishImage, String dishRating, double dishPrice, String dishDescription, String dishCategory, Boolean veg) {
        this.dishName = dishName;
        this.dishImage = dishImage;
        this.dishRating = dishRating;
        this.dishPrice = dishPrice;
        this.dishDescription = dishDescription;
        this.dishCategory = dishCategory;
        this.veg = veg;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public String getDishImage() {
        return dishImage;
    }

    public void setDishImage(String dishImage) {
        this.dishImage = dishImage;
    }

    public String getDishRating() {
        return dishRating;
    }

    public void setDishRating(String dishRating) {
        this.dishRating = dishRating;
    }

    public double getDishPrice() {
        return dishPrice;
    }

    public void setDishPrice(double dishPrice) {
        this.dishPrice = dishPrice;
    }

    public String getDishDescription() {
        return dishDescription;
    }

    public void setDishDescription(String dishDescription) {
        this.dishDescription = dishDescription;
    }

    public String getDishCategory() {
        return dishCategory;
    }

    public void setDishCategory(String dishCategory) {
        this.dishCategory = dishCategory;
    }

    public Boolean getVeg() {
        return veg;
    }

    public void setVeg(Boolean veg) {
        this.veg = veg;
    }
}
