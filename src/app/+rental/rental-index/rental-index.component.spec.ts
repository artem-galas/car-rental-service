import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalIndexComponent } from './rental-index.component';

describe('RentalIndexComponent', () => {
  let component: RentalIndexComponent;
  let fixture: ComponentFixture<RentalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
