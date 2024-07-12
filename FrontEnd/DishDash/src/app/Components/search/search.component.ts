import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { IpLocationService } from '../../services/ip-location.service';
import { restaurant } from '../../Model/restaurant';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cityFromIp: string = '';
  city: string;
  Search: string = '';
  restaurants: restaurant[];
  allUniqueCities = new Set<string>();
  fliterRestaurants: restaurant[];
  filterWithSearch: restaurant[];

  constructor(
    private resService: RestaurantService,
    private ipService: IpLocationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // Fetch IP location to determine current city
    this.ipService.getIpLocation().subscribe({
      next: data => {
        this.city = data.city;
        this.cityFromIp = data.city;
        this.updateCity(this.city);

        // Fetch all restaurants and unique cities
        this.resService.fetchAllRestaurants().subscribe({
          next: data => {
            this.restaurants = data;
            for (let rest of this.restaurants) {
              this.allUniqueCities.add(rest.resCity);
            }
          }
        });

        // Fetch restaurants by city
        this.resService.fetchRestaurantsByCity(this.city).subscribe({
          next: data => {
            this.fliterRestaurants = data;
            this.resService.getFilteredRestaurantList(this.fliterRestaurants);
          },
          error: e => {
            console.error(e);
            this.resService.getFilteredRestaurantList(this.fliterRestaurants);
          }
        });
      }
    });
  }

  // Update the current city
  updateCity(city: string) {
    this.resService.updateCity(city);
  }

  // Select a city from the dropdown
  selectCity(city: string) {
    this.city = city;
    this.updateCity(this.city);
    this.Search = '';

    // Fetch restaurants by the selected city
    this.resService.fetchRestaurantsByCity(this.city).subscribe({
      next: data => {
       
        this.fliterRestaurants = data;
        this.sendFilteredData(this.fliterRestaurants);
      },
      error: e => {
        console.error("No Restaurant In This City");
        this.fliterRestaurants = [];
        this.sendFilteredData(this.fliterRestaurants);
      }
    });
  }

  // Send filtered data to the service
  sendFilteredData(rest: restaurant[]) {
    this.resService.getFilteredRestaurantList(rest);
  }

  // Perform search on restaurants
  onSearch() {
    const tempRest: restaurant[] = this.fliterRestaurants.filter(value =>
      value.resName.toLowerCase().includes(this.Search.toLowerCase())
    );

    this.filterWithSearch = tempRest;
    this.sendFilteredData(this.filterWithSearch);
  }
}
