import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurant } from '../../Model/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { LoginalertComponent } from '../loginalert/loginalert.component';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { dish } from '../../Model/dish';
import { CartDish } from '../../Model/CartDish';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-restaurantview',
  templateUrl: './restaurantview.component.html',
  styleUrls: ['./restaurantview.component.css'],
})
export class RestaurantviewComponent implements OnInit {
  oneRestaurant: restaurant;
  categoryAndCount = new Map();
  categoryArray: [string, number][] = [];
  isFavorite: boolean = false;
  custFavorites: string[] = [];
  spinnerVisible: boolean = false;
  categoryWise = new Map();
  categoryWiseDishesArray: [string, dish[]][] = [];
  noSuchRestaurant = false;
  activeCustomer: customer;
  errorMessage: string | null = null;  // Message for favourites

  constructor(
    private ac: ActivatedRoute,
    private resService: RestaurantService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.spinnerVisible = true;
    this.ac.paramMap.subscribe({
      next: data => {
        let restId = data.get('resid');
        this.fetchRestaurantById(restId);
        this.initilizeCart();
        this.fetchActiveCustomerFavs();
      },
      error: e => {
        console.log(e);
        this.spinnerVisible = false;
      }
    });
  }


  // Fetching active customer
  fetchActiveCustomer() {
    const Jwt = this.cookieService.get("token")
    this.userService.fetchCustomerByJwt(Jwt).subscribe({
      next: data => {
        console.log("fetching Success")
        this.activeCustomer = data;
      },
      error: e => {
        console.log("Error while fetching the customer")
        console.log(e);
      }
    })
  }

  // Initialize cart
  initilizeCart() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  // Adding to cart Method, when user clicks to add
  addToCart(dish: dish) {
    if (this.checkDifferentRestaurant(dish)) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title:'Confirm Action',
          message:'You already have items from a different restaurant in your cart. Do you want to clear the cart and add items from this restaurant?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          localStorage.setItem('cart', JSON.stringify([]));
          this.addDishToCart(dish);
        }
      });
    } else {
      this.addDishToCart(dish);
    }
  }

  addDishToCart(dish: dish) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Checking if the dish is already present
    const existingItem = cart.find((item: any) => item.dishName === dish.dishName);
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...dish, quantity: 1, restaurantId: this.oneRestaurant.resId });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    this.updateNavBarCartCount();
  }

    

  // For the + button
  increaseCount(item: dish) {
    this.addToCart(item);
  }

  // Decrease Quantity
  decreaseCount(dish: dish) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.dishName === dish.dishName);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart = cart.filter((item: any) => item.dishName !== dish.dishName);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      this.updateNavBarCartCount();
    }
  }

  // Updating nav bar about it
  updateNavBarCartCount() {
    const event = new Event('storage');
    window.dispatchEvent(event);
  }

  // For checking is dish in the cart
  isInCart(dish: dish): boolean {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.some((item: any) => item.dishName === dish.dishName);
  }

  // For getting CartItem Quantity
  getCartItemQuantity(dish: dish): number {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItem = cart.find((item: any) => item.dishName === dish.dishName);
    return cartItem ? cartItem.quantity : 0;
  }

  // Checking Different Restaurant
  checkDifferentRestaurant(dish: dish): boolean {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length > 0) {
      const existingItem = cart[0];
      if (existingItem && existingItem.restaurantId !== this.oneRestaurant.resId) {
        return true;
      }
    }
    return false;
  }

  fetchRestaurantById(id: string) {
    this.resService.fetchRestaurantByid(id).subscribe({
      next: data => {
        this.oneRestaurant = data;
        this.prepareMapForCategories();
        this.categoryArray = Array.from(this.categoryAndCount.entries());
        this.prepareCategoryWise();
        this.categoryWiseDishesArray = Array.from(this.categoryWise.entries());
        this.fetchActiveCustomerFavs();

        if (this.cookieService.get('token')) {
          this.fetchActiveCustomer();
        }

        this.spinnerVisible = false;
      },
      error: e => {
        console.log("Error fetching restaurant", e);
        this.spinnerVisible = false;
        this.noSuchRestaurant = true;
      }
    });
  }

  // Fetching Customer Favorite Restaurant List
  fetchActiveCustomerFavs() {
    const Jwt = this.cookieService.get('token');
    this.userService.fetchCustomerFavByJwt(Jwt).subscribe({
      next: data => {
        this.custFavorites = data;
        console.log("Best Coming: ", data);
        console.log("One Restaurant: ", this.oneRestaurant);

        if (this.oneRestaurant) {
          console.log("Restaurant ID: ", this.oneRestaurant.resId);
          console.log("Customer Favorites: ", this.custFavorites);
          console.log("Condition: ", this.custFavorites.includes(this.oneRestaurant.resId));

          if (this.custFavorites.includes(this.oneRestaurant.resId)) {
            console.log("It's true for favorite");
            this.isFavorite = true;
          }
        }
      },
      error: e => {
        console.log("Error in fetch cust fav", e);
      }
    });
  }

  toggleFav() {
    if (!this.cookieService.get('token')) {
      this.openLoginAlertDialog('3000ms', '1500ms');
      return; // Stop further execution if user is not logged in
    }

    this.isFavorite = !this.isFavorite;
    const Jwt = this.cookieService.get('token');

    if (this.isFavorite) {
      console.log("Addintion Request");
      this.userService.sendFavoriteRestToCustomer(this.oneRestaurant.resId, Jwt).subscribe({
        next: data => {
          console.log("Added Success");
          this.errorMessage = "Successfully Added To Favourites"
          setTimeout(() => {
            this.errorMessage =null
          }, 2000);
        },
        error: e => {
          console.log("Error adding favorite", e);
        }
      });
    } else {
      console.log("Deletion Request");
      this.userService.DeleteFavoriteRestFromCustomer(this.oneRestaurant.resId, Jwt).subscribe({
        next: data => {
          console.log("Deletion Success");
           this.errorMessage = "Successfully Removed From Favourites"
          setTimeout(() => {
            this.errorMessage = null;
          }, 2000);
        },
        error: e => {
          console.log("Error deleting favorite", e);
        }
      });
    }
  }

  openLoginAlertDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginalertComponent, {
      width: '400px',
    });
  }

  prepareMapForCategories() {
    for (let category of this.oneRestaurant.resCategories) {
      let count = 0;
      for (let dish of this.oneRestaurant.resMenu) {
        if (dish.dishCategory.toLowerCase() == category.toLowerCase()) {
          count++;
        }
      }
      this.categoryAndCount.set(category, count);
    }
  }

  prepareCategoryWise() {
    let dishesInOneCategory = [];
    for (let category of this.oneRestaurant.resCategories) {
      for (let dish of this.oneRestaurant.resMenu) {
        if (dish.dishCategory.toLowerCase() == category.toLowerCase()) {
          dishesInOneCategory.push(dish);
        }
      }
      this.categoryWise.set(category, dishesInOneCategory);
      dishesInOneCategory = [];
    }
    console.log("MyDisWise Map", dishesInOneCategory);
  }

  scrollToCategory(category: string) {
    console.log("Scroll Called");
    const element = document.getElementById(category);
    console.log(element);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
