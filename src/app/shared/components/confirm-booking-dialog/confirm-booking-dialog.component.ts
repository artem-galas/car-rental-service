import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ConfirmBookingDialogData {
  carId: string;
  carPrice: number;
}

export interface ConfirmBookingDialogCloseData {
  numberOfDays: number;
  fullPrice: number;
}

@Component({
  selector: 'crs-confirm-booking-dialog',
  templateUrl: './confirm-booking-dialog.component.html',
  styleUrls: ['./confirm-booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmBookingDialogComponent implements OnInit {
  readonly defaultValueNumberOfDays = 1;
  readonly defaultMinNumberOfDays = 1;
  readonly defaultMaxNumberOfDays = 10;

  fullPrice: number;
  numberOfDays = this.defaultValueNumberOfDays;

  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmBookingDialogComponent, ConfirmBookingDialogCloseData>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmBookingDialogData) {
  }

  ngOnInit() {
    this.calculateFullPrice();
  }

  numberOfDaysChange(numberOfDays: number) {
    this.numberOfDays = numberOfDays;
    this.calculateFullPrice();
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close({
      numberOfDays: this.numberOfDays,
      fullPrice: this.fullPrice
    });
  }

  private calculateFullPrice() {
    this.fullPrice = this.data.carPrice * this.numberOfDays;
  }

}
