import { Component, Input } from '@angular/core';
import { restaurant } from '../../Model/restaurant';

@Component({
  selector: 'app-restaurantcard',
  templateUrl: './restaurantcard.component.html',
  styleUrls: ['./restaurantcard.component.css']
})
export class RestaurantcardComponent {
  @Input() onerestaurant: restaurant;
  isFavorite: boolean = false;
  cuisineLimit: number = 2; // Adjust the limit as needed

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  displayedCuisines(cuisines: string[]) {
    return cuisines.slice(0, this.cuisineLimit);
  }
}
