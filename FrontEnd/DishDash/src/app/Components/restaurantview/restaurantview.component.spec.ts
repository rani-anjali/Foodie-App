import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantviewComponent } from './restaurantview.component';

describe('RestaurantviewComponent', () => {
  let component: RestaurantviewComponent;
  let fixture: ComponentFixture<RestaurantviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
