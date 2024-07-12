import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { restaurant } from '../Model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService implements OnInit {
  cityEmiter = new Subject<string>();
  restaurantsEmitter = new Subject<Array<restaurant>>();

  constructor(private http:HttpClient) { }
  ngOnInit(): void { }

  fetchByCityURL:string = `http://localhost:9000/api/v3/restaurantsbycity`

  fetchRestaurantsByCity(city:string):Observable<Array<restaurant>> {
    console.log("Fetch by city"+this.fetchByCityURL+`/${city}`)
    return this.http.get<Array<restaurant>>(this.fetchByCityURL+`/${city}`);
  }

  fetchRestaurantByid(resId:string):Observable<restaurant> {
    let fetchByIdURL = `http://localhost:9000/api/v3/restaurantsbyid/${resId}`;
    return this.http.get<restaurant>(fetchByIdURL); 
  }

  fetchAllRestaurants():Observable<Array<restaurant>> {
    return this.http.get<Array<restaurant>>("http://localhost:9000/api/v3/allrestaurants")
  }

  updateCity(city:string) {
    return this.cityEmiter.next(city);
  }

  getFilteredRestaurantList(res:restaurant[]) {
    return this.restaurantsEmitter.next(res);
  }




}
