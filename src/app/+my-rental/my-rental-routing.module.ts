import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { MyRentalIndexComponent } from './my-rental-index/my-rental-index.component';

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth/sign-in']);

const routes: Routes = [
  {
    path: '',
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: '',
        component: MyRentalIndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRentalRoutingModule { }
