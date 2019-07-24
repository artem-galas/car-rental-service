import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarDto } from '~/shared/dto';

@Component({
  selector: 'crs-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarCardComponent implements OnInit {
  @Input()
  car: CarDto;

  @Output()
  selectCar = new EventEmitter<CarDto>();

  constructor() { }

  ngOnInit() {
  }

}
