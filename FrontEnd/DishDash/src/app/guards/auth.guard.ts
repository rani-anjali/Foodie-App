import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { RouterService } from '../services/router.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginalertComponent } from '../Components/loginalert/loginalert.component';
import { AuthserviceService } from '../services/authservice.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthserviceService);
  const router = inject(Router);
  const dialog = inject(MatDialog);
  const isAuthenticated =authService.isAuthenticated();

  if(!isAuthenticated){
     // Store the intended URL for redirecting after login
     authService.setRedirectUrl(state.url);

     if(router.url != '/') {
      dialog.open(LoginalertComponent);
      return false;
     }

     else {
  // Redirect to the homepage
  router.navigate(['/']).then(() => {
    // Open the login dialog
    dialog.open(LoginalertComponent);
  });
  
  return false;
     }
   
  }
  else {
    return true;
   
  }
};
