import { Component, OnInit } from '@angular/core';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  city: string;
  restaurants: restaurant[] = [];
  spinnerVisible: boolean = false;
  noRestuarant: boolean = false;
  noSuchRestaurant: boolean = false;

  // Pagination properties
  p: number = 1;  // Current page number
  itemsPerPage: number = 6;  // Number of items per page

  constructor(private resService: RestaurantService) {}

  ngOnInit(): void {
    // Subscribe to city changes
    this.resService.cityEmiter.subscribe({
      next: data => {
        this.city = data;
        this.spinnerVisible = true;
        this.noRestuarant = false;

        // Subscribe to restaurant data changes
        this.resService.restaurantsEmitter.subscribe({
          next: data => {
            console.log("Data from search")
            console.log(data);
            
            if (data) {
              this.restaurants = data;
              this.noRestuarant = false;
              this.noSuchRestaurant = false;
              if(this.restaurants.length == 0) {
                this.noSuchRestaurant = true;
              }
            } else {
              this.noRestuarant = true;
              this.restaurants = [];
            }
    
            this.spinnerVisible = false;
          },
          error: e => {
            console.error("Error fetching restaurant data", e);
            this.spinnerVisible = false;
          }
        });
      }
    });
  }
}
