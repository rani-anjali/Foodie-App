import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutomerfavouriteComponent } from './cutomerfavourite.component';

describe('CutomerfavouriteComponent', () => {
  let component: CutomerfavouriteComponent;
  let fixture: ComponentFixture<CutomerfavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CutomerfavouriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutomerfavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
