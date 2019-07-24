import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '~/framework';
import { CarDto } from '~/shared/dto';
import { ConfirmBookingDialogCloseData, ConfirmBookingDialogComponent, ConfirmBookingDialogData } from '~/shared/components';

import { RentalService } from '../shared/services/rental.service';

@Component({
  selector: 'crs-rental-index',
  templateUrl: './rental-index.component.html',
  styleUrls: ['./rental-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalIndexComponent extends BaseComponent implements OnInit {
  cars$: Observable<Array<CarDto>>;
  constructor(private readonly rentalService: RentalService,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.cars$ = this.rentalService.getCars();
  }

  trackByFn(index, item) {
    return index;
  }

  bookCar(car: CarDto) {
    const dialogRef = this.dialog
      .open<ConfirmBookingDialogComponent, ConfirmBookingDialogData, ConfirmBookingDialogCloseData>(
        ConfirmBookingDialogComponent, {
          panelClass: 'confirm-booking-dialog',
          data: {
            carPrice: car.price,
            carId: car.id
          }
        }
      );

    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        if (result) {
          this.snackBar
            .open(
              `You successfully booked ${car.model} for ${result.numberOfDays} days`,
              'Ok',
              {
                duration: 2000
              }
            );
        }
      });
  }

}
