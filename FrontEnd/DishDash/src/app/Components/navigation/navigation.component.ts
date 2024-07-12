import { Component, OnDestroy, OnInit } from '@angular/core';
import { IpLocationService } from '../../services/ip-location.service';
import { LoadingService } from '../../services/loading.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject, Subscription, filter } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  location: any;
  city: string = '';

  isLoading = false; // Add this property
  progress = 0; // Add this property

  supportChat:boolean=false;

  private intervalId: any;
  private routerEventsSubscription: Subscription = new Subscription(); // Initialize the subscription
  showNavbar:boolean = true;

  constructor(
    private ipLocationService: IpLocationService, 
    private loadingService: LoadingService, 
    private resService:RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
    //   window.scrollTo(0, 0);
    // });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = !event.url.includes('/admin');
      }
    });

    this.router.events.subscribe( (event) =>{
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
     
      }
    })

 
    // Router events subscription
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // console.log("Naviation Start")
        this.simulateLoadingProgress();
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        // console.log('Navigation event completed:', event);
        this.completeLoading();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();

  }


  private completeLoading() {
    // console.log("Loading Completed")
    clearInterval(this.intervalId);
    this.loadingService.setLoading(99);


    setTimeout(() => {
      
    this.loadingService.setIsLoading(false);
    this.loadingService.setLoading(0);
      
    }, 500)
    
  }

  private simulateLoadingProgress() {
    // console.log("Simulate Loading Progress")
    this.loadingService.setLoading(0);
    this.loadingService.setIsLoading(true);

    this.intervalId = setInterval(() => {
      this.progress+=10;
      this.loadingService.setLoading(this.progress)
      if(this.progress) {
        clearInterval(this.intervalId);
      }
    }, 100)
   
  }

 
}
