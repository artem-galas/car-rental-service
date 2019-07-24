import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';

import { MaterialModule, SharedModule } from '~/framework';

import { ConfirmBookingDialogComponent } from './confirm-booking-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    MatDialogModule,
    MatSliderModule
  ],
  exports: [
    MatDialogModule
  ],
  declarations: [
    ConfirmBookingDialogComponent
  ],
  entryComponents: [
    ConfirmBookingDialogComponent
  ]
})
export class ConfirmBookingDialogModule { }
