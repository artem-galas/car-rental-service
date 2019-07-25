import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MaterialModule, SharedModule } from '~/framework';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatSnackBarModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AngularFireAuthGuard
  ]
})
export class AuthModule { }
