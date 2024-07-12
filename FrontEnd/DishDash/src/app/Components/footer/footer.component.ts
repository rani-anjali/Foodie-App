import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private dialog:MatDialog) {}

    // Open the login dialog
    openLoginDialog(): void {
      this.dialog.open(LoginComponent, {
        width: "400px"
      });
    }

      // Open the signup dialog
  openSignupDialog(): void {
    this.dialog.open(RegisterComponent, {
      width: "600px"
    });
  }
  

}
