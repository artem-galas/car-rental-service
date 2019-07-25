import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '~/framework';
import { CarDto } from '~/shared/dto';
import { ConfirmBookingDialogCloseData, ConfirmBookingDialogComponent, ConfirmBookingDialogData } from '~/shared/components';

import { RentalService } from '../shared/services/rental.service';
import { TokenService } from '~/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'crs-rental-index',
  templateUrl: './rental-index.component.html',
  styleUrls: ['./rental-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RentalIndexComponent extends BaseComponent implements OnInit {
  cars$: Observable<Array<CarDto>>;
  dialogRef: MatDialogRef<ConfirmBookingDialogComponent, ConfirmBookingDialogCloseData>;
  constructor(private readonly rentalService: RentalService,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly tokenService: TokenService,
              private readonly router: Router) {
    super();
  }

  ngOnInit() {
    this.cars$ = this.rentalService.getCars();
  }

  trackByFn(index, item) {
    return index;
  }

  bookCar(car: CarDto) {
    if (this.tokenService.currentUser) {
      this.openConfirmDialog(car);
    } else {
      this.router.navigate(['auth', 'sign-in']);
    }
  }

  private openConfirmDialog(car: CarDto) {
    this.dialogRef = this.dialog
      .open<ConfirmBookingDialogComponent, ConfirmBookingDialogData, ConfirmBookingDialogCloseData>(
        ConfirmBookingDialogComponent, {
          panelClass: 'confirm-booking-dialog',
          data: {
            carPrice: car.price,
            carId: car.id
          }
        }
      );

    this.dialogRefAfterCloseAction(car);
  }

  private dialogRefAfterCloseAction(car: CarDto) {
    this.dialogRef.afterClosed()
      .pipe(
        filter((result => result !== undefined)),
        switchMap((result) => this.rentalService.bookCar({car, numberOfDays: result.numberOfDays})),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        this.snackBar
          .open(
            `You successfully booked ${res.model} for ${res.numberOfDays} days`,
            'Ok',
            {
              duration: 2000
            }
          );
      });
  }

}
