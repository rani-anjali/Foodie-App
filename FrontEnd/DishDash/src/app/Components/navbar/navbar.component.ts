import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { customer } from '../../Model/customer';
import { RegisterComponent } from '../register/register.component';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeCustomer: customer;
  customerJwt: string;
  matBadge: 5;
  showCart: boolean = false;

  logoutMessageVisible: boolean = false;
  loading: boolean = false;

  profilePicture:boolean = false; 
  url:string  = `https://via.placeholder.com/50x50`//for fetching profile pic

  constructor(private cookieService: CookieService, private userService: UserService, public dialog: MatDialog, private routerService:RouterService) {}
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    // Check if token exists and fetch active customer if it does
    if (this.cookieService.check("token")) {
      this.customerJwt = this.cookieService.get("token");
      this.fetchActiveCustomer();
    }

    this.updateCartCount();
    window.addEventListener('storage', this.updateCartCount.bind(this));

    // Subscribe to logInSubject to update login state
    this.userService.logInSubject.subscribe({
      next: data => {
        this.isLoggedIn = data;
        this.customerJwt = this.cookieService.get("token");
        this.fetchActiveCustomer();
      }
    });

    // Subscribe to loggedOutFromProfileSubject to handle profile logout
    this.userService.loggedOutFromProfileSubject.subscribe({
      next: data => {
        if (data) {
          this.handleLogout();
        }
      },
      error: e => {
        console.error(e);
      }
    });


    //Profile Picture Update
    this.profilePictureUpdateListen()
  }

  //Updating cart number
  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.matBadge = cart.reduce((total:number, item:any) => total+item.quantity, 0);
  }

  // Update the badge with the number of items in the cart
  noOfItemsChanges($event) {
    this.matBadge = $event;
  }

  // Handle user logout and display loading indicator
  logout() {
    this.cookieService.delete("token", "/");
    this.loading = true;
    this.routerService.navigateToHomePage()
    setTimeout(() => {
      this.isLoggedIn = false;
      this.loading = false;
      this.showLogoutMessage();
    }, 1000);
  }

  // Handle logout without showing the message immediately on page load
  handleLogout() {
    this.cookieService.delete("token");
    this.isLoggedIn = false;
    this.showLogoutMessage();
  }

  // Show a temporary message indicating successful logout
  showLogoutMessage() {
    this.logoutMessageVisible = true;
    setTimeout(() => {
      this.logoutMessageVisible = false;
    }, 3000);
  }

  // Open the login dialog
  openLoginDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginComponent, {
      width: "400px"
    });
  }

  // Open the signup dialog
  openSignupDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      width: "400px"
    });
  }

  // Fetch active customer details using JWT token
  fetchActiveCustomer() {
    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next: data => {
        this.activeCustomer = data;
        this.isLoggedIn = true;
        if(this.activeCustomer.customerProfilePic)
          {
            
            this.url ="http://127.0.0.1:5501/src/assets/images/"+`${this.activeCustomer.customerProfilePic}`
      
            this.profilePicture=true;
            
          }
      },
      error: e => {
        console.error(e);
      }
    });
  }


  profilePictureUpdateListen() {
    this.userService.profilePictureUpdate.subscribe({
      next:data => {
        this.fetchActiveCustomer();
      },
      error:e => {
        console.log("Error while fetching profile pictures")
      }
    })
  }
}
