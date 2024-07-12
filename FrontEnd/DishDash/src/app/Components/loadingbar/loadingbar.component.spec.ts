import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingbarComponent } from './loadingbar.component';

describe('LoadingbarComponent', () => {
  let component: LoadingbarComponent;
  let fixture: ComponentFixture<LoadingbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
