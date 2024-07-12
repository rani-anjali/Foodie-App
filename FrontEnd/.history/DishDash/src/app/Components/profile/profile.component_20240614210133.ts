import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user.service';
import { customer } from '../../Model/customer';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  customerJwt:string;
  constructor(private cookieservice:CookieService, private userService:UserService, private routerservice:RouterService) {}
  activeCustomer:customer ={
    customerName: '',
    customerEmail: '',
    customerPassword: '',
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      //check file size if greater than 2 mb
      const maxSizeInBytes = 2 * 1024 * 1024;
     
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e: any) => {
        img.src = e.target.result;
        const base64Image=img.src.split(',')[1];
    
        img.onload = () => {
          if (file.size > maxSizeInBytes) {
            alert('File size exceeds 2MB');
            console.log(img.src);
            return;
          } else if(img.height>100 || img.width>100)
            {
              alert('Profile photo should have 100 width and 100 height')
            }
          else {
            const profileImage = document.getElementById('profileImage') as HTMLImageElement;
            profileImage.src = e.target.result;
            console.log(profileImage.src);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  }


  ngOnInit():void {
    
    // this.routerservice.navigateToFavOption();
    this.customerJwt = this.cookieservice.get("token")

    this.userService.fetchCustomerByJwt(this.customerJwt).subscribe({
      next:data => {
        this.activeCustomer = data;
      },
      error:data => {
        console.log("Error while Fetchin Customer")
      }
    })

  }

  logout() {
    this.cookieservice.delete("token");
    this.routerservice.navigateToHomePage();
  }

  profilePictureUpdate() {
    
  }

}
