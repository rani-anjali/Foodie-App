import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router:Router) { }

  navigateToHomePage() {
    this.router.navigateByUrl('/');
  }

  navigateToFavOption() {
    this.router.navigateByUrl("customer/profile/favorites")
  }

  navigateToOrderCompletion(orderId:string) {
    this.router.navigateByUrl(`customer/order-complete/${orderId}`)
  }

  navigateToAdminView() {
    this.router.navigateByUrl(`admin/view`)
  }
}
