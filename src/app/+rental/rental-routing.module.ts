import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RentalIndexComponent } from './rental-index/rental-index.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RentalIndexComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalRoutingModule { }
