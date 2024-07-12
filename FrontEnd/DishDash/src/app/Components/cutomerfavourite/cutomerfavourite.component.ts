import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { CookieService } from 'ngx-cookie-service';
import { RestaurantService } from '../../services/restaurant.service';
import { restaurant } from '../../Model/restaurant';

@Component({
  selector: 'app-cutomerfavourite',
  templateUrl: './cutomerfavourite.component.html',
  styleUrl: './cutomerfavourite.component.css'
})
export class CutomerfavouriteComponent implements OnInit {
  spinnerVisible:boolean =false;
  activeCustomer:customer;
  customerJwt:string;
  restIds:string[]=[];
  restaurants:restaurant[]=[];
  nofavRestPresent = false;


  constructor(private userService:UserService, private cookieService:CookieService, private restService:RestaurantService) {}

  ngOnInit(): void {
    this.customerJwt = this.cookieService.get("token");
    this.spinnerVisible = true
    this.userService.fetchCustomerFavByJwt(this.customerJwt).subscribe({
      next:data => {
        this.spinnerVisible = false
        this.restIds = data;
        console.log("favs")
        console.log(data)
        if(this.restIds.length >0) {
          this.fetchRestById(this.restIds);
        }
        else {
          this.nofavRestPresent = true
        }
      },
      error:e => {
        console.log("Error");
        this.spinnerVisible = false;
        this.nofavRestPresent= true;
    }
    })

   
  }

fetchRestById(restIds:string[]) {

  for(let restId of restIds) {
    this.restService.fetchRestaurantByid(restId).subscribe({
      next:data => {

        this.restaurants.push(data);
        this.spinnerVisible = false;
      },

      error:e => {
        this.spinnerVisible = false;
        console.log("Error while fetching " +restId)
      }
    })

  }

}

  fetchCustomerFavourites() {

  }

}
