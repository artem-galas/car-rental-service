import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentalIndexComponent } from './my-rental-index.component';

describe('MyRentalIndexComponent', () => {
  let component: MyRentalIndexComponent;
  let fixture: ComponentFixture<MyRentalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRentalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRentalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
