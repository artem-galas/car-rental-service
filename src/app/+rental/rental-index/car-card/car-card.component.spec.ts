import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CarCardComponent } from './car-card.component';
import { MaterialModule } from '~/framework';
import { CarDto } from '~/shared/dto';

const mockCar: CarDto = {
  id: 'ABC1',
  image: '',
  model: 'Audi',
  price: 33
};

describe('CarCardComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let component: CarCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      declarations: [
        TestHostComponent,
        CarCardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    component = testHostComponent.componentUnderTestComponent;
  });

  it('should create', () => {
    testHostComponent.componentUnderTestComponent.car = mockCar;
    testHostFixture.detectChanges();

    expect(component)
      .toBeTruthy();
  });


  @Component({
    selector: 'host-component',
    template: `<crs-car-card></crs-car-card>`
  })
  class TestHostComponent {
    @ViewChild(CarCardComponent, {static: true})
    public componentUnderTestComponent: CarCardComponent;
  }
});
