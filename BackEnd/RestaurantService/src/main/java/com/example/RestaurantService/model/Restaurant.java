package com.example.RestaurantService.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Restaurant {

    @Id
    private String resId;
    private String resName;
    private String resAddress;
    private String resCity;
    private String resRating;
    private String resDescription;
    private List<String> resCategories;
    private List<String> resImages;
    private List<String> resCuisines;
    private List<Dish> resMenu;

    public Restaurant() {
    }

    public Restaurant(String resName, String resId, String resAddress, String resCity, String resRating, String resDescription, List<String> resCategories, List<String> resImages, List<String> resCuisines, List<Dish> resMenu) {
        this.resName = resName;
        this.resId = resId;
        this.resAddress = resAddress;
        this.resCity = resCity;
        this.resRating = resRating;
        this.resDescription = resDescription;
        this.resCategories = resCategories;
        this.resImages = resImages;
        this.resCuisines = resCuisines;
        this.resMenu = resMenu;
    }

    public String getResName() {
        return resName;
    }

    public void setResName(String resName) {
        this.resName = resName;
    }

    public String getResId() {
        return resId;
    }

    public void setResId(String redId) {
        this.resId = redId;
    }

    public String getResAddress() {
        return resAddress;
    }

    public void setResAddress(String resAddress) {
        this.resAddress = resAddress;
    }

    public String getResCity() {
        return resCity;
    }

    public void setResCity(String resCity) {
        this.resCity = resCity;
    }

    public String getResRating() {
        return resRating;
    }

    public void setResRating(String resRating) {
        this.resRating = resRating;
    }

    public String getResDescription() {
        return resDescription;
    }

    public void setResDescription(String resDescription) {
        this.resDescription = resDescription;
    }

    public List<String> getResCategories() {
        return resCategories;
    }

    public void setResCategories(List<String> resCategories) {
        this.resCategories = resCategories;
    }

    public List<String> getResImages() {
        return resImages;
    }

    public void setResImages(List<String> resImages) {
        this.resImages = resImages;
    }

    public List<String> getResCuisines() {
        return resCuisines;
    }

    public void setResCuisines(List<String> resCuisines) {
        this.resCuisines = resCuisines;
    }

    public List<Dish> getResMenu() {
        return resMenu;
    }

    public void setResMenu(List<Dish> resMenu) {
        this.resMenu = resMenu;
    }
}
