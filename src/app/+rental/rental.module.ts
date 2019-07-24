import { NgModule } from '@angular/core';

import { MaterialModule, SharedModule } from '~/framework';
import { ConfirmBookingDialogModule } from '~/shared/components';

import { RentalRoutingModule } from './rental-routing.module';
import { RentalIndexComponent } from './rental-index/rental-index.component';
import { CarCardComponent } from './rental-index/car-card/car-card.component';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    MatSnackBarModule,
    RentalRoutingModule,
    ConfirmBookingDialogModule
  ],
  declarations: [
    RentalIndexComponent,
    CarCardComponent
  ],
})
export class RentalModule { }
