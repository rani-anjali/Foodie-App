import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SearchComponent } from './Components/search/search.component';
import { CategoryComponent } from './Components/category/category.component';
import { CategorycardComponent } from './Components/categorycard/categorycard.component';
import { RestaurantComponent } from './Components/restaurant/restaurant.component';
import { RestaurantviewComponent } from './Components/restaurantview/restaurantview.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import { RestaurantcardComponent } from './Components/restaurantcard/restaurantcard.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { CutomerfavouriteComponent } from './Components/cutomerfavourite/cutomerfavourite.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoadingbarComponent } from './Components/loadingbar/loadingbar.component';

import {CookieService} from 'ngx-cookie-service';
import {MatDialogModule} from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import {MatProgressSpinner, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginalertComponent } from './Components/loginalert/loginalert.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './Components/cart/cart.component';
import { OrderhistoryComponent } from './Components/orderhistory/orderhistory.component';
import { MyaddressesComponent } from './Components/myaddresses/myaddresses.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavbarComponent,
    SearchComponent,
    CategoryComponent,
    CategorycardComponent,
    RestaurantComponent,
    RestaurantviewComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    RestaurantcardComponent,
    HomepageComponent,
    CutomerfavouriteComponent,
    LoadingbarComponent,
    SpinnerComponent,
    ProfileComponent,
    LoginalertComponent,
    CartComponent,
    OrderhistoryComponent,
    MyaddressesComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonModule,
    NgxPaginationModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [ provideAnimationsAsync(), CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
