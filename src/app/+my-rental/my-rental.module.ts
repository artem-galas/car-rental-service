import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { MatSnackBarModule } from '@angular/material';

import { MaterialModule, SharedModule } from '~/framework';

import { MyRentalRoutingModule } from './my-rental-routing.module';
import { MyRentalIndexComponent } from './my-rental-index/my-rental-index.component';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    MyRentalRoutingModule,
    MatSnackBarModule
  ],
  declarations: [MyRentalIndexComponent],
  providers: [
    AngularFireAuthGuard
  ]
})
export class MyRentalModule { }
