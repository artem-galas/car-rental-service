import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    loadChildren: () => import('./+auth/auth.module')
      .then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./+home/home.module')
      .then(mod => mod.HomeModule)
  },
  {
    path: 'rental',
    loadChildren: () => import('./+rental/rental.module')
      .then(mod => mod.RentalModule)
  },
  {
    path: 'my-rental',
    loadChildren: () => import('./+my-rental/my-rental.module')
      .then(mod => mod.MyRentalModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
