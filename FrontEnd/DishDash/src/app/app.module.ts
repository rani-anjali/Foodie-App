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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RestaurantcardComponent } from './Components/restaurantcard/restaurantcard.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { CutomerfavouriteComponent } from './Components/cutomerfavourite/cutomerfavourite.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingbarComponent } from './Components/loadingbar/loadingbar.component';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginalertComponent } from './Components/loginalert/loginalert.component';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './Components/cart/cart.component';
import { OrderhistoryComponent } from './Components/orderhistory/orderhistory.component';
import { MyaddressesComponent } from './Components/myaddresses/myaddresses.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { SupportChatComponent } from './Components/support-chat/support-chat.component';
import { LegalComponent } from './Components/legal/legal.component';
import { ConfirmDialogComponent } from './Components/confirm-dialog/confirm-dialog.component';

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
    EditProfileComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    AdminLoginComponent,
    AdminViewComponent,
    SupportChatComponent,
    LegalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatExpansionModule,
    MatButtonModule,
    NgxPaginationModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatTabGroup,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
