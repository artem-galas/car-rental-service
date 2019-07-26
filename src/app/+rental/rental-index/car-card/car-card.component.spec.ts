import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CarCardComponent } from './car-card.component';
import { MaterialModule } from '~/framework';
import { CarDto } from '~/shared/dto';
import { By } from '@angular/platform-browser';

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

  it('should display car information', () => {
    testHostComponent.componentUnderTestComponent.car = mockCar;
    testHostFixture.detectChanges();

    const image = document.querySelector<HTMLImageElement>('.card-image>img');
    const model = document.querySelector<HTMLDivElement>('.car-model');
    const price = document.querySelector<HTMLDivElement>('.price');

    expect(image.src)
      .toContain(mockCar.image);
    expect(model.innerText)
      .toBe(mockCar.model);
    expect(price.innerText)
      .toBe(`€${mockCar.price}.00/per day`);
  });

  it('should send information to parent component', () => {
    testHostComponent.componentUnderTestComponent.car = mockCar;
    testHostFixture.detectChanges();

    const button = testHostFixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    testHostComponent.componentUnderTestComponent.selectCar
      .subscribe((data) => {
        expect(data)
          .toBe(mockCar);
    });
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
