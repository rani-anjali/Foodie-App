import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantcardComponent } from './restaurantcard.component';

describe('RestaurantcardComponent', () => {
  let component: RestaurantcardComponent;
  let fixture: ComponentFixture<RestaurantcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
