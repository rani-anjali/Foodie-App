import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginalertComponent } from './loginalert.component';

describe('LoginalertComponent', () => {
  let component: LoginalertComponent;
  let fixture: ComponentFixture<LoginalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginalertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
