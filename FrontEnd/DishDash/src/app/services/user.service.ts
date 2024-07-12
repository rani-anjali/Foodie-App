import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { customerLogin } from '../Model/customerLogin';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { customer } from '../Model/customer';
import { restaurant } from '../Model/restaurant';
import { CookieService } from 'ngx-cookie-service';
import { address } from '../Model/address';
import { FileHandle } from '../Model/file-handle';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loginAPIkey:string = ``;
  logInSubject = new Subject<boolean>()
  listenLogin = new Subject<customerLogin>();
  tokenSubject = new BehaviorSubject<boolean>(this.hasToken());
  profilePictureUpdate = new Subject<boolean>();

  loggedOutFromProfileSubject = new Subject<boolean>();
  constructor(private http:HttpClient, private cookieservice:CookieService) {
    window.addEventListener('storage', () => {
      console.log('Token state changed');
      this.tokenSubject.next(this.hasToken())
    })
   }

   //Sending info to navbar to logout when logged out from profile

   loggingOutFromProfile(loggedout:boolean) {
    this.loggedOutFromProfileSubject.next(loggedout)
   }

  hasToken():boolean {
    return this.cookieservice.check("token")
  }

  loginUser(data:customerLogin):Observable<string> {
    return this.http.post("http://localhost:9000/api/v1/login", data,  { responseType: 'text' });
  }

  //SendToNav

  sendToNav(data:customerLogin) {
    this.listenLogin.next(data);

  }

  registerUser(customer:customer):Observable<customer>
  {
    return this.http.post<customer>("http://localhost:9000/api/v2/register",customer);
  }

  fetchCustomerByJwt(Jwt:any):Observable<customer> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Jwt}`
    });

    return this.http.get<customer>('http://localhost:9000/api/v2/customers/eachcustomer',{ headers });
  }

  fetchCustomerFavRestaurants(customerId:string):Observable<string> {
    return this.http.get<string>("url")
  }

  login(isLoggedIn:boolean) {
    this.logInSubject.next(isLoggedIn);
  }

  //Fetching all favs by JWT
  fetchCustomerFavByJwt(Jwt:any):Observable<Array<string>> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Jwt}`
    });

    return this.http.get<Array<string>>('http://localhost:9000/api/v2/customers/restaurant',{ headers });
  }




  //Sending Customer Fav To Backend

  sendFavoriteRestToCustomer(resId:string, Jwt:string): Observable<string>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Jwt}`
    });
    return this.http.put("http://localhost:9000/api/v2/customers/addfavres", resId, { headers, responseType:'text'})
  }

  //Deleting Custoemer Fav from Backedn
  DeleteFavoriteRestFromCustomer(resId:string, Jwt:string):Observable<boolean> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Jwt}`
    });

    const params = new HttpParams().set('resId', resId);

    const options ={
      headers:headers,
      params: params
    }

 return this.http.delete<boolean>("http://localhost:9000/api/v2/customers/deleterestaurant", options)

  }

  //Fetching All Customer Address From Backend

  fetchAllCustomerAddress(Jwt:string):Observable<Array<address>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Jwt}`
    });

    return this.http.get<Array<address>>("http://localhost:9000/api/v2/customers/addresses/all", { headers })

  }  


  //Saving a single Restaurant To Database

  saveNewAddress(Jwt:string, newAddress:address):Observable<address>
 {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${Jwt}`
  });

  return this.http.put<address>("http://localhost:9000/api/v2/customers/addresses/addnew", newAddress, { headers })
 }

 //Making Address Primary

 makeItPrimary(Jwt:string, addressPrimary:address):Observable<address> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${Jwt}`
  });

  return this.http.put<address>("http://localhost:9000/api/v2/customers/addresses/makeitprimary", addressPrimary, { headers })
 }


 //Deleting Address 

 deleteAddress(Jwt:string, addressId:string) {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${Jwt}`
  });

  return this.http.delete<boolean>(`http://localhost:9000/api/v2/customers/deleteone/${addressId}`, { headers })
 }
//Updating user through Profile Edit Tav

updateCustomer (Jwt:string,updatedCustomer:any):Observable<customer> {

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${Jwt}`
  });

  return this.http.put<customer>("http://localhost:9000/api/v2/customers/update", updatedCustomer, { headers })



}

//Fetching all customers for admin

fetchAllCustomers():Observable<Array<customer>> {
  return this.http.get<Array<customer>>("http://localhost:9000/api/v2/allCustomers")
}

//Uploading prifle picture

updateImage(picture:FormData,Jwt:string):Observable<any>{
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${Jwt}`
  });
  return this.http.post<FileHandle>("http://localhost:9000/api/v2/customers/upload/image",picture,{headers});
}



//Profile Picture Update

profilePictureUpdation() {
  this.profilePictureUpdate.next(true);
}


}


